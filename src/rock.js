import React, { useState, useEffect } from 'react';
import './rock.css';

function RockShooterGame() {
  const [score, setScore] = useState(0);
  const [rocks, setRocks] = useState([]);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    // Create a new rock every 2 seconds
    const interval = setInterval(() => {
      if (!isPaused) {
        setRocks(rocks => [...rocks, { x: Math.random() * (300 - 50), y:  Math.random() * (300 - 50)}]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  function handleClickRock(rockIndex) {
    // Remove the clicked rock and increase the score
    setRocks(rocks => rocks.filter((rock, i) => i !== rockIndex));
    setScore(score => score + 1);
  }

  function handlePausePlay() {
    setIsPaused(isPaused => !isPaused);
  }

  return (
    <div className="rock-shooter">
      <div style={{ position: 'relative', width: '300px', height: '300px', border: '1px solid black'}}>
        {rocks.map((rock, i) => (
          <div key={i} style={{ position: 'absolute', left: rock.x, top: rock.y, width: '30px', height: '30px', backgroundColor: 'grey' }} onClick={() => handleClickRock(i)} />
        ))}
      </div>
      <p className="rock-shooter-score">Score: {score}</p><button onClick={handlePausePlay}>{isPaused ? 'Play' : 'Pause'}</button>
    </div>
  );
}

export default RockShooterGame;
