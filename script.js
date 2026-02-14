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
