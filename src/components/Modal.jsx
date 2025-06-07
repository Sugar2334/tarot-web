import React, { useState } from 'react';

const ModalInterpretacion = ({ texto, datos, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(texto).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }).catch((err) => {
      console.error('Error al copiar texto:', err);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl max-h-[90vh] bg-[#2a0040] border border-white/20 rounded-xl shadow-2xl overflow-hidden text-white relative">

        {/* Alerta visual */}
        {showAlert && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-md z-50 animate-fade-in">
            ¡Respuesta copiada al portapapeles!
          </div>
        )}

        {/* Sección izquierda */}
        <div className="flex flex-col w-full md:w-3/4 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">Resultado de la interpretación</h2>
          <div className="whitespace-pre-wrap text-sm leading-relaxed flex-1">
            {texto}
          </div>
          <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
            <button
              onClick={copiarAlPortapapeles}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
            >
              Copiar Respuesta
            </button>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="w-full md:w-1/4 bg-[#1b002a] p-4 text-sm overflow-y-auto border-t md:border-t-0 md:border-l border-white/10">
          <h3 className="font-semibold text-purple-300 mb-2">Consultante: {datos.nombre}</h3>
          <p><strong>Fecha de nacimiento:</strong> {datos.fecha}</p>
          <p><strong>Género:</strong> {datos.genero}</p>
          <p><strong>Lectura:</strong> {datos.tipoLectura}</p>
          {datos.contexto && <p><strong>Contexto:</strong> {datos.contexto}</p>}

          <div className="mt-4">
            <p className="font-semibold text-purple-400 mb-1">Trabajo</p>
            <p className="text-white/80">Explora tu camino laboral, decisiones clave y obstáculos actuales.</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-purple-400 mb-1">Amor</p>
            <p className="text-white/80">Energías presentes en tu vínculo amoroso o estado sentimental actual.</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-purple-400 mb-1">Familia</p>
            <p className="text-white/80">Relaciones con tu entorno cercano, estabilidad o conflictos.</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-purple-400 mb-1">Sexo</p>
            <p className="text-white/80">Conexión íntima, pasiones y bloqueos emocionales.</p>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInterpretacion;
