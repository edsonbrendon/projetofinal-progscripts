export class Usuario {
  usuario: string;
  questionarios: Questionario[];
}

export class Questionario {
  titulo: string;
  inicio: number; //firebase.firestore.Timestamp;
  fim: number; //firebase.firestore.Timestamp;
}

export class QuestaoFechada {
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  alternativacorreta: string;
  resposta: string;
}

export class QuestaoAberta {
  enunciado: string;
  resposta: string;
}

export class Estatistica {
  titulo: string;
  a: number;
  b: number;
  c: number;
  d: number;
  tipo: string;
  sessao_qtd: any;
  sessao_nome: any;
  sessao_valor: any;
}
