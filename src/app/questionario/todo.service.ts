import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Questionario, QuestaoAberta, QuestaoFechada, Estatistica  } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class TodoService {

addButton: string = 'Adicionar';
titulo: string = 'Cadastrar Questionário';

private questionario: Questionario [] = []; 

constructor(private firebase: AngularFireDatabase, private router: Router) { }

// Inserir Questionario (INSERT)
  addQuestionario(q: Questionario, usuariokey: string): void {
    console.log(q);
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

// Inserir Questão (INSERT)
    addQuestion(q: QuestaoAberta, usuariokey: string, questaokey): void {
    console.log(q);
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questaokey}/Questoes`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //Deletar Questionario (DELETE)
  DeleteQuiz(usuariokey:string, questionariokey) {
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`).remove(questionariokey); 
  }

  //Deletar Questao (DELETE)
   DeleteQuestion(usuariokey:string, questionariokey, questaokey) {
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`).remove(questaokey); 
  }

// Lel todos os Questionarios de um deterteminado usuario (READ)
  getAllQuestionario(usuariokey:string) {
    return this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/`,
      ref => ref.orderByChild('prj/usuarios/questionarios/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

// Ler todas as questoes de um determinado questionario (READ)
    getAllQuestao(usuariokey:string, questionariokey:string) {
    return this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`,
      ref => ref.orderByChild('prj/usuarios/questionarios/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

// Precisei usar isso para fazer funcionar o editar (QUESTIONARIO)
  private contatoSource = new BehaviorSubject({questionario: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  changeContato(questionario: Questionario, key: string) {
    this.contatoSource.next({ questionario: questionario, key: key });
  }

  // Precisei usar isso para fazer funcionar o editar (QUESTAO)
  private contatoSourceQuestion = new BehaviorSubject({questao: null, questionariokey: '', questaokey: '' });
  currentContatoQuestion = this.contatoSourceQuestion.asObservable();
 
  SourceQuestion(questao: Questionario, questionariokey: string, questaokey: string) {
    this.contatoSourceQuestion.next({ questao: questao, questionariokey: questionariokey, questaokey: questaokey });
  }

//Editar Questionario (UPDATE)
  editarQuestionario(usuariokey:string, questionario: Questionario, key: string){
      this.firebase.list(`prj/usuarios/${usuariokey}/questionarios`).update(key, questionario)
      .catch((error: any) => {
        console.error(error);
      });
  }

//Editar Questao (UPDATE)
  editarQuestao(usuariokey:string, questionario: Questionario, questionariokey: string, key: string){
    this.firebase.list(`prj/usuarios/${usuariokey}/questionarios/${questionariokey}/Questoes`).update(key, questionario)
      .catch((error: any) => {
        console.error(error);
      });
  }

  // Inserir Resposta (INSERT)
    addRespostas(q: QuestaoAberta, questionariokey, pessoa, usuariokey, questaokey): void {
    console.log(q);
    this.firebase.list(`prj/Respostas/Usuario/${usuariokey}/Pessoas/${pessoa}/questionarios/${questionariokey}/Questoes/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  todoList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    key: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  getTodoList() {
    this.todoList = this.firebase.list('todolist');
    return this.todoList.snapshotChanges();
  }
  
  insertTodo(todo) {
    if (todo.key == '') {
      this.todoList.push(todo);
    } else {
      this.todoList.update(todo.key, {
        title: todo.title,
        description: todo.description,
      });
    }
    this.resetForm();
  }
  
  editTodoList(todo: any) {
    todo
    this.form.patchValue(todo);
    this.addButton = 'Atualizar';
  }

  deleteTodoList($key: string) {
    this.todoList.remove($key);
  }
  
  resetForm() {
    this.addButton = 'Adicionar';
    this.form.reset();
  }
}