# Pulsefy Backend

Backend da aplicação Pulsefy, uma plataforma de gerenciamento de playlists musicais integrada com o Spotify.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcryptjs
- Winston (Logging)
- Helmet (Segurança)
- Express Rate Limit

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/pulsefy-backend.git
cd pulsefy-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGODB_URI=sua_url_do_mongodb
JWT_SECRET=seu_jwt_secret
NODE_ENV=development
```

## 🚀 Executando o Projeto

Para desenvolvimento:

```bash
npm run dev
```

Para produção:

```bash
npm start
```

## 📚 Rotas da API

### Autenticação

- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter dados do usuário atual
- `PUT /api/auth/me` - Atualizar dados do usuário

### Dados do Usuário

- `GET /api/data` - Obter dados salvos do usuário
- `POST /api/data` - Criar novo item de dados
- `DELETE /api/data/:id` - Excluir item de dados

## 🔒 Segurança

- Autenticação via JWT
- Senhas criptografadas com bcrypt
- Proteção contra ataques com Helmet
- Rate limiting para prevenir abusos
- CORS configurado para origens específicas

## 📝 Logging

O sistema utiliza Winston para logging:

- Logs de requisições em `logs/request.log`
- Logs de erros em `logs/error.log`
