import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Estatistica } from '../dados';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.css']
})
export class EstatisticaComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  i: number = 0;
  public nome: any[] = [];
  public valor: any[] = [];
  btn_grafico: string = "Inserir valor";

  public pieChartLabels: Label[] = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho'];
  public pieChartData: SingleDataSet = [20,50,30,78,118,45];
  public pieChartType: ChartType;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  private grafico: Estatistica;

  constructor() {    
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngOnInit() {
    this.grafico = new Estatistica();
    this.btn_grafico = "Inserir valor";
    this.grafico.tipo = 'pie'
    this.grafico.titulo = 'EXEMPLO - 1º Semestre/2019';
  }

  Limpar(){
    this.grafico = new Estatistica();
    this.grafico.titulo = 'EXEMPLO - 1º Semestre/2019';
    this.pieChartLabels = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho'];
    this.pieChartData = [20,50,30,78,118,45];
    this.grafico.tipo = 'pie'
    this.nome = [];
    this.valor = [];
    this.i = 0;
  }

  Inserir(){
    if(this.i >= this.grafico.sessao_qtd){
      this.pieChartLabels = this.nome;
      this.pieChartData = this.valor;
    } else {
        this.nome[this.i] = this.grafico.sessao_nome;
        this.valor[this.i] = this.grafico.sessao_valor;
        this.i++;
        if(this.i >= this.grafico.sessao_qtd){
          this.btn_grafico = "Gerar grafico";
        }
    }
  }
} 