import { Component, OnInit } from '@angular/core';
import { TodoService } from '../questionario/todo.service';
import { map } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import { Usuario, Questionario, QuestaoAberta, QuestaoFechada } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EnviarService } from '../home/enviar.service';
import { QuestaoabertaComponent } from '../questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent } from '../questaofechada/questaofechada.component';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})

export class QuestaoComponent implements OnInit {

  private tituloaberto: string = 'Questão Aberta';
  private titulofechado: string = 'Questao Fechada';
  private addButton: string = 'Adicionar';
  private enunciado: string;
  private respostas: string;
  private alternativaA: string;
  private alternativaB: string;
  private alternativaC: string;
  private alternativaD: string;
  private alternativacorreta: string;
  private questionarios: Observable<any>;
  private questoes: Observable<any>;
  private usuariokey: string;
  private questaoaberta: QuestaoAberta;
  private questaofechada: QuestaoFechada;
  private questionariokey: string = '';
  private questaokey: string = '';
  private x: number;
  private questionariotitulo: string;

  constructor(private service: TodoService, private router:Router, private route: ActivatedRoute, public dialogService:EnviarService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = window.localStorage.getItem('uid');
      this.questionarios = this.service.getAllQuestionario(this.usuariokey);
      this.questoes = this.service.getAllQuestao(this.usuariokey, window.localStorage.getItem('questionariokey'));
      this.questionariotitulo = window.localStorage.getItem('questionariotitulo');
    });
    this.questaoaberta = new QuestaoAberta();
    this.questaofechada = new QuestaoFechada();
    this.questaokey = '';
    this.service.currentContatoQuestion.subscribe(data => {
      if (data.questao && data.questaokey) {
        this.questaoaberta.enunciado = data.questao.enunciado;
        this.questaokey = data.questaokey;
        this.questaofechada.enunciado = data.questao.enunciado;
        this.questaofechada.alternativaA = data.questao.alternativaA;
        this.questaofechada.alternativaB = data.questao.alternativaB;
        this.questaofechada.alternativaC = data.questao.alternativaC;
        this.questaofechada.alternativaD = data.questao.alternativaD;
        this.questaofechada.alternativacorreta = data.questao.alternativacorreta;
       }
    })
  }

  DeletarQuestao(questaoabertakey: string){
    var resposta = confirm("Tem certeza que deseja remover esta questão?");
    if (resposta == true) {
      console.log("Deletando...");
      console.log("\n Usuario Key: " + this.usuariokey + 
                  "\n Questionario Key: " + window.localStorage.getItem('questionariokey') + 
                  "\n Questao Key: "+ questaoabertakey);
      this.service.DeleteQuestion(this.usuariokey, window.localStorage.getItem('questionariokey'), questaoabertakey)
    }   
  }

  edit(questionario: Questionario, questaokey: string, questao){
    if(questao==null){
      this.x = 3;
      this.addButton = 'Atualizar';
      this.tituloaberto = 'Atualizar questão aberta'
      window.localStorage.setItem('addButton', this.addButton);
      window.localStorage.setItem('tituloaberto', this.tituloaberto);
    }else{
      this.x = 4;
      this.addButton = 'Atualizar';
      this.titulofechado = 'Atualizar questão fechada'
      window.localStorage.setItem('addButton', this.addButton);
      window.localStorage.setItem('titulofechado', this.titulofechado);
    }
    this.service.SourceQuestion(questionario, window.localStorage.getItem('questionariokey'), questaokey);
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  CadastrarQuestoesAberta(){
    this.addButton = 'Adicionar';
    this.tituloaberto = 'Questão Aberta'
    window.localStorage.setItem('addButton', this.addButton);
    window.localStorage.setItem('tituloaberto', this.tituloaberto);
    this.x = 3;
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

   CadastrarQuestoesFechada(){
    this.addButton = 'Adicionar';
    this.titulofechado = 'Questão Fechada'
    window.localStorage.setItem('addButton', this.addButton);
    window.localStorage.setItem('titulofechado', this.titulofechado);
    this.x = 4;
    var data = null;//call api
    this.dialogService.openModal("Title1","Message Test", ()=>{
      //confirmed
      console.log('Yes');
    }, ()=>{
      //not confirmed
      console.log('No');
    },this.x);
  }

  
gerarPDF() {
  let documento = new jsPDF();
  documento.text("Relatório em PDF no Angular", 10, 10);
  documento.output("dataurlnewwindow");
}
}