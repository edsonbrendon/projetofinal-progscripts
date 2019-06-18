import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoService } from '../questionario/todo.service';
import { map } from 'rxjs/operators';
import { LoginService, User } from '../login/login.service';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user: User;
  private sub: Subscription;

  private menu = [
    { caption: 'Sair', mode: 'signOut' }
  ];

  get authenticated() {
    return this.user !== null;
  }

  todoList;
  constructor(public service: TodoService, private icon: MatIconRegistry, private report: ReportService, private login: LoginService) { }

  ngOnInit() {
    this.service.getTodoList().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.todoList = customers;
    });
        // Registers font awesome among the available sets of icons for mat-icon component
    this.icon.registerFontClassAlias('fontawesome', 'fa');

    // Subscribe to the authState observable to know about login status changes
    this.sub = this.login.authState$.subscribe( user => {

      this.user = user;

    } );
  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.insertTodo(this.service.form.value);
    }
  }
    ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
}