import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { LoginService } from './login.service';
import { $loginAnimations } from './login-animations';
import { $authProviders } from './providers';

export type pageTypes = 'register' | 'signIn' | 'forgotPassword' | 'resetPassword' | 'changePassword' | 'changeEmail' | 'delete';

let $msgs = {
  register: {// Register new user page
    title: 'Registrar',
    caption: 'Cadastre-se com meu email' 
  }, 
  signIn: { // Regular sign-in page
    title: 'Entre com sua conta!',
    caption: 'Entre com meu email' 
  },
  forgotPassword: {// Ask for password reset page
    title: 'Alterar Senha',
    caption: 'Alterar Senha' 
  },
  resetPassword: {// Reset to a new password page (2nd step after forgotPassword)
    title: 'Nova Senha',
    caption: 'Mude a senha' 
  },
  changeEmail: {// Change the email 
    title: 'Mude o e-mail',
    caption: 'Atualize o email' 
  },
  changePassword: {// Change the password (while authenticated)
    title: 'Mudar senha',
    caption: 'Atualize a senha' 
  },
  delete: {// Delete the user account
    title: 'Deletar conta',
    caption: 'Excluir a conta' 
  }
};

@Component({
  selector : 'wm-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css'],
  animations: $loginAnimations
})
export class LoginComponent implements OnInit {

  private page: pageTypes;
  private code: string;
  private msgs = $msgs;

  private form: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password: FormControl;
  private newEmail: FormControl;
  private newPassword: FormControl;
  
  private providers = $authProviders;
  private hide = true;
  private error = null;
  private progress = false;
  
  constructor(private login: LoginService,
              private report: ReportService,
              private route : ActivatedRoute,
              private router: Router) {

    this.name = new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, Validators.required);
    this.newEmail = new FormControl(null, [Validators.required, Validators.email]);
    this.newPassword = new FormControl(null, Validators.required);

    this.form = new FormGroup({});

    this.switchPage('signIn');
  }

  ngOnInit() {

    // Discrimnate among the login option using the queryParameters
    this.route.queryParamMap.subscribe( (params: ParamMap) => {

      let mode  = params.get('mode') || 'signIn';
      this.code = params.get('oobCode');

      console.log('login mode: ', mode);

      switch(mode) {

        case 'signOut':
        this.signOut();
        break;

        case 'verifyEmail':
        this.verifyEmail( this.code );
        break;

        default:
        this.switchPage(mode as pageTypes);
      }
    });
  }

  private switchPage(page: pageTypes) {

    // Removes all the controls from the form group
    Object.keys(this.form.controls).forEach( control => {
      this.form.removeControl(control);
    });
    
    // Add the relevant controls to the form according to selected page
    switch(this.page = page) {

      case 'register':
      this.form.addControl('name', this.name);
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);
      break;

      default:
      case 'signIn':
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);      
      break;

      case 'forgotPassword':
      this.form.addControl('email', this.email);
      break;

      case 'resetPassword':
      this.form.addControl('newPassword', this.newPassword);
      break;

      case 'changePassword':
      this.form.addControl('password', this.password);
      this.form.addControl('newPassword', this.newPassword);
      break;

      case 'changeEmail':
      this.form.addControl('password', this.password);
      this.form.addControl('newEmail', this.newEmail);
      break;

      case 'delete':
      this.form.addControl('password', this.password);      
      break;
    }
  }

  private showError(error: string) {

    this.error = error;
    this.progress = false;
    setTimeout(() => this.error = null, 5000);
  }

  private reportSuccess(message: string, jumpTo?: string) {
    
    this.progress = false;
    this.report.add(message);

    if(jumpTo) {
      
      this.router.navigate(['.'], { 
        relativeTo: this.route,
        queryParams: {
          mode: jumpTo
        } 
      });
    }
  }

  private loginAction() {
    
    switch(this.page) {

      default:
      case 'signIn':
      this.signIn( this.email.value, 
                   this.password.value );
      break;

      case 'register':
      this.registerNew( this.email.value, 
                        this.password.value, 
                        this.name.value );
                        alert('Conta criada com sucesso!');
                        this.router.navigate(['home']);
      break;

      case 'forgotPassword':
      this.forgotPassword( this.email.value );
      break;

      case 'resetPassword':
      this.resetPassword(this.code, this.newPassword.value );
      break;

      case 'changePassword':
      this.updatePassword( this.password.value,
                           this.newPassword.value );
                           this.router.navigate(['perfil']);
                           alert('Senha alterada com sucesso!');
      break;

      case 'changeEmail':
      this.updateEmail( this.password.value,
                        this.newEmail.value );
                        this.router.navigate(['perfil']);
                        alert('Email alterado com sucesso!');
      break;

      case 'delete':
      this.deleteAccount( this.password.value );
      alert('Conta excluida com sucesso!');
      this.router.navigate(['login']);
      break;
    }
  }

  // Login pelo Facebook e Google
  private signInWith(provider: string) { 

    this.progress = true;
  
    this.login.signInWith( provider )
      .then( () => this.reportSuccess('Conectado usando ' + provider + this.router.navigate(['home']) ) )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  // Login pelo Email
  private signIn(email: string, password: string) {
    
    this.progress = true;

    // Sign-in using email/password
    this.login.signIn(email, password)
      .then( () => this.reportSuccess('Assinado como ' + email + this.router.navigate(['home'])) )
      .catch( error => {
      // Keep the rror code on failure
      this.showError(error.code);
    });
  }

  private registerNew(email: string, password: string,name: string) {

    this.progress = true;

    // Registering a new user with a email/password
    this.login.registerNew(email, password, name )
      .then( () => this.reportSuccess('Registrado como ' + email) )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      });
  }

  private verifyEmail(code?: string) {
    
    this.progress = true;

    // When a verification code is specified, we treat the request as a confirmation
    if(code) {

      this.login.verifyEmail(code)
        .then( () => this.reportSuccess('Email verificado!') )
        .catch( error => {
          // Keep the error code on failure
          this.showError(error.code);
        });
    }
    else { // Otherwise, we treat the request to send a verification email

      this.login.sendEmailVerification()
      .then( () => this.reportSuccess('Confirmação de email enviada!') )
      .catch( error => {
        // Keep the error code on failure
        this.showError(error.code);
      });
    }
  }

  private forgotPassword(email: string) {
    
    this.progress = true;

    this.login.forgotPassword(email)
      .then( () => this.reportSuccess('Solicitar uma redefinição de senha para ' + email) )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  private resetPassword(code: string, newPassword: string) {

    this.progress = true;

    this.login.resetPassword(code, newPassword)
      .then( () => this.reportSuccess('Redefinir para uma nova senha', 'signIn') )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  private updateEmail(password: string, newEmail: string) {

    this.progress = true;
   
    this.login.updateEmail(password, newEmail)
      .then( () => this.reportSuccess('E-mail atualizado para ' + newEmail) )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  private updatePassword(password: string, newPassword: string) {

    this.progress = true;

    this.login.updatePassword(password, newPassword)
      .then( () => this.reportSuccess('Senha atualizada!') )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  private deleteAccount(password: string) {

    this.progress = true;
  
    this.login.deleteUser(password)
      .then( () => {
        this.reportSuccess('Conta excluída!', 'signIn');
      })
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }

  private signOut() {

    this.progress = true;

    this.login.signOut()
      .then( () => {
        this.reportSuccess('Signed out', 'signIn');
      })
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }
}  
