import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuestaoComponent } from './questao/questao.component';
import { RespostasComponent } from './respostas/respostas.component';
import { ResponderComponent } from './responder/responder.component';
import { SobreComponent } from './sobre/sobre.component';
import { EstatisticaComponent } from './estatistica/estatistica.component';

// Define navigation routes
const routes: Routes = [
  // Global NotFound page using default language content
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questao', component: QuestaoComponent },
  { path: 'respostas', component: RespostasComponent },
  { path: 'responder', component: ResponderComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'estatistica', component: EstatisticaComponent },
  { path: 'responder/:usuariokey/:questionario.key', component: ResponderComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}