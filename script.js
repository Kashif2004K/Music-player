const songs = [
    {
        id: 0,
        title: "Let it happen",
        file: "songs/song1.mp3",
        cover: "cover/cover1.jpeg",
        playCount: 0
    },
    {
        id: 1,
        title: "Nangs",
        file: "songs/song2.mp3",
        cover: "cover/cover2.jpg",
        playCount: 0
    },
    {
        id: 2,
        title: "New person, same old mistakes",
        file: "songs/song3.mp3",
        cover: "cover/cover3.webp",
        playCount: 0
    },
];

let index = 0;
let isPlaying = false;
const audio = new Audio(songs[index].file);
const title = document.getElementById("song-title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currTime = document.getElementById("current-time");
const durTime = document.getElementById("duration");
const volSlider = document.getElementById("volume");
const visualizer = document.getElementById("mini-visualizer");

const STORE_KEY = 'musicPlayerPlayCounts';

function loadPlayCounts() {
    const storedCounts = localStorage.getItem(STORE_KEY);
    if (storedCounts) {
        const counts = JSON.parse(storedCounts);
        songs.forEach(song => {
            song.playCount = counts[song.id] || 0;
        });
    }
}

function savePlayCounts() {
    const counts = {};
    songs.forEach(song => {
        counts[song.id] = song.playCount;
    });
    localStorage.setItem(STORE_KEY, JSON.stringify(counts));
}

function loadSong(i) {
    index = i;
    audio.src = songs[i].file;
    title.textContent = songs[i].title;
    cover.src = songs[i].cover;
    progress.value = 0;
}

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.onloadedmetadata = () => {
    durTime.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currTime.textContent = formatTime(audio.currentTime);
};

audio.onended = () => {
    const currentSong = songs[index];
    currentSong.playCount += 1;
    savePlayCounts();
    buildTopSongsList();
    document.getElementById("next").click(); 
};

document.getElementById("play").onclick = () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        cover.classList.remove('active');
        if (visualizer) visualizer.classList.remove('active');
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
    } else {
        audio.play();
        isPlaying = true;
        cover.classList.add('active');
        if (visualizer) visualizer.classList.add('active');
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
    }
};

document.getElementById("next").onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
    isPlaying = true;
    cover.classList.add('active');
    if (visualizer) visualizer.classList.add('active');
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
    isPlaying = true;
    cover.classList.add('active');
    if (visualizer) visualizer.classList.add('active');
};

progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

if (volSlider) {
    audio.volume = volSlider.value;
    volSlider.oninput = () => {
        audio.volume = volSlider.value;
    };
}


const list = document.getElementById("playlist");
songs.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = s.title;
    li.onclick = () => {
        loadSong(i);
        audio.play();
        document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
        isPlaying = true;
        cover.classList.add('active');
        if (visualizer) visualizer.classList.add('active');
    };
    list.appendChild(li);
});

function buildTopSongsList() {
    const topList = document.getElementById("top-played-list");
    if (!topList) return; 
    topList.innerHTML = ''; 
    const sortedSongs = [...songs].sort((a, b) => b.playCount - a.playCount);
    sortedSongs.slice(0, 5).forEach((s, i) => {
        const li = document.createElement("li");
        li.classList.add("top-song");
        const rankText = (i === 0) 
            ? '<span class="material-symbols-rounded crown-icon">trophy</span>' 
            : `${i + 1}.`;

        const originalIndex = songs.findIndex(song => song.id === s.id);

        const countDisplay = s.playCount > 0 ? `<small style="opacity: 0.6; margin-left: auto;">(${s.playCount} Time)</small>` : '';


        li.innerHTML = `
            <span class="rank-icon">${rankText}</span>
            <span class="song-details">${s.title}</span>
            ${countDisplay}
        `;
        li.onclick = () => {
            loadSong(originalIndex);
            audio.play();
            document.getElementById("play").innerHTML = '<span class="material-symbols-rounded">pause</span>';
            isPlaying = true;
            cover.classList.add('active');
            if (visualizer) visualizer.classList.add('active');
        };

        topList.appendChild(li);
    });
}

loadPlayCounts();
loadSong(index); 
buildTopSongsList(); 