import React from 'react';

const MoodSelector = ({ onMoodSelect }) => {
  const moods = ['Happy', 'Sad', 'Energetic', 'Calm'];

  return (
    <div>
      <h2>Select Your Mood</h2>
      {moods.map(mood => (
        <button key={mood} onClick={() => onMoodSelect(mood)} style={{ margin: '5px' }}>
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;