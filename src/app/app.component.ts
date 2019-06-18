import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { LoginService, User } from './login/login.service';
import { ReportService } from './report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { 'class': 'mat-typography' }
})
export class AppComponent implements OnInit, OnDestroy { 

  private user: User;
  private sub: Subscription;
  private uid: any;
  private usuarionome: any;

  private menu = [
    { caption: 'Verify email', mode: 'verifyEmail' },
    { caption: 'Change email', mode: 'changeEmail' },
    { caption: 'Change password', mode: 'changePassword' },
    { caption: 'Delete account', mode: 'delete' },
    { caption: 'Sign out', mode: 'signOut' },
  ];

  get authenticated() {
    return this.user !== null;
  }

  get messages(): string[] {
    return this.report.messages;
  }

  constructor(private icon: MatIconRegistry,
              private report: ReportService,
              private login: LoginService) {}

  ngOnInit() {

    // Registers font awesome among the available sets of icons for mat-icon component
    this.icon.registerFontClassAlias('fontawesome', 'fa');

    // Subscribe to the authState observable to know about login status changes
    this.sub = this.login.authState$.subscribe( user => {

      this.user = user;

        if (user != null) {
        this.uid = user.uid;
        this.usuarionome = user.displayName
        window.localStorage.setItem('uid', this.uid);
        window.localStorage.setItem('usuarionome', this.usuarionome);
      }
    } );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
