# 📚 Sistema de Gerenciamento de Biblioteca - Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

**Sistema completo para gerenciamento de biblioteca desenvolvido em Node.js**

</div>

---

## 🎯 **Sobre o Projeto**

Este é um sistema backend robusto para gerenciamento de biblioteca, desenvolvido com as melhores práticas de desenvolvimento usando Node.js, Express, Prisma ORM e MySQL. O sistema oferece controle completo sobre usuários, livros e movimentações da biblioteca.

## ✨ **Funcionalidades**

### 👥 **Gerenciamento de Usuários**
- ✅ Cadastro completo com nome, email e senha
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validação de email único
- ✅ Busca por ID e email

### 📖 **Gerenciamento de Livros**
- ✅ Cadastro com título, data de publicação, quantidade e ISBN
- ✅ CRUD completo
- ✅ Busca por título
- ✅ Controle de estoque

### 🏷️ **Tipos de Movimentação**
- ✅ Empréstimo
- ✅ Devolução
- ✅ Doação
- ✅ Descarte

### 📊 **Controle de Movimentações**
- ✅ Registro completo de todas as operações
- ✅ Relatórios por usuário
- ✅ Relatórios por livro
- ✅ Relatórios por período
- ✅ Histórico completo

---

## 🗄️ **Estrutura do Banco de Dados**

```mermaid
erDiagram
    tbl_usuario {
        int id PK
        varchar nome
        varchar email UK
        varchar senha
    }
    
    tbl_livro {
        int id PK
        varchar titulo
        date data_publicacao
        int quantidade
        varchar isbn
    }
    
    tipo_movimentacao {
        int id PK
        varchar tipo
    }
    
    tbl_movimentacao {
        int id PK
        int id_movimentacao FK
        int id_usuario FK
        int quantidade
        date data_movimentacao
        int id_livro FK
    }
    
    tbl_usuario ||--o{ tbl_movimentacao : "faz"
    tbl_livro ||--o{ tbl_movimentacao : "possui"
    tipo_movimentacao ||--o{ tbl_movimentacao : "define"
```

---

## 🚀 **Instalação e Configuração**

### **Pré-requisitos**
- Node.js (versão 16 ou superior)
- MySQL (versão 8 ou superior)
- npm ou yarn

### **1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Back-endBiblioteca
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure o banco de dados**
Crie um banco MySQL chamado `db_biblioteca` e configure o arquivo `.env`:

```env
PORT=8080
DATABASE_URL="mysql://usuario:senha@localhost:3306/db_biblioteca"
```

### **4. Execute o script SQL**
Execute o arquivo `Database/script.sql` no seu MySQL para criar as tabelas e dados de exemplo.

### **5. Gere o cliente Prisma**
```bash
npx prisma generate
npx prisma db push
```

### **6. Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

🎉 **Pronto! A API estará rodando em `http://localhost:8080`**

---

## 📡 **Endpoints da API**

### **Base URL:** `http://localhost:8080`

<details>
<summary><strong>👥 Usuários</strong> - <code>/v1/biblioteca/usuario</code></summary>

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/v1/biblioteca/usuario` | Listar todos os usuários |
| `GET` | `/v1/biblioteca/usuario/:id` | Buscar usuário por ID |
| `POST` | `/v1/biblioteca/usuario` | Criar novo usuário |
| `PUT` | `/v1/biblioteca/usuario/:id` | Atualizar usuário |
| `DELETE` | `/v1/biblioteca/usuario/:id` | Deletar usuário |

</details>

<details>
<summary><strong>📚 Livros</strong> - <code>/v1/biblioteca/livro</code></summary>

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/v1/biblioteca/livro` | Listar todos os livros |
| `GET` | `/v1/biblioteca/livro/:id` | Buscar livro por ID |
| `GET` | `/v1/biblioteca/livro/buscar?titulo=<titulo>` | Buscar por título |
| `POST` | `/v1/biblioteca/livro` | Criar novo livro |
| `PUT` | `/v1/biblioteca/livro/:id` | Atualizar livro |
| `DELETE` | `/v1/biblioteca/livro/:id` | Deletar livro |

</details>

