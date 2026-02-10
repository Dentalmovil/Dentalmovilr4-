#dentalmovilr4
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




