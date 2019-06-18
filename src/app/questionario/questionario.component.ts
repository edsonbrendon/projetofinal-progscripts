import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { map } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import { Usuario, Questionario } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})

export class QuestionarioComponent implements OnInit {

  private titulo: string;
  private inicio: string;
  private fim: string;
  private questionarios: Observable<any>;
  private usuariokey: string;
  private questionario: Questionario;
  private key: string = '';
  
  constructor(private service: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //Inicializa com a UID do usuário e com todos os questionários do usuário.
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
    });
    //Pega os dados dos questionários e coloca em variaveis
    this.questionario = new Questionario();
    this.service.currentContato.subscribe(data => {
      if (data.questionario && data.key) {
        this.questionario = new Questionario();
        this.questionario.titulo = data.questionario.titulo;
        this.questionario.inicio = data.questionario.inicio;
        this.questionario.fim = data.questionario.fim;
        this.key = data.key;
      }
    })
  }

//Salvar e editar Questionário
  salvarQuestionario() {
    if (this.key) { 
      console.log("Atualizar");
      console.log("Questionario Key: " + this.key);
      this.service.editarQuestionario(this.usuariokey, this.questionario, this.key);
      alert("Questionário atualizado com sucesso!");
    } else {
      console.log("Cadastrar");
      console.log("Questionario Key: " + this.key);
      this.service.addQuestionario(this.questionario, this.usuariokey);
      alert("Questionário cadastrado com sucesso!");
    }
    this.service.addButton  = 'Adicionar';
  }

//Deletar Questionário
  DeletarQuestao(questionariokey: string){
    console.log("Deletando...");
    console.log("\n usuariokey: " + this.usuariokey +"\n questionariokey: "+ questionariokey );
    this.service.DeleteQuiz(this.usuariokey, questionariokey)
  }
}