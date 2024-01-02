# Backend da PlataformaWeb
Este é o repositório do backend para o projeto. Ele fornece a funcionalidade do lado do servidor para a aplicação.

## Antes de começar, para a aplicação funcionar é necessário:
- Instalar o [NodeJS](https://nodejs.org/en/)
- Instalar o banco de dados para armazenamento [MongoDB](https://www.mongodb.com/try/download/community).
- Faça o clone do repositório. Após o clone do repositório seguir as instruções a seguir.

## Instalação
- Para executar o servidor `backend` localmente, siga estas etapas:
- Clone o repositório: `git clone https://github.com/Wleocadio/backend.git`.
- Navegue até o diretório do projeto:  `cd backend`.
- Instale as dependências: `npm install`.

## Uso
Os seguintes scripts estão disponíveis para executar o servidor backend:

- `npm start`: Inicia o servidor usando `nodemon` para reiniciar automaticamente em caso de alterações nos arquivos.
- `npm run dev`: Alias para `npm start`.

## Dependências
O servidor backend depende das seguintes dependências:

- `bcryptjs`: Biblioteca para hash de senhas e comparação.
- `cors`: Middleware para habilitar o Compartilhamento de Recursos de Origem Cruzada (CORS).
- `express`: Framework web para Node.js.
- `jsonwebtoken`: Implementação de JSON Web Token (JWT) para autenticação.
- `mongoose`: Biblioteca para modelagem de objetos de dados (ODM) para MongoDB.
- Para instalar as dependências, execute `npm install`.

## Dependências de Desenvolvimento
A seguinte dependência de desenvolvimento é usada para fins de desenvolvimento:

- `nodemon`: Utilitário para reiniciar automaticamente o servidor durante o desenvolvimento.
- Para instalar a dependência de desenvolvimento, execute `npm install --save-dev nodemon`.