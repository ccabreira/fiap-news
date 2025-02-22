# 📰 Fiap News API  

## 📌 Sobre o projeto  
A **Fiap News API** é uma API REST que permite **criação, edição, remoção e listagem de notícias**, além de **autenticação de usuários** com **JWT**.  

Ela usa **Node.js**, **Express.js** e **MongoDB**, suportando **upload de imagens** e garantindo **segurança com autenticação e rate limiting**.  

---

## 🚀 Tecnologias Utilizadas  

- **Node.js** - Ambiente de execução para JavaScript  
- **Express.js** - Framework para criação de APIs  
- **MongoDB** e **Mongoose** - Banco de dados NoSQL  
- **JWT (JSON Web Token)** - Autenticação segura  
- **Multer & Cloudinary** - Upload e armazenamento de imagens  
- **CORS & Rate Limiting** - Segurança e proteção contra ataques  

---

## 🛠️ Como rodar o projeto  

### 1️⃣ **Pré-requisitos**  
- **Node.js**, **MongoDB**, **Git**  

### 2️⃣ **Clone o repositório**  
```sh
git clone https://github.com/seu-usuario/fiap-news.git
cd fiap-news/backend
```

### 3️⃣ **Instale as dependências**  
```sh
npm install
```

### 4️⃣ **Crie o arquivo `.env`** com as configurações:  
```ini
PORT=5000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
CLOUD_NAME=sua_cloudinary_cloud_name
CLOUD_API_KEY=sua_cloudinary_api_key
CLOUD_API_SECRET=sua_cloudinary_api_secret
```

### 5️⃣ **Inicie a API**  
```sh
npm start
```
A API rodará em `http://localhost:5000` 🚀  

---

## 🔗 **Endpoints da API**  

### **Autenticação**  

| Método | Rota               | Descrição |
|--------|------------------|-----------|
| `POST` | `/users/register` | Cria um usuário |
| `POST` | `/users/login` | Faz login e retorna um token JWT |

### **Notícias**  

| Método | Rota          | Descrição |
|--------|--------------|-----------|
| `GET` | `/news`       | Lista todas as notícias |
| `GET` | `/news/:id`   | Detalhes de uma notícia |
| `POST` | `/news`      | Cria uma nova notícia (**autenticado**) |
| `PUT` | `/news/:id`   | Atualiza uma notícia (**autenticado**) |
| `DELETE` | `/news/:id` | Remove uma notícia (**autenticado**) |

---

## 📌 Exemplos  

### **Criar uma notícia**  
#### **POST** `/news`  
🔹 **Corpo da requisição:**  
```json
{
  "title": "Nova Descoberta",
  "category": "Ciência",
  "author": "Cíntia",
  "content": "Detalhes sobre a descoberta..."
}
```
🔹 **Resposta esperada:**  
```json
{
  "message": "Notícia criada com sucesso",
  "news": { "_id": "65abc123456", "title": "Nova Descoberta", "category": "Ciência" }
}
```

---

### **Login**  
#### **POST** `/users/login`  
🔹 **Corpo da requisição:**  
```json
{
  "email": "cintia@example.com",
  "password": "123456"
}
```
🔹 **Resposta esperada:**  
```json
{
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1..."
}
```
⚠️ **Use o token JWT** para acessar rotas protegidas:  
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📤 **Deploy**  

A API está no **Render**:  
🔗 [https://fiap-news-api.onrender.com](https://fiap-news-api.onrender.com)  

Para atualizar o deploy:  
```sh
git add .
git commit -m "Atualizando API"
git push origin main
```

---

## 📄 Licença  

Este projeto está sob a **MIT License**.  

💡 **Dúvidas ou sugestões?** Abra uma **issue** ou entre em contato! 🚀  
