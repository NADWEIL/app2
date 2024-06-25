import React, { useState } from 'react';
import Timer from './Timer';
import './TimersManager.css';

const TimersManager = () => {
  const [timers, setTimers] = useState([
    { id: 1, initialSeconds: 60, currentSeconds: 60, isActive: false, endTime: new Date(new Date().getTime() + 60 * 1000) }, // Minuteur par défaut (1 minute)
  ]);
  const [newTimerHours, setNewTimerHours] = useState('');
  const [newTimerMinutes, setNewTimerMinutes] = useState('');
  const [newTimerSeconds, setNewTimerSeconds] = useState('');

  const addTimer = () => {
    const hours = Math.max(Math.min(parseInt(newTimerHours, 10) || 0, 23), 0);
    const minutes = Math.max(Math.min(parseInt(newTimerMinutes, 10) || 0, 59), 0);
    const seconds = Math.max(Math.min(parseInt(newTimerSeconds, 10) || 0, 59), 0);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
      const endTime = new Date(new Date().getTime() + totalSeconds * 1000);
      setTimers([...timers, { id: Date.now(), initialSeconds: totalSeconds, currentSeconds: totalSeconds, isActive: true, endTime }]);
      setNewTimerHours('');
      setNewTimerMinutes('');
      setNewTimerSeconds('');
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div className="timers-manager">
      <div className="add-timer-form">
        <input
          type="number"
          value={newTimerHours}
          onChange={(e) => {
            const hours = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 23);
            setNewTimerHours(hours.toString());
          }}
          placeholder="Heures"
        />
        <input
          type="number"
          value={newTimerMinutes}
          onChange={(e) => {
            const minutes = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 59);
            setNewTimerMinutes(minutes.toString());
          }}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={newTimerSeconds}
          onChange={(e) => {
            const seconds = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 59);
            setNewTimerSeconds(seconds.toString());
          }}
          placeholder="Secondes"
        />

        <button onClick={addTimer}>Ajouter un minuteur</button>
      </div>
      <div className="timers-list">
        {timers.map(timer => (
          <div key={timer.id} className="timer-item">
            <Timer
              id={timer.id}
              initialSeconds={timer.currentSeconds}
              isActive={timer.isActive}
              endTime={timer.endTime}
              onDelete={deleteTimer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimersManager;
