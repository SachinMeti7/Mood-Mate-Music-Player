import express from "express";

const router = express.Router();

// dummy songs (temporary)
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Believer",
      artist: "Imagine Dragons",
      image: "https://picsum.photos/200",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
  ]);
});

export default router;