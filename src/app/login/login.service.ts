import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
export { User } from 'firebase';

// Firebase configuration for wizdm experiments
export const config = {
  apiKey: "XXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXX"
};

@Injectable()
export class LoginService implements OnDestroy {

  public authState: User = null;
  private sub: Subscription;
  
  get authState$(): Observable<User|null> {
    return this.afAuth.user;
  }
  
  constructor(public  afAuth: AngularFireAuth) {

    // Keeps a snapshot of the current user auth state
    this.sub = this.authState$.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Returns true if user is logged in and profile data are available
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get userId(): string {
    return this.authenticated ? 
      this.authState.uid : null;
  }

  public registerNew(email: string, password: string, name: string = ""): Promise<boolean> {
    
    console.log("Registering a new user: " + email);

    // Create a new user with email and password
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( credential => {
    
        // Update the user info with the given name
        return credential.user.updateProfile({ displayName: name } as User)
          .then ( () => credential !== null);
      });
  }

  public sendEmailVerification(): Promise<void> {
    return this.authenticated ? 
      this.authState.sendEmailVerification() : null;
  }

  public verifyEmail(code: string): Promise<void> {
    return this.afAuth.auth.applyActionCode(code);
  }

  public updateEmail(password: string, newEmail: string): Promise<void> {
    
    let email = this.authState.email;

    console.log("Updating user email for: ", email);

    // Gets fresh credentials for the current user
    let credential = auth.EmailAuthProvider.credential(email, password);
    
    // Re-authenticate the user with the fresh credentials
    return this.authState.reauthenticateWithCredential(credential)
      .then( () => {

        // Update the email
        return this.authState.updateEmail(newEmail);
      });
  }

  public updatePassword(password: string, newPassword: string): Promise<void> {
    
    let email = this.authState.email;

    console.log("Updating user password for: ", email);

    // Gets fresh credentials for the current user
    let credential = auth.EmailAuthProvider.credential(email, password);
    
    // Re-authenticate the user with the fresh credentials
    return this.authState.reauthenticateWithCredential(credential)
      .then( () => {

        // Update the password
        return this.authState.updatePassword(newPassword);
      });
  }

  public signIn(email: string, password: string): Promise<any>  {
    console.log("Signing in as: " + email);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public forgotPassword(email: string): Promise<void> {
    console.log("Resetting the password for: " + email);
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  public resetPassword(code: string, newPassword: string): Promise<void> {
    // TODO: check how to do so
    //this.afAuth.auth.verifyPasswordResetCode(code);

    console.log("Confirming the password with code: " + code);
    return this.afAuth.auth.confirmPasswordReset(code, newPassword)
  }

  public signInWith(provider: string, lang: string = undefined): Promise<boolean> {

    if(lang) {
      // Instruct firebase to use a specific language
      this.afAuth.auth.languageCode = lang;
    }

    console.log("Signing-in using: " + provider);

    let authProvider = null;

    switch(provider) {

      case 'google':
      authProvider = new auth.GoogleAuthProvider();
      break;
      
      case 'facebook':
      authProvider = new auth.FacebookAuthProvider();
      break;
    }

   if(authProvider === null) {
      return Promise.reject({
        code: 'auth/unsupported',
        message: 'Unsupported provider'
      });
    }

    return this.afAuth.auth.signInWithPopup(authProvider)
      .then( credential => credential !== null);
  }

  public signOut(): Promise <void> {
    console.log("Signing-out");
    return this.afAuth.auth.signOut();
  }

  public deleteUser(password: string): Promise<void> {

    let email = this.authState.email;
    
    console.log("Deleting the user ", email);

    // Gets fresh credentials for the current user
    let credential = auth.EmailAuthProvider.credential(email, password);
    
    // Re-authenticate the user with the fresh credentials
    return this.authState.reauthenticateWithCredential(credential)
  
      // Then deletes the account and sign-out
      .then( () => this.authState.delete() );
  }
  
}