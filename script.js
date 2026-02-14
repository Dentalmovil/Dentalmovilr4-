const playerContainer = document.querySelector('.player-container');
const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');

// Función para reproducir
function playSong() {
    playerContainer.classList.add('play'); // Activa la animación CSS
    playBtn.innerText = '⏸️'; // Cambia el icono
    audio.play();
}

// Función para pausar
function pauseSong() {
    playerContainer.classList.remove('play'); // Pausa la animación CSS
    playBtn.innerText = '▶️';
    audio.pause();
}

// Evento del botón
playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
const songs = [
    {
        title: "Lo-fi Sunset",
        artist: "Cloudy Vibes",
        cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Midnight City",
        artist: "Neon Dreams",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Coffee Break",
        artist: "Jazz Hop",
        cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

// Índice para saber qué canción suena
let songIndex = 0;
