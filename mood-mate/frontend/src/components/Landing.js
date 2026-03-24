import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const text = "Elevate You With Music 🎵";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 2000);
    }
  }, [index]);

  return (
    <div className="landing">
      <h1 className="title glow">{displayText}</h1>

      <button className="btn" onClick={() => navigate("/auth")}>
        Explore
      </button>
    </div>
  );
}