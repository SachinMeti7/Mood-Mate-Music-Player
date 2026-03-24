import { useState, useEffect } from "react";
import Papa from "papaparse";
import "./Home.css";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("All");
  const [language, setLanguage] = useState("All");
  const [liked, setLiked] = useState([]);
  const [showLiked, setShowLiked] = useState(false);

  // ✅ LOAD CSV
  useEffect(() => {
    const loadSongs = async () => {
      const res = await fetch("/data/songs.csv");
      const text = await res.text();

      const parsed = Papa.parse(text.trim(), {
        header: true,
        skipEmptyLines: true,
      }).data;

      // ✅ CLEAN + FIX LANGUAGE CASE
      const clean = parsed
        .filter((s) => s.title && s.youtubeId)
        .map((s) => ({
          ...s,
          language: s.language?.trim(), // 🔥 fix spacing issue
        }));

      setSongs(clean);
    };

    loadSongs();
  }, []);

  // ❤️ LIKE
  const toggleLike = (song) => {
    setLiked((prev) =>
      prev.find((s) => s.title === song.title)
        ? prev.filter((s) => s.title !== song.title)
        : [...prev, song]
    );
  };

  // 🎯 FILTER
  const filtered = songs.filter((song) => {
    if (showLiked) {
      return liked.find((s) => s.title === song.title);
    }

    if (language !== "All" && song.language !== language) return false;
    if (mood !== "All" && song.mood !== mood) return false;

    if (search) {
      return (
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
      );
    }

    return true;
  });

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🎵 Moodify</h2>

        <p
          className={`menu ${!showLiked ? "active" : ""}`}
          onClick={() => setShowLiked(false)}
        >
          🏠 Home
        </p>

        <p
          className={`menu ${showLiked ? "active" : ""}`}
          onClick={() => setShowLiked(true)}
        >
          ❤️ Liked ({liked.length})
        </p>

        {/* ✅ LANGUAGES (INCLUDING KANNADA) */}
        <div className="section">
          <h4>Languages</h4>

          {["All", "English", "Hindi", "Kannada", "Tamil", "Telugu"].map((lang) => (
            <button
              key={lang}
              className={language === lang ? "active" : ""}
              onClick={() => {
                setLanguage(lang);
                setShowLiked(false);
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <input
          className="search"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🎯 MOODS */}
        <div className="moods">
          {["All", "Happy", "Sad", "Love"].map((m) => (
            <button
              key={m}
              className={mood === m ? "active" : ""}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <h2>{showLiked ? "❤️ Liked Songs" : `${language} Songs`}</h2>

        {/* SONG GRID */}
        <div className="grid">
          {filtered.length === 0 && <p>No songs found 😢</p>}

          {filtered.map((song, i) => (
            <div key={i} className="card">
              <img
                src={song.image}
                alt=""
                onClick={() => setCurrent(song)}
              />

              <h4>{song.title}</h4>
              <p>{song.artist}</p>

              <div className="card-actions">
                <button onClick={() => setCurrent(song)}>▶</button>

                <button onClick={() => toggleLike(song)}>
                  {liked.find((s) => s.title === song.title)
                    ? "❤️"
                    : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎧 YOUTUBE PLAYER */}
      {current && (
        <div className="yt-player">
          <div className="yt-info">
            <strong>{current.title}</strong>
            <p>{current.artist}</p>
          </div>

          <iframe
            src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1`}
            title="YouTube player"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
}