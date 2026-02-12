 "<h1>Bienvenido a Dentalmovilr4</h1>" > index.html
git commit -m "Agregado index principal para Dentalmovilr4"
git push -u origin main
git push -u origin main
git push -u origin main

"homepage": "https://tu-usuario.github.io/tu-repo",

name: Deploy React App

on:
  push:
    branches: [ main ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist # O 'build' si usas Create React App en lugar de Vite
          branch: gh-pages # La rama donde se subirá el sitio listo

      - name: Install and Build
        run: npm run build
        env:
# Instala Tailwind y sus dependencias
npm install -D tailwindcss postcss autoprefixer

# Genera los archivos de configuración (tailwind.config.js y postcss.config.js)
npx tailwindcss init -p

          # Aquí conectamos los secretos de GitHub con las variables que React necesita
          VITE_FIREBASE_KEY: ${{ secrets.VITE_FIREBASE_KEY }}
          VITE_API_URL: ${{ secrets.VITE_API_URL }}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

@tailwind base;
@tailwind components;
@tailwind utilities;
npm install react-router-dom


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1 className="text-3xl font-bold text-blue-600">🏠 Inicio</h1>;
}

function About() {
  return <h1 className="text-3xl font-bold text-green-600">ℹ️ Sobre nosotros</h1>;
}

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/" className="hover:text-blue-400">Inicio</Link>
        <Link to="/about" className="hover:text-green-400">Acerca de</Link>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

function Home() { return <h2 className="text-2xl font-bold">🏠 Bienvenida/o al Inicio</h2>; }
function Profile() { return <h2 className="text-2xl font-bold">👤 Este es tu Perfil</h2>; }

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta padre con el Layout */}
        <Route path="/" element={<MainLayout />}>
          {/* Rutas hijas */}
          <Route index element={<Home />} /> {/* index significa que es la ruta base */}
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
import { useState, useEffect } from 'react';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto del buscador

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100') // Pedimos más para que el filtro luzca
      .then(res => res.json())
      .then(data => setPokemons(data.results));
  }, []);

  // Lógica de filtrado
  const pokemonFiltrados = pokemons.filter(p => 
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Input de búsqueda con Tailwind */}
      <div className="relative">
        <input 
          type="text"
          placeholder="Buscar Pokémon..."
          className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <span className="absolute left-3 top-3.5 opacity-40">🔍</span>
      </div>

      {/* Grid de resultados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonFiltrados.map((p) => (
          <div key={p.name} className="p-4 bg-white rounded-lg shadow-sm border hover:border-blue-300 capitalize text-center">
            <p className="font-medium text-gray-700">{p.name}</p>
          </div>
        ))}
      </div>
      
      {pokemonFiltrados.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron resultados 😢</p>
      )}
    </div>
  );
}
import { useState } from 'react';

export default function Contacto() {
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' });

  const manejarCambio = (e) => {
    setDatos({
      ...datos, // Copiamos lo que ya había
      [e.target.name]: e.target.value // Actualizamos solo el campo que cambió
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", datos);
    alert(`¡Gracias ${datos.nombre}! Hemos recibido tu mensaje.`);
  };

  return (
    <form onSubmit={enviarFormulario} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input 
          name="nombre" 
          type="text" 
          required
          className="w-full p-2 border rounded-md" 
          onChange={manejarCambio} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          name="email" 
          type="email" 
          required
          className="w-full p-2 border rounded-md" 
          onChange={manejarCambio} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mensaje</label>
        <textarea 
          name="mensaje" 
          className="w-full p-2 border rounded-md" 
          onChange={manejarCambio}
        ></textarea>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Enviar Mensaje
      </button>
    </form>
  );
}
npm install framer-motion
import { motion } from 'framer-motion';

// ... (resto del código del fetch)

return (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4"
  >
    {pokemonFiltrados.map((p, index) => (
      <motion.div 
        key={p.name}
        initial={{ opacity: 0, y: 20 }} // Empieza abajo y transparente
        animate={{ opacity: 1, y: 0 }}  // Sube y se hace visible
        transition={{ delay: index * 0.05 }} // Efecto cascada
        whileHover={{ scale: 1.05 }}      // Se agranda al pasar el mouse
        className="p-4 bg-white rounded-lg shadow-sm border text-center"
      >
        <p className="font-medium capitalize">{p.name}</p>
      </motion.div>
    ))}
  </motion.div>
);
import { motion } from 'framer-motion';

export default function Contacto() {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="max-w-md mx-auto"
    >
      <form className="space-y-4">
        <h2 className="text-2xl font-bold">Contáctanos</h2>
        {/* ... tus campos de input ... */}
        <motion.button 
          whileTap={{ scale: 0.9 }} // Efecto de "clic" físico
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Enviar Mensaje
        </motion.button>
      </form>
    </motion.div>
  );
}