<details>
<summary><strong>🏷️ Tipos de Movimentação</strong> - <code>/v1/biblioteca/tipo-movimentacao</code></summary>

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/v1/biblioteca/tipo-movimentacao` | Listar todos os tipos |
| `GET` | `/v1/biblioteca/tipo-movimentacao/:id` | Buscar tipo por ID |
| `POST` | `/v1/biblioteca/tipo-movimentacao` | Criar novo tipo |
| `PUT` | `/v1/biblioteca/tipo-movimentacao/:id` | Atualizar tipo |
| `DELETE` | `/v1/biblioteca/tipo-movimentacao/:id` | Deletar tipo |

</details>

<details>
<summary><strong>📊 Movimentações</strong> - <code>/v1/biblioteca/movimentacao</code></summary>

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/v1/biblioteca/movimentacao` | Listar todas as movimentações |
| `GET` | `/v1/biblioteca/movimentacao/:id` | Buscar movimentação por ID |
| `GET` | `/v1/biblioteca/movimentacao/usuario/:idUsuario` | Por usuário |
| `GET` | `/v1/biblioteca/movimentacao/livro/:idLivro` | Por livro |
| `GET` | `/v1/biblioteca/movimentacao/periodo?dataInicio=<data>&dataFim=<data>` | Por período |
| `POST` | `/v1/biblioteca/movimentacao` | Criar nova movimentação |
| `PUT` | `/v1/biblioteca/movimentacao/:id` | Atualizar movimentação |
| `DELETE` | `/v1/biblioteca/movimentacao/:id` | Deletar movimentação |

</details>

---

## 📝 **Exemplos de Uso**

### **Criar um usuário**
```http
POST /v1/biblioteca/usuario
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "123456"
}
```

### **Criar um livro**
```http
POST /v1/biblioteca/livro
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "data_publicacao": "1899-01-01",
  "quantidade": 5,
  "isbn": "978-85-359-0277-5"
}
```

### **Registrar empréstimo**
```http
POST /v1/biblioteca/movimentacao
Content-Type: application/json

{
  "id_movimentacao": 1,
  "id_usuario": 1,
  "quantidade": 1,
  "data_movimentacao": "2024-10-30",
  "id_livro": 1
}
```

---

## 🛠️ **Scripts Disponíveis**

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Iniciar** | `npm start` | Inicia o servidor em produção |
| **Desenvolvimento** | `npm run dev` | Inicia com nodemon |
| **Prisma Generate** | `npm run prisma:generate` | Gera o cliente Prisma |
| **Prisma Push** | `npm run prisma:push` | Sincroniza schema |
| **Prisma Migrate** | `npm run prisma:migrate` | Executa migrações |
| **Prisma Studio** | `npm run prisma:studio` | Interface visual |

---

## 📁 **Estrutura do Projeto**

```
Back-endBiblioteca/
├── 📁 Database/
│   └── 📄 script.sql                 # Script de criação do BD
├── 📁 prisma/
│   └── 📄 schema.prisma              # Schema do Prisma
├── 📁 src/
│   ├── 📁 config/
│   │   └── 📄 database.js            # Configuração do BD
│   ├── 📁 controllers/               # Controllers da API
│   │   ├── 📄 UsuarioController.js
│   │   ├── 📄 LivroController.js
│   │   ├── 📄 TipoMovimentacaoController.js
│   │   └── 📄 MovimentacaoController.js
│   ├── 📁 dao/                       # Data Access Objects
│   │   ├── 📄 UsuarioDAO.js
│   │   ├── 📄 LivroDAO.js
│   │   ├── 📄 TipoMovimentacaoDAO.js
│   │   └── 📄 MovimentacaoDAO.js
│   ├── 📁 models/                    # Modelos de dados
│   │   ├── 📄 Usuario.js
│   │   ├── 📄 Livro.js
│   │   ├── 📄 TipoMovimentacao.js
│   │   └── 📄 Movimentacao.js
│   └── 📁 routes/                    # Rotas da API
│       ├── 📄 index.js
│       ├── 📄 usuarioRoutes.js
│       ├── 📄 livroRoutes.js
│       ├── 📄 tipoMovimentacaoRoutes.js
│       └── 📄 movimentacaoRoutes.js
├── 📁 generated/
│   └── 📁 prisma/                    # Cliente Prisma gerado
├── 📄 app.js                         # Aplicação principal
├── 📄 package.json                   # Dependências
├── 📄 .env                           # Variáveis de ambiente
└── 📄 README.md                      # Este arquivo
```

---

## 🔧 **Tecnologias Utilizadas**

<div align="center">

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 16+ | Runtime JavaScript |
| **Express.js** | 4.18+ | Framework web |
| **Prisma** | 5.6+ | ORM para banco de dados |
| **MySQL** | 8+ | Sistema de banco de dados |
| **Body-Parser** | 1.20+ | Middleware para parsing |
| **CORS** | 2.8+ | Cross-Origin Resource Sharing |

</div>

---

## 👨‍💻 **Autor**

**Kauan de Assis Leonel Rodrigues**
- 📧 Email: [seu-email@exemplo.com]
- 💼 LinkedIn: [seu-linkedin]
- 🐱 GitHub: [seu-github]

---

## 📄 **Licença**

Este projeto está sob a licença **ISC**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Para contribuir:

1. 🍴 Fork o projeto
2. 🌟 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

---

## 📞 **Suporte**

Se você encontrar algum problema ou tiver dúvidas:

- 🐛 Abra uma [issue](../../issues)
- 💬 Entre em contato via email
- 📖 Consulte a documentação

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela! ⭐**

</div>
