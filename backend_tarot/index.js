import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/interpretar', async (req, res) => {
  const { nombre, fecha, tipoLectura, contexto, cartas } = req.body;

  if (!nombre || !fecha || !tipoLectura || !cartas || cartas.length === 0) {
    return res.status(400).json({ error: 'Faltan datos necesarios para generar la interpretación.' });
  }

  const nombresCartas = cartas.map((c) => c.nombre).join(', ');

  let prompt = `Realiza una lectura de tarot Rider-Waite para una persona llamada ${nombre}, nacida el ${fecha}. Las cartas seleccionadas son: ${nombresCartas}. Usa una carta distinta para cada aspecto y desarrolla una interpretación específica y detallada para cada una.\n`;

  switch (tipoLectura) {
    case 'General':
      prompt += `El cliente indicó como situación sentimental: "${contexto}". Haz una lectura general con 25 cartas, distribuyendo 5 cartas para cada aspecto: Amor, Trabajo, Dinero, Salud y Familia. Interpreta cada aspecto en 5 puntos: situación actual, influencias, desafío, consejo y resultado final.`;
      break;

    case 'Amor':
      prompt += `El cliente indicó como situación sentimental: "${contexto}". Haz una lectura enfocada en el amor y responde en base a estas secciones: situación actual, influencias, desafío, consejo y resultado final.`;
      break;

    case 'Expareja':
      prompt += `El cliente proporcionó este contexto para una lectura de ex pareja: "${contexto}". Interpreta las cartas según estas secciones: situación actual, y responde una carta por cada una de las 4 preguntas que el cliente haya escrito. Agrega un consejo en profundidad.`;
      break;

    case 'Vidas pasadas':
      prompt += `Haz una lectura basada en vidas pasadas. Interpreta las cartas según estos aspectos: experiencias y lecciones de vidas pasadas que influyen en la vida actual, patrones repetitivos, relaciones kármicas, qué debe aprender, de qué debe soltarse, lecciones clave para su evolución, quién ha sido, qué ha aprendido y un mensaje final.`;
      break;

    case 'Abundancia, prosperidad y protección':
      prompt += `El cliente escribió lo siguiente: "${contexto}". Haz una lectura según los siguientes aspectos: situación actual, bloqueos o desafíos, influencias del pasado, tendencias actuales, oportunidades próximas, futuro cercano y futuro lejano.`;
      break;

    case 'Protección y energía':
      prompt += `Haz una lectura sobre protección energética. Interpreta las cartas según estos puntos: energía actual, energía externa influyente, origen del bloqueo, punto vulnerable, cómo protegerse, aliado espiritual, resultado si sigue el consejo, resumen y consejos de protección energética.`;
      break;

    case 'Vínculo':
      prompt += `Haz una lectura para evaluar un vínculo o conexión con otra persona. El contexto es: "${contexto}". Interpreta una carta por cada uno de los siguientes aspectos: situación actual del vínculo, qué siente por ti, qué piensa de ti, qué intenciones tiene contigo, si tiene intenciones con otra persona, y cuál es el futuro del vínculo.`;
      break;

    case 'Celta':
      prompt += `Realiza una lectura cruz celta tradicional con 10 cartas, indicando para cada una su posición: situación actual, desafío, influencias del pasado, influencias del presente, influencias del futuro, energía consciente, energía inconsciente, entorno, esperanzas o miedos, resultado final.`;
      break;

    case 'Tradicional':
    default:
      prompt += `Haz una lectura tradicional y responde de manera clara en base a las cartas indicadas. Interpreta libremente según los arcanos.`;
      break;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
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
