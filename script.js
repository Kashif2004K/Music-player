// SONG LIST
const songs = [
    {
        title: "Let it happen",
        file: "songs/song1.mp3",
        cover: "cover/cover1.jpeg"
    },
    {
        title: "Nangs",
        file: "songs/song2.mp3",
        cover: "cover/cover2.jpg"
    },
    {
        title: "New person, same old mistakes",
        file: "songs/song3.mp3",
        cover: "cover/cover3.webp"
    }
];


let index = 0;
let isPlaying = false;

const audio = new Audio(songs[index].file);
const title = document.getElementById("song-title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currTime = document.getElementById("current-time");
const durTime = document.getElementById("duration");
const visualizer = document.getElementById("mini-visualizer");

// Helper function to format time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Update time in the existing ontimeupdate
audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currTime.textContent = formatTime(audio.currentTime);
    durTime.textContent = formatTime(audio.duration);
};

// Handle Song Load (to reset duration text)
audio.onloadedmetadata = () => {
    durTime.textContent = formatTime(audio.duration);
};

// Volume Control
const volSlider = document.getElementById("volume");
volSlider.oninput = () => {
    audio.volume = volSlider.value;
};

// LOAD SONG
function loadSong(i) {
    index = i;
    audio.src = songs[i].file;
    title.textContent = songs[i].title;
    cover.src = songs[i].cover;
    progress.value = 0;
    document.body.style.setProperty('--bg-image', `url('${songs[i].cover}')`);
}

// PLAY / PAUSE
document.getElementById("play").onclick = () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        cover.classList.remove("active");
        visualizer.classList.remove("active");
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
    } else {
        audio.play();
        isPlaying = true;
        cover.classList.add("active");
        visualizer.classList.add("active");
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
    }
};

// NEXT / PREV
document.getElementById("next").onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    visualizer.classList.add("active");
    cover.classList.add("active");
    document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
};
document.getElementById("prev").onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    visualizer.classList.add("active");
    cover.classList.add("active");
};

// PROGRESS BAR
audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
};
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

// BUILD PLAYLIST
const list = document.getElementById("playlist");
songs.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = s.title;
    li.onclick = () => {
        loadSong(i);
        audio.play();
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
        visualizer.classList.add("active");
        cover.classList.add("active");
    };
    list.appendChild(li);
});

