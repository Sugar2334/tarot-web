// archivo: utils/plantillas.js

export const plantillasLectura = {
  General: ({ contexto }) => `
Contexto sentimental del consultante: "${contexto}"

Realizá una lectura general usando 25 cartas, organizada por aspectos de la vida. Asigná 5 cartas a cada uno de los siguientes ámbitos, con este formato estructurado para cada uno:

Aspecto Amor:
- Situación actual:
- Influencias:
- Desafío:
- Consejo:
- Resultado final:

Aspecto Trabajo:
- Situación actual:
- Influencias:
- Desafío:
- Consejo:
- Resultado final:

Aspecto Dinero:
- Situación actual:
- Influencias:
- Desafío:
- Consejo:
- Resultado final:

Aspecto Salud:
- Situación actual:
- Influencias:
- Desafío:
- Consejo:
- Resultado final:

Aspecto Familia:
- Situación actual:
- Influencias:
- Desafío:
- Consejo:
- Resultado final:

Redactá con claridad, profesionalismo y calidez. Respondé como una tarotista empática que guía al consultante en cada área de su vida.`,

  Amor: ({ contexto }) => `
Contexto sentimental del consultante: "${contexto}"

Hacé una lectura centrada en el amor entre el consultante y su vínculo. Desarrollá:
- Situación actual
- Influencias
- Desafío
- Consejo
- Resultado final

Usá un tono emocional, realista y esperanzador, sin hablar de trabajo, dinero ni salud.`,

  Expareja: ({ contexto }) => `
El consultante escribió: "${contexto}"

Esta lectura de ex pareja fue realizada por la tarotista seleccionando las cartas con el mazo Rider-Waite, de manera intuitiva y conectada con la energía del consultante.  
No fue el usuario quien eligió las cartas, por lo tanto evitá expresiones como “las cartas que seleccionaste” o similares. Asigná una carta a cada una de estas secciones:
- Situación actual
- Pregunta 1
- Pregunta 2
- Pregunta 3
- Pregunta 4
(Fundadas en el contexto brindado por el consultante)
- Consejo final

Al final, agregá una recomendación especial: un mensaje reflexivo, empático y emocional que ayude al consultante a cerrar el ciclo, soltar el pasado o enfocarse en su bienestar sentimental.

Luego de eso, copiá exactamente este texto como cierre de la lectura, sin modificarlo:

Además, considerando lo vivido entre ustedes, podrías trabajar en un proceso energético conocido como endulzamiento.
Se trata de un ritual muy sutil y respetuoso que ayuda a disipar energías negativas, bloqueos emocionales y abrir nuevamente caminos de amor, deseo y reconciliación.
Es un impulso dulce que no fuerza voluntades, sino que limpia y favorece la renovación sana del vínculo, permitiendo que todo pueda fluir desde el corazón.
`.trim(),

VidasPasadas: ({ nombre, cartas }) => {
  const c = (i) => cartas[i]?.nombre || '[nombre de la carta]';
  return `
Vidas pasadas ${nombre}

Claro, aquí tienes una lectura completa de vidas pasadas para tu cliente ${nombre}, realizada exclusivamente con las cartas del Tarot Rider-Waite, hablándole a él como si estuvieras en consulta personalizada. 

Este tipo de lectura se enfoca en traer a la luz energías, aprendizajes y karmas de otras vidas que influyen en la actual.

🔮 Lectura de Vidas Pasadas para ti, ${nombre}

${nombre}, gracias por abrirte a esta lectura tan profunda. Las cartas que he seleccionado para ti me brindan el siguiente mensaje espiritual. Lo que revelan no son historias literales, sino imágenes simbólicas que nos muestran patrones espirituales, aprendizajes y desafíos que arrastras desde otras encarnaciones y que hoy pueden estar influyendo en tu camino.

Vamos a sumergirnos en esta exploración.

1️⃣ ¿Quién fuiste en una vida pasada significativa?
Carta: ${c(0)}
[Interpretación espiritual sobre tu rol e identidad en esa encarnación.]

2️⃣ ¿Qué experiencias marcantes viviste en esa vida?
Carta: ${c(1)}
[Lecciones centrales, situaciones poderosas, y aprendizajes clave.]

3️⃣ ¿Qué heridas o karmas arrastras desde esa vida?
Carta: ${c(2)}
[Emociones bloqueadas, patrones de apego, dolor, culpa o miedos no resueltos.]

4️⃣ ¿Qué don o sabiduría traes desde esa vida?
Carta: ${c(3)}
[Talentos internos o virtudes que tu alma desarrolló y hoy podés aprovechar.]

5️⃣ ¿Qué patrón se repite en esta vida?
Carta: ${c(4)}
[Comportamiento que vuelve a aparecer en esta vida por tu historia kármica.]

6️⃣ ¿Cuál es tu misión actual, en esta vida?
Carta: ${c(5)}
[Tu propósito espiritual actual conectado con lo no resuelto en la vida pasada.]

7️⃣ Consejo profundo del alma
Carta: ${c(6)}
[Mensaje espiritual final que ayude a integrar la experiencia y sanar.]

✨ Resumen final

${nombre}, tu alma viene de experiencias poderosas donde tuviste autoridad y enfrentaste decisiones difíciles. Hoy, traés la fuerza para construir, pero también el reto de liberarte del control, del miedo al deseo y de ciertas cargas emocionales.

Tenés una gran misión: ser vos mismo con alegría, sanar desde el amor, y confiar en tu luz interior.

Las cartas muestran que esta vida es una oportunidad de renacimiento espiritual, y que tenés todo lo necesario para vivir con plenitud si elegís soltar el pasado con conciencia.
`.trim();
},


  Abundancia: ({ contexto }) => `
Contexto: "${contexto}"

Lectura centrada en abundancia, prosperidad y protección. Analizá:
- Situación actual
- Bloqueos
- Influencias pasadas
- Tendencias presentes
- Oportunidades próximas
- Futuro cercano
- Futuro lejano

Tono inspirador, emocional y profundo. Cierre con mensaje esperanzador.`,

  Proteccion: ({ contexto }) => `
Contexto: "${contexto}"

Lectura centrada en energía y protección. Evaluá:
- Energía actual
- Influencias externas
- Origen del bloqueo
- Punto vulnerable
- Cómo protegerse
- Aliado espiritual
- Resultado si sigue el consejo
- Consejo final

Tono protector, empático y espiritual.`,

  Vinculo: ({ contexto }) => `
Contexto emocional: "${contexto}"

Lectura sobre el vínculo con otra persona. Explorá:
- Situación actual
- Qué siente el otro
- Qué piensa
- Qué intenciones tiene
- Si hay terceros
- Futuro del vínculo

Tono cálido y afectivo. No hablar de trabajo ni salud.`,

  Celta: () => `
Lectura cruz celta tradicional. Indicá la posición e interpretación de:
- Situación actual
- Desafío
- Influencias del pasado
- Influencias del presente
- Influencias del futuro
- Mente consciente
- Energía inconsciente
- Entorno
- Esperanzas o miedos
- Resultado final

Tono sabio, ordenado y espiritual.`,

  Tradicional: () => `
Realizá una lectura tradicional sin estructura fija. Interpretá intuitivamente las cartas seleccionadas según su energía y conexión con el consultante. Tono emocional, libre y profundo.`,

  NuevoVinculo: ({ contexto }) => `
Contexto amoroso: "${contexto}"

Lectura sobre un nuevo vínculo amoroso. Desarrollá:
- Energía de la conexión
- Qué siente la otra persona
- Obstáculos
- Consejo
- Posible evolución

Tono suave, reflexivo y emocional.`
};