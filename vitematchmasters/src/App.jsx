import React, { useState, useEffect } from 'react';
import './App.css';
import Tile from './components/Tile';

const elements = ['🔵', '🔶', '🔺', '🔻', '⭐', '✳️'];

// Generate a random tile from the 6 elements
const generateRandomTile = () => elements[Math.floor(Math.random() * elements.length)];

// Generate the initial 8x8 game board with random elements
const generateInitialBoard = () =>
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => generateRandomTile()));

export default function App() {
    const [board, setBoard] = useState(generateInitialBoard());
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(5);
    const [timeLeft, setTimeLeft] = useState(60);
    const [selectedTile, setSelectedTile] = useState(null);
    const [theme, setTheme] = useState('light');
    const [targetScore, setTargetScore] = useState(30);
    const [level, setLevel] = useState(1)  // Set target score for the level

    // Timer logic for 1-minute countdown
    useEffect(() => {
        if (timeLeft > 0 && moves > 0) {
            const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, moves]);

    // Check for matches after board is initialized
    useEffect(() => {
        checkMatches(); // Check for initial matches
    }, []); // Run only once when the component mounts

    const swapTiles = (x1, y1, x2, y2) => {
        if (moves <= 0 || timeLeft <= 0) return; // Prevent swapping when the game is over
        
        const newBoard = [...board];
        const temp = newBoard[x1][y1];
        newBoard[x1][y1] = newBoard[x2][y2];
        newBoard[x2][y2] = temp;
        setBoard(newBoard);
        setMoves((prevMoves) => prevMoves - 1);
        checkMatches();
    };

    const handleTileClick = (x, y) => {
        if (moves <= 0 || timeLeft <= 0) return; // Prevent clicks when the game is over
        
        const tile = board[x][y];
        
        if (tile === '💣') {
            triggerBombEffect(x, y);
        } else if (tile === '🚀') {
            triggerRocketEffect(x, y);
        } else if (selectedTile) {
            const [prevX, prevY] = selectedTile;
            swapTiles(prevX, prevY, x, y);
            setSelectedTile(null);
        } else {
            setSelectedTile([x, y]);
        }
    };

    const triggerBombEffect = (x, y) => {
        const affectedTiles = [
            [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1],
            [x - 1, y - 1], [x - 1, y + 1], [x + 1, y - 1], [x + 1, y + 1]
        ];
        
        const newBoard = [...board];
        affectedTiles.forEach(([i, j]) => {
            if (i >= 0 && i < 8 && j >= 0 && j < 8) newBoard[i][j] = generateRandomTile();
        });
        newBoard[x][y] = generateRandomTile(); // Regenerate the bomb tile as well
        setBoard(newBoard);
        setScore((prevScore) => prevScore + 10);
    };

    const triggerRocketEffect = (x, y) => {
        const isHorizontal = x % 2 === 0;  // Random choice for rocket direction
        const newBoard = [...board];
        
        if (isHorizontal) {
            for (let j = 0; j < 8; j++) newBoard[x][j] = generateRandomTile();
        } else {
            for (let i = 0; i < 8; i++) newBoard[i][y] = generateRandomTile();
        }
        setBoard(newBoard);
        setScore((prevScore) => prevScore + 15);
    };


   

    const checkMatches = () => {
        let newBoard = [...board];
        let matchedTiles = [];
        let updatedScore = score;
        let bombOrRocketAdded = false; // Flag to confirm if bomb or rocket is added
    
        // Check for horizontal matches
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 6; col++) {
                const currentTile = newBoard[row][col];
                if (currentTile && currentTile === newBoard[row][col + 1] && currentTile === newBoard[row][col + 2]) {
                    matchedTiles.push([row, col], [row, col + 1], [row, col + 2]);
    
                    if (col < 5 && currentTile === newBoard[row][col + 3]) {
                        matchedTiles.push([row, col + 3]);
                        if (col < 4 && currentTile === newBoard[row][col + 4]) {
                            matchedTiles.push([row, col + 4]);
                            newBoard[row][col + 4] = '🚀'; // Rocket replaces the last tile in a 5-match
                            bombOrRocketAdded = true;
                            updatedScore += 5;
                        } else {
                            newBoard[row][col + 3] = '💣'; // Bomb replaces the last tile in a 4-match
                            bombOrRocketAdded = true;
                            updatedScore += 4;
                        }
                    } else {
                        updatedScore += 3;
                    }
                }
            }
        }
    
        // Check for vertical matches
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 6; row++) {
                const currentTile = newBoard[row][col];
                if (currentTile && currentTile === newBoard[row + 1][col] && currentTile === newBoard[row + 2][col]) {
                    matchedTiles.push([row, col], [row + 1, col], [row + 2, col]);
    
                    if (row < 5 && currentTile === newBoard[row + 3][col]) {
                        matchedTiles.push([row + 3, col]);
                        if (row < 4 && currentTile === newBoard[row + 4][col]) {
                            matchedTiles.push([row + 4, col]);
                            newBoard[row + 4][col] = '🚀'; // Rocket replaces the last tile in a 5-match
                            bombOrRocketAdded = true;
                            updatedScore += 5;
                        } else {
                            newBoard[row + 3][col] = '💣'; // Bomb replaces the last tile in a 4-match
                            bombOrRocketAdded = true;
                            updatedScore += 4;
                        }
                    } else {
                        updatedScore += 3;
                    }
                }
            }
        }
    
        // Clear matched tiles and log to ensure bombs/rockets are added
        matchedTiles.forEach(([row, col]) => {
            if (!bombOrRocketAdded || newBoard[row][col] !== '🚀' && newBoard[row][col] !== '💣') {
                newBoard[row][col] = ''; // Clear tile if it's not bomb or rocket
            }
        });
    
        if (matchedTiles.length > 0) {
            console.log("Match found, refreshing board...");
            setScore(updatedScore);
            setBoard(newBoard);
            setTimeout(() => refillBoard(newBoard), 500); // Delayed refill to show bombs/rockets
        }
    };
    

    const refillBoard = (newBoard) => {
        const refilledBoard = newBoard.map(row => row.map(tile => (tile === '' ? generateRandomTile() : tile)));
        setBoard(refilledBoard);
    };

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        if ((timeLeft === 0 || moves === 0) && timeLeft !== -1) {
            alert(`Game Over! Final Score: ${score}`);
            setTimeLeft(-1);
        }
    }, [timeLeft, moves, score]);

    

    return (
        <div className={`app ${theme}`}>
            <h1>Match Masters Clone</h1>
            <div className="controls">
                <button onClick={toggleTheme}>Toggle Theme</button>
                <p>Score: {score}</p>
                <p>Moves Left: {moves}</p>
                <p>Time Left: {timeLeft}s</p>
                <p>Target Score: {targetScore}</p>
                

            </div>
            <div className="game-board">
                {board.map((row, rowIndex) =>
                    row.map((tile, colIndex) => (
                        <Tile
                            key={`${rowIndex}-${colIndex}`}
                            value={tile}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                            isSelected={selectedTile && selectedTile[0] === rowIndex && selectedTile[1] === colIndex}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
