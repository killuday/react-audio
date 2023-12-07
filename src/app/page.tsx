'use client'
import { useState, useEffect } from 'react';
import sound from '../../public/audio/audio.mp3';

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval:any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      new Audio(sound).play();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStartTimer = () => {
    setIsActive(true);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <>
      <h1 className='text-center mt-10 font-bold text-6xl text-pink-600'>
        Timer
      </h1>
      <div className='text-center mt-4'>
        <input
          type='number'
          value={seconds}
          onChange={e => setSeconds(parseInt(e.target.value))}
          placeholder='Enter seconds'
          className='border-2 border-gray-300 p-2 mr-2'
        />
        {!isActive && (
          <button onClick={handleStartTimer} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Start
          </button>
        )}
        {isActive && (
          <button onClick={handleResetTimer} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
            Reset
          </button>
        )}
      </div>
    </>
  );
}
