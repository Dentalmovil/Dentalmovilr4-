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