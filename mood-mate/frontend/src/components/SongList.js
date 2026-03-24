import React from 'react';

const SongList = ({ songs }) => {
  return (
    <div>
      <h2>Songs for Your Mood</h2>
      <ul>
        {songs.map(song => (
          <li key={song._id}>
            <strong>{song.title}</strong> by {song.artist}
            {song.url && <a href={song.url} target="_blank" rel="noopener noreferrer"> Listen</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;