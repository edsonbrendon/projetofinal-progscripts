import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoService } from '../questionario/todo.service';
import { map } from 'rxjs/operators';
import { LoginService, User } from '../login/login.service';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';
import { MatIconRegistry } from '@angular/material';
import { Usuario, Questionario } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import {Timestamp} from 'firebase.firestore';
/* instalar a biblioteca @firebase/util */
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EnviarService } from './enviar.service';//kkkkkk

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: User;
  private sub: Subscription;
  private questionario: Questionario;
  private key: string;
  private url: string;
  private titulo: string;
  private inicio: string;
  private fim: string;
  private questionarios: Observable<any>;
  private usuariokey: string;
  private usuarionome: string;
  private x: number;

  get authenticated() {
    return this.user !== null;
  }

  constructor(private service: TodoService, private router:Router, private route: ActivatedRoute, public dialogService:EnviarService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.usuarionome = window.localStorage.getItem('usuarionome');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
    });
  }

  DeletarQuestionario(questionariokey: string){
      var resposta = confirm("Tem certeza que deseja remover este questionário?");
 
     if (resposta == true) {
      console.log("Deletando...");
      console.log("\n usuariokey: " + this.usuariokey +"\n questionariokey: "+ questionariokey );
      this.service.DeleteQuiz(this.usuariokey, questionariokey)
     }
  }

  AdicionarQuestionario(): void {
    this.service.addButton = 'Adicionar';
    this.service.titulo = 'Cadastrar Questionário';
    this.x = 2;
    this.questionario = null;
    this.key = null;
    this.service.changeContato(this.questionario, this.key);
    
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  AdicionarQuestao(questionariokey:string, questionariotitulo): void {
    console.log("Indo para a Tela de Cadastrar Questão \n questionariokey: "+questionariokey);
    window.localStorage.setItem('questionariokey', questionariokey);
    window.localStorage.setItem('questionariotitulo', questionariotitulo);
    this.router.navigate(['questao']);
  }

  edit(questionario: Questionario, questionariokey: string){
    this.x = 2;
    this.service.titulo  = 'Atualizar Questionário';
    this.service.addButton  = 'Atualizar';
    this.service.changeContato(questionario, questionariokey);

    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  openModal(questionariokey:string) {
    this.x = 1;
    this.url = ("https://projetofinal-progscripts.jfvv4h.stackblitz.io/responder/"+this.usuariokey+"/"+questionariokey);
    window.localStorage.setItem('url',this.url);
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  Responder(questionariokey:string, questionariotitulo:string){
    console.log("Responder questionario: "+questionariokey);
    window.localStorage.setItem('questionariokey', questionariokey);
    window.localStorage.setItem('questionariotitulo',questionariotitulo);
    this.router.navigate(['responder']);
  }
  
}