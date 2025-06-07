import { plantillasLectura } from './utils/plantillas.js';

export function generarPrompt({ nombre, fecha, tipoLectura, contexto, cartas, nombreConsultado, fechaConsultado }) {
  const nombresCartas = cartas.map((c) => c.nombre).join(', ');

  // Introducción base con tono espiritual y profesional
  let prompt = `Actúa como una tarotista sabia, espiritual y empática. Vas a realizar una lectura de Tarot Rider-Waite para ${nombre}, nacido/a el ${fecha}`;

  if (nombreConsultado && fechaConsultado) {
    prompt += `, que consulta por ${nombreConsultado}, nacido/a el ${fechaConsultado}`;
  }

  prompt += `. Las cartas seleccionadas, en el orden exacto en que salieron, son: ${nombresCartas}.`;

  prompt += `\n\nResponde como si estuvieras en una sesión personalizada y amorosa. Usa un tono cálido, profesional, sin juicios, con lenguaje esperanzador y espiritual.`;
  prompt += ` Siempre habla en segunda persona ("tú", "te", "contigo").`;
  prompt += `\n\n⚠️ Importante: RESPONDE siguiendo el ORDEN EXACTO en que salieron las cartas. Cada interpretación debe respetar esa secuencia sin reordenarlas.`;

  // Normalizar clave de lectura
  const clavesMapeadas = {
    'amor': 'Amor',
    'pareja': 'Pareja',
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

  // Agregar estructura específica
  if (plantilla) {
    if (clave === 'VidasPasadas') {
      prompt += `\n\n${plantilla({ nombre, cartas })}`;
    } else {
      prompt += `\n\n${plantilla({ contexto })}`;
    }
  } else {
    prompt += `\n\nRealiza una lectura intuitiva basada en las cartas seleccionadas, manteniendo el orden exacto y usando un lenguaje esperanzador y espiritual.`;
  }

  // Instrucciones adicionales si es general
  if (clave === 'General') {
    prompt += `\n\nAgrega al final una breve reflexión personalizada para cada área (Amor, Trabajo, Dinero, Salud, Familia), en línea con la energía de la lectura.`;
  }

  return prompt;
}
