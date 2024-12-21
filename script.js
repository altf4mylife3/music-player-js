const audio = document.getElementById('music');
const playPauseButton = document.getElementById('playpause');
const repeatButton = document.getElementById('repeat');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const volumeLabel = document.getElementById('vollabel');
const titleDisplay = document.getElementById('titleDisplay');
const artistDisplay = document.getElementById('artistDisplay');
const albumDisplay = document.getElementById('album-display');

const tracks = [
    { title: "Opening Theme", artist: "Super Mario OST", src: "https://files.catbox.moe/5fmd3t.mp3", albumArt: "https://files.catbox.moe/ihu04y.jpg" },
    { title: "Ending Theme", artist: "Super Mario OST", src: "https://files.catbox.moe/5ko4pt.mp3", albumArt: "https://files.catbox.moe/ihu04y.jpg" },
];
let currentTrackIndex = 0;

loadTrack(currentTrackIndex);

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<img src="images/pause.png" alt="Pause Icon">';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<img src="images/play.png" alt="Play Icon">';
    }
});

previousButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex === 0) ? tracks.length - 1 : currentTrackIndex - 1;
    loadTrack(currentTrackIndex);
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex === tracks.length - 1) ? 0 : currentTrackIndex + 1;
    loadTrack(currentTrackIndex);
});

repeatButton.addEventListener('click', () => {
    audio.loop = !audio.loop;
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    volumeLabel.src = audio.volume === 0 ? 'images/volumedown.png' : 'images/volumeup.png';
});

volumeLabel.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeControl.value = 0;
        volumeLabel.src = 'images/volumedown.png';
    } else {
        audio.volume = 1;
        volumeControl.value = 100;
        volumeLabel.src = 'images/volumeup.png';
    }
});

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    titleDisplay.innerHTML = `${track.title}`;
    artistDisplay.innerHTML = `${track.artist}"`;
    albumDisplay.src = track.albumArt;
    audio.play();
    playPauseButton.innerHTML = '<img src="images/pause.png" alt="Pause Icon">';
}

function generateTracklist() {
    tracks.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${track.title} - ${track.artist}`;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
        tracklist.appendChild(listItem);
    });
}