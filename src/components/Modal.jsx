import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="relative bg-[#2a0040] border border-white/20 rounded-xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400 text-2xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Contenido interpretado */}
        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
