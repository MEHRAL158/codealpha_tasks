const songs = [
    {
      title: "Dreams",
      artist: "Artist One",
      src: "songs/song1.mp3"
    },
    {
      title: "Midnight Vibes",
      artist: "Artist Two",
      src: "songs/song2.mp3"
    },
    {
      title: "Golden Moments",
      artist: "Artist Three",
      src: "songs/song3.mp3"
    }
  ];
  
  const audio = document.getElementById("audio");
  const songTitle = document.getElementById("songTitle");
  const artistName = document.getElementById("artistName");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progress = document.getElementById("progress");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const volume = document.getElementById("volume");
  const playlist = document.getElementById("playlist");
  const autoplay = document.getElementById("autoplay");
  const player = document.querySelector(".player");
  
  let currentSong = 0;
  
  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
  
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
  
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }
  
  function loadSong(index) {
    currentSong = (index + songs.length) % songs.length;
    const song = songs[currentSong];
  
    audio.pause();
    audio.src = song.src;
    audio.load();
  
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    progress.value = 0;
  
    renderPlaylist();
  }
  
  async function playSong() {
    try {
      await audio.play();
    } catch (error) {
      alert("Song play nahi ho saka. Check karo ke MP3 files songs folder mein hain.");
    }
  }
  
  function pauseSong() {
    audio.pause();
  }
  
  function togglePlay() {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }
  
  function nextSong() {
    loadSong(currentSong + 1);
    playSong();
  }
  
  function previousSong() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      loadSong(currentSong - 1);
      playSong();
    }
  }
  
  function renderPlaylist() {
    playlist.innerHTML = "";
  
    songs.forEach((song, index) => {
      const button = document.createElement("button");
      button.className = "track" + (index === currentSong ? " active" : "");
  
      const number = document.createElement("span");
      number.className = "track-number";
      number.textContent = String(index + 1).padStart(2, "0");
  
      const details = document.createElement("span");
      details.className = "track-details";
  
      const title = document.createElement("strong");
      title.textContent = song.title;
  
      const artist = document.createElement("small");
      artist.textContent = song.artist;
  
      const status = document.createElement("span");
      status.className = "track-status";
      status.textContent = index === currentSong && !audio.paused ? "♫" : "♪";
  
      details.append(title, artist);
      button.append(number, details, status);
  
      button.addEventListener("click", () => {
        loadSong(index);
        playSong();
      });
  
      playlist.appendChild(button);
    });
  }
  
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", previousSong);
  
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });
  
  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
  
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });
  
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    }
  });
  
  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });
  
  audio.addEventListener("play", () => {
    playBtn.textContent = "Ⅱ";
    playBtn.setAttribute("aria-label", "Pause");
    player.classList.add("is-playing");
    renderPlaylist();
  });
  
  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Play");
    player.classList.remove("is-playing");
    renderPlaylist();
  });
  
  audio.addEventListener("ended", () => {
    if (autoplay.checked) {
      nextSong();
    } else {
      pauseSong();
    }
  });
  
  audio.volume = Number(volume.value);
  loadSong(0);