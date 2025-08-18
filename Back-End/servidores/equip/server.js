import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Listar dispositivos
app.get('/hosts', async (req, res) => {
  const hosts = await prisma.device.findMany();
  res.json(hosts);
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

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
