# <div align="center">Trybe-wallet</div>

## Este projeto simula uma carteira de controle de despesas para desktop, com cotações de algumas moedas internacionais para conversão direta com o real (R$).

Projeto individual feito na Trybe com o intuito de aprender gerenciamento de estado entre componentes de classe React com o uso de Redux. link [app](https://trybe-wallet-valdeci97.vercel.app/)

## <div align="center">Tecnologias</div>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="50px" alt="Modelo atômico de Rutherford na cor azul claro" title="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="50px" alt="Traços curvilíneos na cor violeta" title="Redux" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" width="50px" alt="Pentágono azul com o número '3' branco dentro dele" title="CSS3" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" width="50px" alt="Pentágono vermelho com o número '5' branco dentro dele" title="HTML5" />
</div>

## <div align="center">Como usar</div>

Você vai precisar ter instalado [Git](https://git-scm.com/downloads), [Docker](https://docs.docker.com/engine/install/), [docker-compose plugin](https://docs.docker.com/compose/install/)\*\*

\*\*Apenas linux. Windows e Mac já instalam junto ao docker desktop.

##

Abra um terminal e clone o repositório

```
git clone git@github.com:Valdeci97/Trybe-wallet.git
```

Mude para a pasta do projeto

```
cd Trybe-wallet
```

Inicie o container docker

```
npm run compose:up
```

Caso o comando falhe, tente

```
npm run compose:up:alt
```

Se nada de errado aconteceu, a aplicação estará rodando no localhost na porta 3000.

Acesse http://localhost:3000/ para ver a aplicação.

Parando o container

```
npm run compose:down

ou

npm run compose:down:alt
```
