import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Listar dispositivos
app.get('/hosts', async (req, res) => {
  try {
    const hosts = await prisma.device.findMany();
    res.json(hosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar hosts' });
  }
});

// Adicionar dispositivo
app.post('/hosts', async (req, res) => {
  const { name, ip, type, location, status, description } = req.body;
  try {
    const newHost = await prisma.device.create({
      data: { name, ip, type, location, status, description }
    });
    res.json(newHost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar host' });
  }
});

// Apagar dispositivo
app.delete('/hosts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.device.delete({ where: { id: Number(id) } });
    res.json({ message: 'Dispositivo apagado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao apagar host' });
  }
});

// Listar usuários
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Cadastrar usuário
app.post('/users', async (req, res) => {
  try {
    const { nome, email, usuario, senha } = req.body;
    const passwordHash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: {
        name: nome,
        email,
        username: usuario,
        passwordHash
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ ok: false, error: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, user.passwordHash);
    if (!senhaValida) return res.status(401).json({ ok: false, error: 'Senha incorreta' });

    // envia apenas dados seguros do usuário
    const { passwordHash, ...userSafe } = user;
    res.json({ ok: true, user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Erro no login' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
