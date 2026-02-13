import { useState, useEffect } from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  // Escuchar si el usuario ya estaba logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      {user ? (
        <div className="bg-white/10 p-8 rounded-3xl text-center backdrop-blur-md border border-white/20">
          <img src={user.photoURL} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500" />
          <h2 className="text-2xl font-bold">¡Bienvenido, {user.displayName}!</h2>
          <p className="text-gray-400 mb-6">{user.email}</p>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl transition-colors font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-black mb-8 italic text-blue-400">APP SEGURA</h1>
          <button 
            onClick={login}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="google" />
            Iniciar sesión con Google
          </button>
        </div>
      )}
    </div>
  );
}
npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-n6Ort4Funh_wQuKoi5UTlW96CTww6Ok",
  authDomain: "miproyectoreact-96c94.firebaseapp.com",
  projectId: "miproyectoreact-96c94",
  storageBucket: "miproyectoreact-96c94.firebasestorage.app",
  messagingSenderId: "268958305275",
  appId: "1:268958305275:web:a80ae2044d77ce5b17595e",
  measurementId: "G-21GKM3RXTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import React, { useState, useEffect } from 'react';
import { auth, provider, db } from "./firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { Sun, Cloud, MapPin, LogOut, Star } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // 1. Manejo de Usuario
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchFavorites(currentUser.uid);
    });
    return () => unsub();
  }, []);

  // 2. Leer Favoritos de Firestore en tiempo real
  const fetchFavorites = (uid) => {
    const q = query(collection(db, "favorites"), where("userId", "==", uid));
    onSnapshot(q, (snapshot) => {
      setFavorites(snapshot.docs.map(doc => doc.data().cityName));
    });
  };

  // 3. Guardar en Firestore
  const saveFavorite = async () => {
    if (!weather) return;
    try {
      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        cityName: weather.name,
        temp: weather.main.temp
      });
      alert("¡Ciudad guardada en tu cuenta!");
    } catch (e) { console.error(e); }
  };

  const fetchWeather = async (cityName) => {
    const API_KEY = "TU_API_KEY_AQUI";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName || city}&units=metric&appid=${API_KEY}&lang=es`);
    const data = await res.json();
    setWeather(data);
  };

  if (!user) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <button onClick={() => signInWithPopup(auth, provider)} className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex gap-2">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" />
        Entrar con Google para ver el Clima
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Header con Perfil */}
      <div className="flex justify-between items-center mb-10 bg-white/5 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <img src={user.photoURL} className="w-10 h-10 rounded-full" />
          <span>Hola, {user.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)} className="text-red-400"><LogOut /></button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 bg-white/10 p-4 rounded-xl outline-none" 
            placeholder="Buscar ciudad..." 
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => fetchWeather()} className="bg-blue-600 p-4 rounded-xl">Buscar</button>
        </div>

        {weather && (
          <div className="bg-blue-500/20 p-8 rounded-[2.5rem] border border-blue-500/30 text-center relative">
            <button onClick={saveFavorite} className="absolute top-6 right-6 text-yellow-400"><Star /></button>
            <h2 className="text-5xl font-bold">{Math.round(weather.main.temp)}°</h2>
            <p className="text-2xl">{weather.name}</p>
          </div>
        )}

        {/* Lista de Favoritos desde la DB */}
        <div className="mt-10">
          <h3 className="text-gray-500 uppercase text-sm font-bold mb-4">Tus ciudades guardadas</h3>
          <div className="grid grid-cols-2 gap-4">
            {favorites.map((fav, i) => (
              <button key={i} onClick={() => fetchWeather(fav)} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all text-left">
                📍 {fav}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
