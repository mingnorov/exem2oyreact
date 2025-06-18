import React, { useState, useEffect } from "react";
import frogImg from "./assets/qurbaqa1.png";


const getRandomPosition = () => ({
  top: `${Math.floor(Math.random() * 80)}%`,
  left: `${Math.floor(Math.random() * 80)}%`,
});

const backgroundClasses = [
  "bg-gradient-to-r from-pink-300 to-yellow-300",
  "bg-gradient-to-r from-purple-300 to-blue-300",
  "bg-gradient-to-r from-green-200 to-blue-300",
  "bg-gradient-to-r from-yellow-200 to-pink-300",
  "bg-gradient-to-r from-red-200 to-orange-300",
  "bg-gradient-to-r from-cyan-200 to-sky-300"
];
//asd

const App = () => {
  const [position, setPosition] = useState(getRandomPosition());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [bgClass, setBgClass] = useState(backgroundClasses[0]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleClick = () => {
    setScore(score + 1);
    setPosition(getRandomPosition());

    const randomBg =
      backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];
    setBgClass(randomBg);
  };

  const finalBgClass =
    timeLeft <= 5 ? "bg-red-500 animate-pulse" : bgClass;

  return (
    <div
      className={`min-h-screen ${finalBgClass} flex flex-col items-center justify-center text-center p-6 relative overflow-hidden transition-colors duration-500`}
    >
      <h1 className="text-3xl font-bold mb-4">🐸 Поймай лягушку!</h1>
      <p className="text-xl mb-2">⏱️ Время: {timeLeft} сек</p>
      <p className="text-xl mb-6">🏆 Баллы: {score}</p>

      {!gameOver && (
        <img
          src={frogImg}
          alt="Лягушка"
          onClick={handleClick}
          className="absolute w-20 h-20 cursor-pointer transition-all duration-300"
          style={{ top: position.top, left: position.left }}
        />
      )}

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-black">
            <h2 className="text-2xl font-bold mb-4">⏰ Время вышло!</h2>
            <p className="text-lg mb-4">Ваш счёт: {score}</p>
            <button
              onClick={() => {
                setScore(0);
                setTimeLeft(30);
                setGameOver(false);
                setPosition(getRandomPosition());
                setBgClass(backgroundClasses[0]); 
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Играть снова
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
