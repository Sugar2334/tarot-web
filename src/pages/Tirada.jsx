import { useState, useRef } from 'react';
import cartas from '../utils/cartas';
import domtoimage from 'dom-to-image-more';
import Modal from '../components/Modal';

export default function Tirada() {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('femenino');
  const [fecha, setFecha] = useState('');
  const [tipoLectura, setTipoLectura] = useState('Amor');
  const [contexto, setContexto] = useState('');
  const [mostrarCartas, setMostrarCartas] = useState(false);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [interpretacion, setInterpretacion] = useState('');
  const [cargando, setCargando] = useState(false);
  const cartasRef = useRef(null);

  const renderTitulo = () => {
    return tipoLectura === 'Tradicional' ? 'Tirada Tradicional' : `Tirada de ${tipoLectura}`;
  };

  const determinarCantidadCartas = (tipo) => {
    switch (tipo) {
      case 'General': return 25;
      case 'Amor':
      case 'Expareja':
      case 'Nuevo vínculo amoroso': return 6;
      case 'Vidas pasadas': return 8;
      case 'Celta': return 10;
      case 'Abundancia, prosperidad y protección': return 7;
      case 'Protección y energía': return 7;
      case 'Vínculo': return 6;
      default: return 10;
    }
  };

  const handleHecho = () => {
    const cantidadCartas = determinarCantidadCartas(tipoLectura);
    const cartasRandom = [...cartas].sort(() => 0.5 - Math.random()).slice(0, cantidadCartas);
    setCartasSeleccionadas(cartasRandom);
    setMostrarCartas(true);
  };

  const handleInterpretar = async () => {
    setCargando(true);
    try {
      const response = await fetch('http://localhost:3001/interpretar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          genero,
          fecha,
          tipoLectura,
          contexto,
          cartas: cartasSeleccionadas
        }),
      });

      const data = await response.json();
      setInterpretacion(data.respuesta || 'Ocurrió un error al generar la interpretación.');
    } catch (error) {
      console.error('Error al interpretar:', error);
      setInterpretacion('Ocurrió un error al generar la interpretación.');
    } finally {
      setCargando(false);
    }
  };

  const handleCapturaCartas = () => {
    if (!cartasRef.current) return;

    domtoimage.toPng(cartasRef.current, {
      bgcolor: '#2a0040',
      quality: 1,
      height: cartasRef.current.clientHeight,
      width: cartasRef.current.clientWidth,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      }
    }).then((dataUrl) => {
      const enlace = document.createElement('a');
      enlace.download = 'lectura_cartas.png';
      enlace.href = dataUrl;
      enlace.click();
    }).catch((error) => {
      console.error('Error al capturar imagen:', error);
    });
  };

  return (
    <div className="min-h-screen text-white p-8 font-sans bg-[url('/background.jpg')] bg-cover bg-center overflow-hidden">
      <h1 className="text-5xl font-semibold text-center mb-10 tracking-wide text-white drop-shadow-lg">
        {renderTitulo()}
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Formulario */}
        <div className="w-full lg:w-1/2 bg-[#2a0040]/80 border border-white/20 shadow-xl p-8 rounded-xl min-h-[550px]">
          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-white text-lg">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none"
                placeholder="Ej: Paola Gutiérrez" />
            </div>
            <div>
              <label className="block mb-1 text-white text-lg">Género</label>
              <select value={genero} onChange={(e) => setGenero(e.target.value)}
                className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none">
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-white text-lg">Fecha de nacimiento</label>
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none" />
            </div>
            <div>
              <label className="block mb-1 text-white text-lg">Tipo de lectura</label>
              <select value={tipoLectura} onChange={(e) => setTipoLectura(e.target.value)}
                className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none">
                <option>Amor</option>
                <option>Vínculo</option>
                <option>Tradicional</option>
                <option>Celta</option>
                <option>Abundancia, prosperidad y protección</option>
                <option>Protección y energía</option>
                <option>General</option>
                <option>Expareja</option>
                <option>Nuevo vínculo amoroso</option>
                <option>Vidas pasadas</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-white text-lg">Contexto</label>
              <textarea rows="3" value={contexto} onChange={(e) => setContexto(e.target.value)}
                className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none"
                placeholder="Contame cómo es la situación... (opcional)" />
            </div>
            <div className="text-center">
              <button onClick={handleHecho}
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-white font-medium shadow-lg backdrop-blur-md transition">
                Hecho
              </button>
            </div>
          </div>
        </div>

        {/* Cartas */}
        {mostrarCartas && (
          <div className="w-full lg:w-1/2 bg-[#2a0040]/80 border border-white/20 p-6 rounded-xl shadow-2xl max-h-[600px] flex flex-col">
            <h2 className="text-2xl mb-4 font-semibold text-center">Cartas seleccionadas</h2>
            <div className="flex-1 overflow-y-auto">
              <div ref={cartasRef} id="cartas-container" className="grid grid-cols-3 sm:grid-cols-4 gap-1">
                {cartasSeleccionadas.map((carta, i) => (
                  <div key={i} className="text-center">
                    <img src={carta.imagen} alt={carta.nombre}
                      className="w-full h-48 object-contain rounded shadow-md" />
                    <p className="mt-1 text-xs bg-[#2a0040]/80 border border-white/20 px-1 py-0.5 rounded text-white">
                      {carta.nombre}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#2a0040]/80 pt-4 flex justify-center gap-4">
              <button onClick={handleCapturaCartas}
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-white font-medium shadow-lg backdrop-blur-md transition">
                Hacer foto de cartas
              </button>
              <button onClick={handleInterpretar}
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-white font-medium shadow-lg backdrop-blur-md transition">
                Interpretar
              </button>
            </div>
          </div>
        )}
      </div>

      {interpretacion && (
        <Modal onClose={() => setInterpretacion('')}>
          {cargando ? 'Generando interpretación...' : interpretacion}
        </Modal>
      )}
    </div>
  );
}
