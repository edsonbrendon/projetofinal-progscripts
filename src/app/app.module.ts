import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatCardModule} from '@angular/material/card';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatDividerModule,
  MatListModule

} from '@angular/material';
import { AppComponent } from './app.component';
import { ReportService } from './report.service';
import { LoginComponent } from './login/login.component';
import { LoginService, config } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { TodoService } from './questionario/todo.service';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestaoComponent } from './questao/questao.component';
import { RespostasComponent } from './respostas/respostas.component';
import { EnviarComponent } from './enviar/enviar.component';
import { EnviarService } from './home/enviar.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResponderComponent } from './responder/responder.component';
import { QuestaoabertaComponent } from './questaoaberta/questaoaberta.component';
import { QuestaofechadaComponent } from './questaofechada/questaofechada.component';
import { RespostasService } from './respostas/respostas.service';
import { SobreComponent } from './sobre/sobre.component';
import { EstatisticaComponent } from './estatistica/estatistica.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports:      [   
    BrowserModule, 
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AppRoutingModule,
    MatCardModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    ChartsModule,
  ],
  
  declarations: [ 
    AppComponent, 
    LoginComponent, 
    HomeComponent, PerfilComponent, QuestionarioComponent, NavbarComponent, QuestaoComponent, RespostasComponent, EnviarComponent, ResponderComponent, QuestaoabertaComponent, QuestaofechadaComponent, SobreComponent, EstatisticaComponent
  ],

  providers: [
    LoginService,
    ReportService,
    TodoService,
    EnviarService,
    RespostasService,
  ],
  
  bootstrap: [ AppComponent ],

  entryComponents: [ EnviarComponent, QuestaofechadaComponent, QuestaoabertaComponent ],
})
export class AppModule { }
