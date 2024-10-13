import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Dino Game Component
const DinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoYPosition, setDinoYPosition] = useState(0); // Vertical position
  const [dinoXPosition, setDinoXPosition] = useState(10); // Horizontal position
  const [cactusPosition, setCactusPosition] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);

  // Load the sound files
  const jumpSound = new Audio("/sounds/jump.mp3");
  const gameOverSound = new Audio("/sounds/game-over.mp3");

  useEffect(() => {
    let gameInterval = setInterval(() => {
      if (cactusPosition > -10 && !isGameOver) {
        setCactusPosition((prev) => prev - 2);
      } else {
        setCactusPosition(100); // Reset cactus position when it goes off-screen
      }
    }, 30);

    // Check for collision
    if (
      cactusPosition < dinoXPosition + 20 &&
      cactusPosition > dinoXPosition &&
      dinoYPosition === 0
    ) {
      setIsGameOver(true);
      gameOverSound.play(); // Play game over sound
      clearInterval(gameInterval);
    }

    return () => clearInterval(gameInterval);
  }, [cactusPosition, dinoXPosition, dinoYPosition, isGameOver, gameOverSound]);

  useEffect(() => {
    if (isJumping) {
      // Handle jump mechanics with horizontal and vertical movement
      let jumpTimeout = setTimeout(() => {
        jumpSound.play(); // Play jump sound
        setDinoYPosition(80); // Jump up
        setDinoXPosition((prev) => prev + 20); // Move right
        setTimeout(() => {
          setDinoYPosition(0); // Fall down
          setIsJumping(false);
        }, 500);
      }, 50);

      return () => clearTimeout(jumpTimeout);
    }
  }, [isJumping, jumpSound]);

  const handleJump = () => {
    if (!isJumping && !isGameOver) {
      setIsJumping(true);
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setCactusPosition(100);
    setDinoXPosition(10); // Reset dino's horizontal position
  };

  return (
    <motion.div
      className="relative w-full h-20 bg-gray-800 overflow-hidden rounded-lg my-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
    >
      <div
        className="absolute bottom-0 bg-green-600 w-16 h-16"
        style={{ bottom: dinoYPosition + "px", left: dinoXPosition + "px" }} // Move both vertically and horizontally
      />
      <div
        className="absolute bottom-0 bg-red-500 w-8 h-20"
        style={{ right: cactusPosition + "px" }}
      />
      <button
        className="absolute bottom-0 left-4 text-white bg-blue-600 p-2 rounded-lg mt-4 hover:scale-110 transition-transform"
        onClick={handleJump}
      >
        Jump!
      </button>

      {isGameOver && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-xl mb-4">Game Over</h2>
            <button
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Not Found Page
const NotFoundPage = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white p-10 rounded-lg shadow-xl text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="text-center"
          initial={{ rotate: -30 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1 }}
        >
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
        </motion.div>
        <motion.h1
          className="text-9xl font-bold text-blue-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-4xl font-semibold text-gray-800 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Oops! Page not found
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out hover:scale-110"
          >
            <FaHome className="mr-2" />
            Go back to Home
          </Link>
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/search-results"
            className="inline-flex items-center px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-300 ease-in-out hover:scale-110"
          >
            <FaSearch className="mr-2" />
            Search Something Else
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
