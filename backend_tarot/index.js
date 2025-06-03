// archivo: index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { generarPrompt } from './generarPrompt.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://senderodelaluna.com.ar',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/interpretar', async (req, res) => {
  const {
    nombre,
    fecha,
    tipoLectura,
    contexto,
    cartas,
    nombreConsultado,
    fechaConsultado,
  } = req.body;

  if (!nombre || !fecha || !tipoLectura || !cartas || cartas.length === 0) {
    return res
      .status(400)
      .json({ error: 'Faltan datos necesarios para generar la interpretación.' });
  }

  const prompt = generarPrompt({
    nombre,
    fecha,
    tipoLectura,
    contexto,
    cartas,
    nombreConsultado,
    fechaConsultado,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Sos una tarotista empática, sabia y profesional. Realizás lecturas con el mazo Rider-Waite, interpretando el mensaje de las cartas de forma espiritual, emocional y personalizada. Seguís exactamente la estructura que te dé el usuario si hay una plantilla específica.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.85,
      max_tokens: 4096,
    });

    const respuesta = completion.choices[0].message.content;
    res.json({ respuesta });
  } catch (error) {
    console.error('Error al interpretar:', error);
    res.status(500).json({ error: 'Ocurrió un error al generar la interpretación.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
