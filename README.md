# PizzaChooser

Uma plataforma intuitiva para você montar sua pizza 😋

## Requisitos

1. Node 14+
2. NPM 7+

## Envs

`REACT_APP_API_URL`
Env de uma api mockada para buscar dados da pizza, tem por padrão o valor http://localhost:3004

## Executando o projeto

Execute os seguintes comandos para executar o projeto

1. Instale as dependências `npm i`
2. Execute o servidor local `npm run server-mock`
3. Inicie o projeto `npm run start`
4. Aproveite! \o/

## Testes

Para rodar os testes execute `npm test`

## Estrutura dos componentes

src
├── api
├── assests
├── components
├── contexts
├── layouts
├── pages

**api** - Requisições web
**assests** - Recursos de imagem
**contexts** - Contextos react
**components** - Componentes gerais (Header, Card)
**layouts** - Componentes de layout
**pages** - Componentes de página

## Mock de dados

Para o servidor mockado usamos um pacote simples e intuitivo `json-server` que permite mockar rapidamente servidores através de um json, o arquivo do mock está no diretório principal do projeto, no arquivo db.json
