import { plantillasLectura } from './utils/plantillas.js';

export function generarPrompt({ nombre, fecha, tipoLectura, contexto, cartas, nombreConsultado, fechaConsultado }) {
  const nombresCartas = cartas.map((c) => c.nombre).join(', ');

  let prompt = `Actuá como una tarotista empática, sabia y profesional. Vas a realizar una lectura con el mazo Rider-Waite para ${nombre}, nacid@ el ${fecha}`;

  if (nombreConsultado && fechaConsultado) {
    prompt += `, que consulta por ${nombreConsultado}, nacid@ el ${fechaConsultado}`;
  }

  prompt += `. Las cartas seleccionadas son: ${nombresCartas}. Tu respuesta debe ser emocional, fluida y espiritual. Evitá listas o ítems, salvo en lecturas estructuradas. Hablá como si le hablaras directamente al consultante, guiándolo con calidez y conexión.`;

  const clavesMapeadas = {
    'amor': 'Amor',
    'vinculo': 'Vinculo',
    'tradicional': 'Tradicional',
    'celta': 'Celta',
    'abundancia, prosperidad y protección': 'Abundancia',
    'protección y energía': 'Proteccion',
    'general': 'General',
    'expareja': 'Expareja',
    'nuevo vínculo amoroso': 'NuevoVinculo',
    'vidas pasadas': 'VidasPasadas'
  };

  const claveNormalizada = tipoLectura.trim().toLowerCase();
  const clave = clavesMapeadas[claveNormalizada];
  const plantilla = clave && plantillasLectura[clave];

  if (!plantilla) {
    console.warn('[AVISO] No se encontró plantilla para tipoLectura:', tipoLectura);
  }

  if (plantilla) {
    if (clave === 'VidasPasadas') {
      prompt += '\n\n' + plantilla({ nombre, cartas });
    } else {
      prompt += '\n\n' + plantilla({ contexto });
    }
  } else {
    prompt += '\n\nRealizá una lectura intuitiva usando las cartas indicadas. Respondé de forma emocional, conectada y clara.';
  }

  if (tipoLectura === 'General') {
    prompt += `\n\nAdemás, agregá una breve sección final con reflexiones personalizadas para las áreas de Amor, Trabajo, Familia y Sexo. Cada reflexión debe estar alineada con la energía de la lectura, lo que las cartas muestran y el contexto emocional del consultante. Evitá repetir textos genéricos.`;
  }
  return prompt;
}
