export const plantillasLectura = {
  General: ({ contexto }) => `
Contexto sentimental del consultante: "${contexto}"

Realiza una lectura general con 25 cartas, organizada por aspectos de la vida. Asigna 5 cartas a cada uno de los siguientes ámbitos, respetando el orden exacto en que salieron:

🔹 Amor:
1. Situación actual
2. Influencias
3. Desafío
4. Consejo
5. Resultado final

🔹 Trabajo:
1. Situación actual
2. Influencias
3. Desafío
4. Consejo
5. Resultado final

🔹 Dinero:
1. Situación actual
2. Influencias
3. Desafío
4. Consejo
5. Resultado final

🔹 Salud:
1. Situación actual
2. Influencias
3. Desafío
4. Consejo
5. Resultado final

🔹 Familia:
1. Situación actual
2. Influencias
3. Desafío
4. Consejo
5. Resultado final

Responde en tono cálido, espiritual y profesional.`,


  Pareja: ({ contexto }) => `
Contexto emocional del consultante: "${contexto}"

Esta lectura de pareja utiliza 6 cartas que deben interpretarse en el siguiente orden exacto:

1. Situación actual de la relación  
2. Pregunta 1  
3. Pregunta 2  
4. Pregunta 3  
5. Pregunta 4  
6. Consejo final

Responde en un tono empático, sin juzgar a ninguna de las partes. Cada sección debe conectarse fluidamente con la energía reflejada por la carta asignada.`,


  Amor: ({ contexto }) => `
Contexto sentimental del consultante: "${contexto}"

Realiza una lectura de 5 cartas enfocada en la situación amorosa actual. Las cartas deben ser interpretadas en el orden exacto en que salieron:

1. Situación actual  
2. Pregunta 1  
3. Pregunta 2  
4. Pregunta 3  
5. Consejo final

Tono emocional, realista, espiritual y respetuoso.`,


  Expareja: ({ contexto }) => `
El consultante escribió: "${contexto}"

Esta lectura fue realizada por la tarotista seleccionando las cartas de forma intuitiva. No fue el consultante quien eligió las cartas, por lo tanto evita expresiones como “las cartas que seleccionaste”.

La lectura debe seguir exactamente el orden en que salieron las cartas:

1. Situación actual del vínculo  
2. Pregunta 1  
3. Pregunta 2  
4. Pregunta 3  
5. Pregunta 4  
6. Consejo final

Incluye una recomendación emocional, reflexiva y contenida al final. Luego, cierra la interpretación copiando este mensaje exactamente:

Además, considerando lo vivido entre ustedes, podrías trabajar en un proceso energético conocido como endulzamiento.  
Se trata de un ritual muy sutil y respetuoso que ayuda a disipar energías negativas, bloqueos emocionales y abrir nuevamente caminos de amor, deseo y reconciliación.  
Es un impulso dulce que no fuerza voluntades, sino que limpia y favorece la renovación sana del vínculo, permitiendo que todo pueda fluir desde el corazón.`,


  NuevoVinculo: ({ contexto }) => `
Contexto amoroso: "${contexto}"

Lectura para un nuevo vínculo. Asigna cada una de las 6 cartas en este orden exacto:

1. Situación actual de la conexión  
2. Qué siente la otra persona  
3. Qué piensa  
4. Qué intenciones tiene  
5. Obstáculo o bloqueo  
6. Consejo final

Tono emocional, claro y espiritual.`,


  VidasPasadas: ({ nombre, cartas }) => {
    const c = (i) => cartas[i]?.nombre || '[nombre de la carta]';
    return `
Lectura de vidas pasadas para ${nombre}

Esta lectura fue realizada de forma intuitiva por la tarotista. Las cartas que se han elegido guían esta exploración simbólica y espiritual.

A continuación, interpreta cada carta respetando su orden exacto:

1️⃣ ¿Quién fuiste en una vida pasada significativa?  
Carta: ${c(0)}  
[Interpretación espiritual sobre tu rol.]

2️⃣ ¿Qué experiencias marcantes viviste en esa vida?  
Carta: ${c(1)}  
[Lecciones clave.]

3️⃣ ¿Qué heridas o karmas arrastras desde esa vida?  
Carta: ${c(2)}  
[Conflictos no resueltos.]

4️⃣ ¿Qué don o sabiduría traes desde esa vida?  
Carta: ${c(3)}  
[Potenciales y virtudes.]

5️⃣ ¿Qué patrón se repite en esta vida?  
Carta: ${c(4)}  
[Ciclo que vuelve.]

6️⃣ ¿Cuál es tu misión espiritual actual?  
Carta: ${c(5)}  
[Propósito en esta vida.]

7️⃣ ¿Qué vínculo influye desde otra vida?  
Carta: ${c(6)}  
[Relación kármica.]

8️⃣ ¿Qué debes liberar o transformar?  
Carta: ${c(7)}  
[Punto clave.]

9️⃣ Consejo profundo del alma  
Carta: ${c(8)}  
[Guía espiritual final.]

✨ Cierre espiritual:

${nombre}, esta vida representa una oportunidad para sanar desde el amor, integrar aprendizajes pasados y caminar hacia tu verdad más elevada.
`.trim();
  },


  Abundancia: ({ contexto }) => `
Contexto del consultante: "${contexto}"

Realiza una lectura de 10 cartas orientada a desbloquear la abundancia. Sigue este orden exacto:

1. Energía actual  
2. Bloqueo principal  
3. Influencias del pasado  
4. Tendencias presentes  
5. Oportunidades próximas  
6. Recursos internos  
7. Apoyos externos  
8. Riesgos o distracciones  
9. Futuro cercano  
10. Consejo final

El mensaje debe ser motivador, claro, emocional y con visión esperanzadora.`,


  Proteccion: ({ contexto }) => `
Contexto del consultante: "${contexto}"

Lectura energética con 9 cartas. Sigue este orden en la interpretación:

1. Estado energético actual  
2. Influencias externas  
3. Origen del bloqueo  
4. Punto vulnerable  
5. Cómo protegerte  
6. Aliado espiritual  
7. Energía de resolución  
8. Resultado si sigues el consejo  
9. Consejo final del alma

Tono protector, empático y sin generar temor.`,


  Celta: () => `
Lectura de cruz celta clásica con 10 cartas. Cada carta representa una posición fija. Interpreta respetando el siguiente orden:

1. Situación actual  
2. Desafío u obstáculo  
3. Influencias inconscientes  
4. Influencias pasadas  
5. Mente consciente  
6. Influencia futura  
7. Tú mismo/a (actitud interna)  
8. Entorno o influencias externas  
9. Esperanzas y temores  
10. Resultado final

Redacta de forma profesional, clara, sin juicios, con enfoque en el crecimiento.`,


  Tradicional: () => `
Lectura sin estructura fija. Interpreta las cartas una por una, siguiendo el orden en que fueron seleccionadas por la tarotista. Cada carta transmite un mensaje único en conexión con la energía del consultante.

Tono emocional, libre, intuitivo, empático y profesional.`,


  Vinculo: ({ contexto }) => `
Contexto emocional: "${contexto}"

Lectura de vínculo de 6 cartas. Interpretación en orden:

1. Situación actual  
2. Qué siente la otra persona  
3. Qué piensa  
4. Qué intenciones tiene  
5. Influencias externas o terceros  
6. Posible evolución del vínculo

No incluir temas de salud ni trabajo. Solo aspectos afectivos.`
};
