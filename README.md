# Teste do processo seletivo da H4money

Esta interface foi contruida para o teste do processo seletivo da H4money. Conta com uma tela de login e uma simulação de um CRUD basico de usuário.

As requisiões são feitas para api de testes Reqres.in, porém como esta não armazena os dados passados, os dados informados, assim como o token de autorização, são salvos no localStorage e apagados depois de sair.

Para realizar login forneça um email definido da [Reqres.in](https://reqres.in/) (exemplo michael.lawson@reqres.in) e uma senha aleatória.

# Tecnologias usadas

<ul>
    <li>React Hooks</li>
    <li>Consumo da api Reqres.in com Axios</li>
    <li>Bibliteca de mensagens react-notifications</li>
    <li>Percistencia dos dados utilizando localStorage</li>
</ul>

# Prints

<p align="center">
  <img src="https://github.com/Matheus8560/H4money-teste/blob/master/screenshots/login.png" width=400 height=200/>
  <img src="https://github.com/Matheus8560/H4money-teste/blob/master/screenshots/cadastro.png" width=400 height=200/>
</p>

<p align="center">
  <img src="https://github.com/Matheus8560/H4money-teste/blob/master/screenshots/usuario_cadastrado.png" width=400 height=200/>
</p>

# Instalação

OBS.: É necessário que o [`NPM & Node`](https://nodejs.org/en/) e o [`Git`](https://git-scm.com/) estejam instalados.

Com os itens cidados acima intalado, basta executar este comandodos em seu teminal na pasta em que você desejar:

<ul>
    <li>git clone https://github.com/Matheus8560/H4money-teste.git</li>
    <li>cd H4money-teste</li>
    <li>npm install</li>
    <li>npm start</li>
</ul>
