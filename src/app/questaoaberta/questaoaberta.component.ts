import { Component, OnInit } from '@angular/core';
import { TodoService } from '../questionario/todo.service';
import { map } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import { Usuario, Questionario, QuestaoAberta } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-questaoaberta',
  templateUrl: './questaoaberta.component.html',
  styleUrls: ['./questaoaberta.component.css']
})

export class QuestaoabertaComponent implements OnInit {

  private tituloaberto: string = 'Questão Aberta';
  private addButton: string = 'Adicionar Questão';
  private enunciado: string;
  private questionarios: Observable<any>;
  private questoes: Observable<any>;
  private usuariokey: string;
  private questaoaberta: QuestaoAberta;
  private questionariokey: string = '';
  private questaokey: string = '';
  private x: number;

  constructor(private service: TodoService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
      this.questoes = this.service.getAllQuestao(this.usuariokey, window.localStorage.getItem('questionariokey'));
    });
    this.questaoaberta = new QuestaoAberta();
    this.questaokey = '';
    this.service.currentContatoQuestion.subscribe(data => {
    if (data.questao && data.questaokey) {
      this.questaoaberta.enunciado = data.questao.enunciado;
      this.questaokey = data.questaokey;
    }
    })
    this.tituloaberto = window.localStorage.getItem('tituloaberto');
    this.addButton  = window.localStorage.getItem('addButton');
  }

    salvarQuestaoAberta() {
      if (this.questaokey){
        console.log("Atualizar");
        this.service.editarQuestao(this.usuariokey, this.questaoaberta, window.localStorage.getItem('questionariokey'), this.questaokey);
        this.addButton = 'Adicionar';
        this.tituloaberto = 'Questão Aberta'
        window.localStorage.setItem('addButton', this.addButton);
        window.localStorage.setItem('tituloaberto', this.tituloaberto);
     } else {
        console.log("Cadastrar"+ this.questoes);
        this.service.addQuestion(this.questaoaberta, this.usuariokey,window.localStorage.getItem('questionariokey'));
    }
    this.questaoaberta = new QuestaoAberta();
    this.questaokey = '';
  }
}