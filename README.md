# projetofinal-progscripts

<h2>Faculdade de Tecnologia de São José dos Campos - Prof. Jessen Vidal </h2> <BR>
Curso: Analise e Desenvolvimento de Sistemas - B <BR>
Classe: 4º Semestre Turma B <BR>
Disciplina: Programação de Scrypts  <BR>
Desenvolvedores: Barbara Nogueira, Debora Santos, Edson Oliveira, Franklin Carvalheira

<h1>Introdução</h1>
Projeto possui o intuito de fornecer um suporte para criação de questionários de pesquisa exploratória, que são enviados por e-mail pare serem respondidas. Após podem ser verificadas as respostas e análisadas.
Elaborar um questionário é realmente um grande passo, mas é só o primeiro. Para aproveitar ao máximo as informações obtidas, use as referências para comparar seus resultados com os de todos do grupo. Feedbacks são uma forma importante de medir o sucesso nos ambiente estudados. Envie questionários para as pessoas e receba feedback sobre a opinião delas para ajudar a melhorar os resultados esperados.

Etapas da pesquisa:
Toda pesquisa de campo deve abordar o problema que quer resolver e se ela pode ser realizada de forma e no prazo correto. Assim, começa a etapa exploratória que averigua o terreno e expõe as limitações do projeto como tempo, orçamento e objeto de estudo. A partir disso são construídos instrumentos utilizados para coletar dados (pesquisas, entrevistas, questionários, etc.), através dos quais proporcionam informações que são analisadas detalhadamente e por onde será possível extrair um índice provisório. Com isso chega o momento de escrever um rascunho para discutir com outros especialistas antes da última etapa da pesquisa de campo, assim, o texto final é concluído com o conteúdo de apoio através de mapas, fotografias, quadros estatísticos, etc.

<h1>Site, Design e Bootstrap</h1>
O site foi desenvolvido de maneira responsiva, onde possui o suporte para ser utilizado tanto em desktops, como em tablets e smartphones. Em relação a seu design, utilizou-se de uma interface simples e eficiente com cores atrativas e ícones de acessos, para melhor usabilidade no site.
<h3>Flex Layout</h3> 
Junto com o Bootstrap tambem foi utilizado a biblioteca em CSS do Angular chamada  Flex-Laouyt, onde permite definir divs como colunas e linhas, configurando para que apareça no inicio, no meio ou no fim da pagina. As configurações das div's ficarão mais faceis de ser manipuladas, grantindo que fiquem responsivas.
 Acesse: https://tburleson-layouts-demos.firebaseapp.com/#/docs

<h1> Banco de Dados </h1>
<h3>Banco de Dados não Relacional</h3>
É um termo genérico para uma classe definida de banco de dados que fornecem um mecanismo para armazenamento e recuperação de dados que são modelados de formas diferentes das relações tabulares usadas nos bancos de dados relacionais sendo nomeado de NoSQL. Bancos de dados relacionais escalam, mas quanto maior o tamanho, mais custoso se torna essa escalabilidade, seja pelo custo de novas máquinas, seja pelo aumento de especialistas nos bancos de dados utilizados. Já os não relacionais, permitem uma escalabilidade mais barata e menos trabalhosa, pois não exigem máquinas extremamente poderosas e sua facilidade de manutenção permite que um número menor de profissionais seja necessário. 
<h3>Firebase</h3>
Firebase é uma plataforma de banco de dados mobile e web, adquirida pela Google em 2014. Com foco em ser um back-end completo e de fácil usabilidade, essa ferramenta disponibiliza diversos serviços diferentes que auxiliam no desenvolvimento e gerenciamento de aplicativos. O Firebase oferece serviços muito poderosos e de fácil implementação, com muitos serviços de forma gratuita. As vantagens é que é fácil prático rápido e totalmente via web por não ser um banco de dados relacional.
Acesse: https://firebase.google.com/?hl=pt-BR

<h1> Desenvolvimento do projeto </h1>
<h3>Materiais e Métodos </h3>
 Em toda fase do desenvolvimento do projeto conclusão foi utilizado diversas ferramentas e métodos, que contribuíram para o desenvolvimento das várias etapas e diretrizes do projeto. Serão detalhados a seguir os matérias e métodos utilizados.  
<h3> Softwares utilizados  </h3>
 Para desenvolvimento do site, foi utilizado o Angular, que é o alicerce de toda a aplicação, é uma framework em JavaScript que tem a funcionalidade de unir códigos. Toda a parte de programação, onde foi implementado as linhas de códigos, utilizou-se o StackBlitz. Em relação ao armazenamento dos dados do aplicativo, tanto do usuário como de seu conteúdo, foi empregado o Firebase, juntamente como forma de manipulação dos dados foi utilizado o AngularFire2.
