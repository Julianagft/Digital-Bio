// src/pages/api/example.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Retorna um exemplo de resposta
    res.status(200).json({ message: "Olá, este é um exemplo de resposta!" });
  } else {
    // Método não permitido
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
