# NetMapView

**NetMapView** — Painel simples para inventário/visualização de dispositivos de rede com backend em Node.js + Prisma e frontend estático.

---

## 📌 Visão geral

Projeto para gerenciar hosts (dispositivos) e usuários. Backend implementado em Node.js/Express com Prisma (MySQL/MariaDB) como ORM; frontend é estático (HTML/CSS/JS).

---

## ✅ Funcionalidades

* Listar hosts (`GET /hosts`)
* Criar host (`POST /hosts`)
* Apagar host (`DELETE /hosts/:id`)
* Listar usuários (`GET /users`)
* Cadastrar usuário (`POST /users`)
* Login (`POST /login`)

---

## 🦞 Requisitos

* Node.js (recomendo **v18.x** ou **v20.x**)
* npm
* MySQL
* Prisma (instalado como dependência do projeto)

---

## 🚀 Instalação (modo local)

> Os comandos abaixo assumem que você está na raiz do repositório `NetMapView`.

### 1. Backend

```bash
cd Back-End/servidores/equip
npm install
```

Crie um arquivo `.env` (na mesma pasta do `package.json`) com a variável `DATABASE_URL` (exemplo):

```text
DATABASE_URL="mysql://root:MINHA_SENHA@127.0.0.1:3306/netmapdb"
```

Se usar Prisma e houver migrações/`schema.prisma`:

```bash
npx prisma migrate dev --name init
# ou caso já tenha o schema sincronizado
npx prisma db push
```

### 2. Frontend (estático)

O frontend está em `Front-End/index.html`. Você tem duas opções:

* Servir como site estático separado (abrir `Front-End/index.html` no browser ou usar um servidor estático).
* Fazer o backend servir o frontend: copie o conteúdo para `Back-End/servidores/equip/public` **ou** ajuste o `server.js` para servir `../Front-End`.

Exemplo (ajuste `server.js` para ESM):

```js
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', '..', '..', 'Front-End')));
// ou servir public:
// app.use(express.static(path.join(__dirname, 'public')));
```

### 3. Iniciar servidor

```bash
# backend
npm start
# abrir no browser
http://localhost:3000
```

---

## ✉️ Contato

* Autores: Pedro Henrique Fernandes, Ana Clara Marques e Rebeca Dantas.
* Repositório: `PedroHenrique2204/NetMapView`