<h3> Linguagens de programação utilizadas </h3>
O Angular é integrado com três linguagens de programação, o HTML que permitiu criar toda estrutura visual do aplicativo, definindo texto e botões, o CSS que forneceu suporte para o design, aplicando ele ao código HTML, e por último o TypeScript que permite realizar as funções e interações no aplicativo.

<h1> Componetes e recursos </h1>
A seguir será detalhados cada pasta e arquivos relevantes disponível na “src”.

<h3> Enviar </h3> 
Componente responsável por enviar os e-mail com os questões. Foi utilizado
o EmailsJS para monitoramento e envio de e-mail diretamente do Javascript para o destinátario.
Acesse: https://www.emailjs.com/

<h3> Estatistica </h3>
Componente responsavel por gerar os graficos, onde foi utilizado o ChartJS que fornece
a criação de gráficos javaScript simples e flexíveis.
Acesse: https://www.chartjs.org/

<h3> Home </h3>
Component responsavel pelo pagina inicial do site, onde dela podemos acessar qualquer lugar. É nesta pagina
que fica localizado o questionários criados, onde é possivel criar questionarios, alterar questionarios,
enviar questionarios por email e ser direcionado para a pagina de questões. Na Home possui tambem o serviço
responsavel por abri as janelas do tipo OpenModal de todo o site.

<h3> Login </h3>
Componente responsavel pela autenticação do usuário, é a primeira pagina acessada, onde é
obrigatório o login para acesso ao site. Nela podemos nos registrar, realizar login, definir nova senha,
enviar email de verificaçao de login, alterar email e deletar conta. Este componente está ligado ao component
Perfil. No Login também é o serviço responsavel por toda autenticação e controle de acesso no site.

<h3> NavBar </h3> 
Component responsavel pelo menu das páginas do tipo navbar, onde podemos nos deslocar pelo site. A NavBar
fornece acesso á página inicial, o perfil do usuário, os questionarios respondidos, o gerados de graficos,
a pagina que contem informações complementares sobre o site e o botão de sair (Logout).

<h3> Perfil </h3>
Neste componente é onde mostra as informações do usuário e é nele que nos direcionamos para realizar 
a verificação de email, troca de senha ou email e deletar a conta, no component Login.

<h3> Questão </h3>
Component responsavel por fornecer todos os assuntos relacionado as questões, nele podemos ver as questoes
atualmente cadastradas e direcionar para o cadastro de mais, no qual são realizados nos componentes
questaoaberta e questaofechada. Também podemos deletar e editar as questões.

<h3> Questaoaberta e Questaofechada </h3> 
Componente responsavel pelo cadastro e atualização das questoes.

<h3> Questionario </h3>
Componente responsavel pelo cadastro de questionarios, sendo acessado apenas pela home. É nele que é tratado todos
os servições relacionados as questionarios e questoes.

<h3> Responder </h3> 
Este componente não pode ser acessao pelo site, pois ele só é visto quando é respondido o questionário,
ou seja, após receber o email com o link de acesso as questões. Para pode iniciar o questionário é obrigatório
o fornecimento de um código ou nome de identificação para registro e controle no banco de dados.

<h3> Respostas </h3>
Em respostas é o componente responsavel por ler em todo o banco de dados as respontas fornecidas pelo item anterios,
onde é possivel ler quem respondeu, visto que é necessário um codigo de identificação ao responder, qual questionário
foi respondido e qual resposta de cada questão.

<h3> Sobre </h3> 
Parte complementar onde registra os objetivos do site e seus desenvolvedores.

<h3> Routing </h3>
Para qualquer acesso entre as página é utilizado um routing que defina as rostas e seus parametros.

<h3> Dados </h3>
Parte responsavel por criar todas as classes do site, sendo elas: Usuario, Questionario, Questao, QuestaoAberta,
QuestaoFechada, Estatistica.

<h3> Index </h3>
Local responsaváel pelo header dos html's onde foram adicionados scripts externos.

<h3> styles.scss e theme.scss </h3>
Local onde foram definidos todos os CSS gerais, ou seja, do site inteiro, como a cor de fundo da página. Também
possui os imports de bibliotecas necessárias para funcionamento de alguns componentes do site.
<BR><BR>
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/projetofinal-progscripts)
 <BR>
  
<h2>NOTA</h2>
Para funcionamento do site não esquecer de configurar as chaves do firebase (Firebase config) em: <b> src > app > login > login.service.ts </b> <BR>
Observação: Substituir os "X" por suas credenciais do firebase
