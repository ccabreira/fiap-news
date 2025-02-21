Fiap News API

  

📌 Sobre o projeto

A Fiap News API é uma API REST desenvolvida em Node.js com Express.js e MongoDB, permitindo a criação, consulta, atualização e remoção de notícias.

🚀 Tecnologias Utilizadas

Node.js - Ambiente de execução para JavaScript

Express.js - Framework para criação de APIs

MongoDB - Banco de dados NoSQL

Mongoose - ODM para MongoDB

Multer - Upload de arquivos

Dotenv - Gerenciamento de variáveis de ambiente

🛠️ Como rodar o projeto localmente

1️⃣ Pré-requisitos

Certifique-se de ter instalado:

Node.js

MongoDB

Git

2️⃣ Clone o repositório

 git clone https://github.com/seu-usuario/fiap-news.git
 cd fiap-news/backend

3️⃣ Instale as dependências

 npm install

4️⃣ Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione:

MONGO_URI=mongodb://localhost:27017/fiapnews
PORT=5000

5️⃣ Inicie a aplicação

 npm start

A API estará rodando em http://localhost:5000 🚀

🔗 Endpoints da API

📌 Listar todas as notícias

GET /news

🔹 Resposta de exemplo:

[
  {
    "_id": "65abc123456",
    "title": "Nova Tecnologia Revoluciona o Mercado",
    "category": "Tecnologia",
    "author": "Cíntia",
    "image": "/uploads/noticia1.jpg",
    "content": "Descrição da notícia aqui...",
    "date": "2025-02-21T00:26:52.735Z"
  }
]

📌 Criar uma nova notícia

POST /news

🔹 Corpo da requisição (multipart/form-data):

{
  "title": "Nova Descoberta Científica",
  "category": "Ciência",
  "author": "Cíntia",
  "image": "(arquivo.jpg)",
  "content": "Detalhes sobre a descoberta..."
}

📌 Atualizar uma notícia existente

PUT /news/:id

🔹 Parâmetro: id (ID da notícia)

📌 Remover uma notícia

DELETE /news/:id

🔹 Parâmetro: id (ID da notícia)

📌 Como contribuir

Fork este repositório

Crie uma branch com a feature desejada (git checkout -b minha-feature)

Faça o commit das mudanças (git commit -m 'Adicionando minha feature')

Envie para o repositório remoto (git push origin minha-feature)

Abra um Pull Request 🎉

📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

💡 Dúvidas ou sugestões? Sinta-se à vontade para abrir uma issue ou entrar em contato!
