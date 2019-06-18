import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { LoginService, User } from '../login/login.service';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  private user: User;
  private sub: Subscription;

  private menu = [
    { caption: 'Verificar Email', mode: 'verifyEmail' },
    { caption: 'Trocar Email', mode: 'changeEmail' },
    { caption: 'Trocar Senha', mode: 'changePassword' },
    { caption: 'Deletar conta', mode: 'delete' },
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
      
    } );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}