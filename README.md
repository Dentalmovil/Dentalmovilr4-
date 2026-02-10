i#dentalmovilr4
git push -u origin main

touch index.html

echo "<h1>Bienvenido a Dentalmovilr4</h1>" > index.html
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

