// Tirada.jsx (FRONTEND COMPLETO Y COMPATIBLE)
import { useState, useRef } from 'react';
import cartas from '../utils/cartas';
import * as htmlToImage from 'html-to-image';
import Modal from '../components/Modal';

export default function Tirada() {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('femenino');
  const [fecha, setFecha] = useState('');
  const [nombreConsultado, setNombreConsultado] = useState('');
  const [fechaConsultado, setFechaConsultado] = useState('');
  const [tipoLectura, setTipoLectura] = useState('Amor');
  const [contexto, setContexto] = useState('');
  const [mostrarCartas, setMostrarCartas] = useState(false);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [interpretacion, setInterpretacion] = useState('');
  const [cargando, setCargando] = useState(false);
  const [capturaRealizada, setCapturaRealizada] = useState(false);
  const cartasRef = useRef(null);

  const determinarCantidadCartas = (tipo) => {
    switch (tipo) {
      case 'General': return 25;
      case 'Amor':
      case 'Expareja':
      case 'Nuevo vínculo amoroso': return 6;
      case 'Vidas Pasadas': return 7;
      case 'Celta': return 10;
      case 'Abundancia, prosperidad y protección': return 7;
      case 'Protección y energía': return 7;
      case 'Vínculo': return 6;
      default: return 10;
    }
  };

  const handleHecho = () => {
    const cantidad = determinarCantidadCartas(tipoLectura);
    const seleccion = [...cartas].sort(() => 0.5 - Math.random()).slice(0, cantidad);
    setCartasSeleccionadas(seleccion);
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
          nombreConsultado,
          fechaConsultado,
          tipoLectura,
          contexto,
          cartas: cartasSeleccionadas
        })
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

    htmlToImage.toBlob(cartasRef.current, {
      backgroundColor: null,
      cacheBust: true,
      pixelRatio: 2,
      style: { margin: 0, padding: 0 },
    })
      .then((blob) => {
        if (!blob) throw new Error('No se pudo generar la imagen.');

        const item = new ClipboardItem({ 'image/png': blob });
        return navigator.clipboard.write([item]);
      })
      .then(() => {
        setCapturaRealizada(true);
        setTimeout(() => setCapturaRealizada(false), 2000);
      })
      .catch((error) => {
        console.error('Error al copiar imagen al portapapeles:', error);
      });
  };

  return (
    <div className="min-h-screen text-white p-8 font-sans bg-[url('/background.jpg')] bg-cover bg-center overflow-hidden">
      <h1 className="text-5xl font-semibold text-center mb-10 tracking-wide">Tirada de {tipoLectura}</h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-[#2a0040]/80 border border-white/20 shadow-xl p-8 rounded-xl space-y-5">
          <div>
            <label className="block mb-1 text-lg">Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-lg">Género</label>
            <select value={genero} onChange={e => setGenero(e.target.value)}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none">
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-lg">Fecha de nacimiento</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none" />
          </div>
          {(tipoLectura === 'Amor' || tipoLectura === 'Vínculo' || tipoLectura === 'Expareja') && (
            <>
              <div>
                <label className="block mb-1 text-lg">Nombre del consultado</label>
                <input value={nombreConsultado} onChange={e => setNombreConsultado(e.target.value)}
                  className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none" />
              </div>
              <div>
                <label className="block mb-1 text-lg">Fecha de nacimiento del consultado</label>
                <input type="date" value={fechaConsultado} onChange={e => setFechaConsultado(e.target.value)}
                  className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none" />
              </div>
            </>
          )}
          <div>
            <label className="block mb-1 text-lg">Tipo de lectura</label>
            <select value={tipoLectura} onChange={e => setTipoLectura(e.target.value)}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none">
              <option value="Amor">Amor</option>
              <option value="Vínculo">Vínculo</option>
              <option value="Tradicional">Tradicional</option>
              <option value="Celta">Celta</option>
              <option value="Abundancia, prosperidad y protección">Abundancia, prosperidad y protección</option>
              <option value="Protección y energía">Protección y energía</option>
              <option value="General">General</option>
              <option value="Expareja">Expareja</option>
              <option value="Nuevo vínculo amoroso">Nuevo vínculo amoroso</option>
              <option value="Vidas Pasadas">Vidas Pasadas</option>
            </select>

          </div>
          <div>
            <label className="block mb-1 text-lg">Contexto</label>
            <textarea rows="3" value={contexto} onChange={e => setContexto(e.target.value)}
              className="w-full p-3 rounded bg-white bg-opacity-20 text-black outline-none" />
          </div>
          <div className="text-center">
            <button onClick={handleHecho} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full shadow-lg">
              Hecho
            </button>
          </div>
        </div>

        {mostrarCartas && (
          <div className="w-full lg:w-1/2 bg-[#2a0040]/80 border border-white/20 p-6 rounded-xl shadow-2xl max-h-[600px] flex flex-col">
            <h2 className="text-2xl mb-4 font-semibold text-center">Cartas seleccionadas</h2>
            <div className="flex-1 overflow-y-auto">
              <div
                ref={cartasRef}
                className="bg-[url('/fondo-madera.jpg')] bg-cover bg-center rounded-2xl p-10"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '700px' }}>
                <div className={`grid gap-6 ${cartasSeleccionadas.length <= 3 ? 'grid-cols-1' : cartasSeleccionadas.length <= 6 ? 'grid-cols-3' : 'grid-cols-5'}`}>
                  {cartasSeleccionadas.map((carta, i) => (
                    <div key={i} className="text-center">
                      <img src={carta.imagen} alt={carta.nombre} className="w-full h-48 object-contain" />
                      <p className="mt-1 text-xs bg-[#2a0040]/80 px-1 py-0.5 text-white">{carta.nombre}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#2a0040]/80 pt-4 flex justify-center gap-4">
              <button onClick={handleCapturaCartas} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full">
                Hacer foto de cartas
              </button>
              <button onClick={handleInterpretar} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full">
                Interpretar
              </button>
            </div>
          </div>
        )}
      </div>

      {interpretacion && (
        <Modal
          texto={interpretacion}
          datos={{ nombre, genero, fecha, tipoLectura, contexto, nombreConsultado, fechaConsultado }}
          onClose={() => setInterpretacion('')}
        />
      )}

      {capturaRealizada && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-500 opacity-100">
          ✅ Captura tomada con éxito
        </div>
      )}
    </div>
  );
}