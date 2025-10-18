import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathDist = path.join(__dirname, '../front-end/dist');

const app = express();
const port = 3001;
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(pathDist));

app.get('/api/produto', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

app.get('/api/produto/:id', async (req, res) => {
  const { id } = req.params;
  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) },
  });
  res.json(produto);
});

app.get((req, res) => {
  res.sendFile(path.join(pathDist, 'index.html'));
});

app.post('/api/produto', async (req, res) => {
  const {
    titulo,
    preco,
    precoParcelado,
    precoDesconto,
    caracteristicas,
    imagens,
    estoque,
    freteGratis,
    full,
  } = req.body;

  const novoProduto = await prisma.produto.create({
    data: {
      titulo,
      preco,
      precoParcelado,
      precoDesconto,
      caracteristicas: JSON.stringify(caracteristicas),
      imagens: JSON.stringify(imagens),
      estoque,
      freteGratis,
      full,
    },
  });

  res.send(novoProduto);
});

app.post('/api/pedido', async (req, res) => {
  const { valorTotal, itensVenda } = req.body;

  const novoPedido = await prisma.pedido.create({
    data: {
      valorTotal,
      itensVenda: JSON.stringify(itensVenda),
    },
  });

  res.send(novoPedido);
});

app.delete('/api/produto/:id', async (req, res) => {
  const { id } = req.params;
  const produtoDeletar = await prisma.produto.delete({
    where: { id: Number(id) },
  });
  res.json(produtoDeletar);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
