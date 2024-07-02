import React, { useState, useEffect } from "react";

const AudioPlayer = () => {
  const [audio, setAudio] = useState(new Audio("../assest2/Theme-1.mp4"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState("Theme-1.mp4"); 

  const songs = {
    "Theme-1.mp4": "../assest2/Theme-1.mp3",
    "Theme-2.mp4": "../assest2/Theme-2.mp4",
    "Theme-3.mp4": "../assest2/Alkis.mp3",
    "Theme-4.mp4": "../assest2/rebekka.mp4",
    "Theme-5.mp4": "../assest2/monika.mp3",
    "Theme-6.mp4": "../assest2/Joao.mp3",
    "Theme-7.mp4": "../assest2/Theme-3.mp3",
    // Add more songs as needed
  };

  const images = {
    "Theme-1.mp4": "../assest2/snow.png",
    "Theme-2.mp4": "../assest2/Thanksgiving.png",
    "Theme-3.mp4": "../assest2/Alkis.png",
    "Theme-4.mp4": "../assest2/Rebekka.png",
    "Theme-5.mp4": "../assest2/Monika.png",
    "Theme-6.mp4": "../assest2/Joao.png",
    "Theme-7.mp4": "../assest2/Alena.png",
  };

  useEffect(() => {
    // Sayfa yüklendiğinde ve "Theme-1.mp4" seçildiğinde başlangıç konumunu ayarla
    if (selectedSong === "Theme-1.mp4") {
      audio.currentTime = 0;
    }
  }, [selectedSong, audio]);

  const handlePlayPause = () => {
    const currentSong = songs[selectedSong];

    if (isPlaying) {
      audio.pause();
    } else {
      audio.src = currentSong;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (event) => {
    const newSong = event.target.value;
    setSelectedSong(newSong);
    setIsPlaying(false); // Pause when changing the song
    audio.pause();
    setAudio(new Audio(songs[newSong])); // Change the audio source based on the selected song
  };

  return (
    <div>
      <button
        className="play-pause-button"
        onClick={handlePlayPause}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "Pause Surprise" : "Play Surprise"}
      </button>
      <select
        value={selectedSong}
        onChange={handleSongChange}
        style={{
          position: "fixed",
          bottom: "70px",
          right: "20px",
          padding: "5px",
          fontSize: "14px",
          borderRadius: "5px",
          backgroundColor: "#fff",
          color: "#007BFF",
          cursor: "pointer",
        }}
      >
        <option value="Theme-1.mp4">Christmas</option>
        <option value="Theme-2.mp4">Thanksgiving</option>
        <option value="Theme-3.mp4">Alkis</option>
        <option value="Theme-4.mp4">Rebekka</option>
        <option value="Theme-5.mp4">Monika</option>
        <option value="Theme-6.mp4">Joao</option>
        <option value="Theme-7.mp4">Alena</option>
        {/* Add more options as needed */}
      </select>

      <audio>
        <source
          src={songs[selectedSong]}
          type={selectedSong.endsWith(".mp3") ? "audio/mp3" : "audio/mp4"}
        />
      </audio>

      <div
        className={`image-container ${isPlaying ? "animate" : ""}`}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {selectedSong === "Theme-1.mp4" ? (
          [...Array(3)].map((_, index) => (
            <img
              key={index}
              src={images[selectedSong]}
              alt={`Image for ${selectedSong} - ${index + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100vh",
              }}
            />
          ))
        ) : (
          <>
            {[
              "Theme-2.mp4",
              "Theme-3.mp4",
              "Theme-4.mp4",
              "Theme-5.mp4",
              "Theme-6.mp4",
              "Theme-7.mp4",
            ].includes(selectedSong) ? (
              [...Array(6)].map((_, index) => (
                <img
                  key={index}
                  src={images[selectedSong]}
                  alt={`Image for ${selectedSong} - ${index + 1}`}
                  className="spinning-image"
                  style={{
                    marginRight: "100px",
                    maxWidth: "200px",
                    maxHeight: "250px",
                  }}
                />
              ))
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
