
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

type GameMode = 'player' | 'ai';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>('player');
  const aiMoveInProgress = useRef(false);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Draw';
  };

  /**
   * Minimax algorithm implementation for AI decision making
   * This function evaluates all possible moves and returns the best move for the AI
   * 
   * @param squares - Current board state
   * @param isMaximizing - True if it's the AI's turn (maximizing), false if player's turn (minimizing)
   * @returns Object with score and best move index
   */
  const minimax = (squares: (string | null)[], isMaximizing: boolean): { score: number; index?: number } => {
    const winner = calculateWinner(squares);
    
    // Base cases: return scores based on game outcome
    if (winner === 'O') return { score: 10 }; // AI wins
    if (winner === 'X') return { score: -10 }; // Player wins
    if (winner === 'Draw') return { score: 0 }; // Draw
    
    // Get all available moves (empty squares)
    const availableMoves: number[] = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        availableMoves.push(i);
      }
    }
    
    if (availableMoves.length === 0) {
      return { score: 0 };
    }
    
    // AI's turn (maximizing player - trying to maximize score)
    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestMove = availableMoves[0];
      
      for (const move of availableMoves) {
        const newSquares = squares.slice();
        newSquares[move] = 'O'; // AI plays as O
        
        const result = minimax(newSquares, false);
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = move;
        }
      }
      
      return { score: bestScore, index: bestMove };
    } 
    // Player's turn (minimizing player - trying to minimize score)
    else {
      let bestScore = Infinity;
      let bestMove = availableMoves[0];
      
      for (const move of availableMoves) {
        const newSquares = squares.slice();
        newSquares[move] = 'X'; // Player plays as X
        
        const result = minimax(newSquares, true);
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = move;
        }
      }
      
      return { score: bestScore, index: bestMove };
    }
  };

  /**
   * Gets the best move for the AI using Minimax algorithm
   * This function is called when it's the AI's turn
   */
  const getAIMove = (currentBoard: (string | null)[]): number => {
    const result = minimax(currentBoard, true);
    return result.index ?? 0; // Fallback to index 0 if no move found (shouldn't happen)
  };

  /**
   * Handles AI move with a delay for better UX
   * The AI automatically makes a move after the player's move
   * Uses a ref to prevent multiple simultaneous AI moves
   */
  const makeAIMove = (currentBoard: (string | null)[]) => {
    // Don't make AI move if already in progress, game is over, or it's not AI's turn
    if (aiMoveInProgress.current || calculateWinner(currentBoard) || gameMode !== 'ai') {
      return;
    }
    
    aiMoveInProgress.current = true;
    
    // Add delay for better user experience (400ms)
    setTimeout(() => {
      const boardSnapshot = currentBoard.slice();
      const winner = calculateWinner(boardSnapshot);
      
      // Double-check conditions before making move
      if (!winner) {
        const aiMove = getAIMove(boardSnapshot);
        
        // Ensure the move is valid
        if (boardSnapshot[aiMove] === null) {
          const newBoard = boardSnapshot.slice();
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setXIsNext(true); // Switch back to player's turn
        }
      }
      
      aiMoveInProgress.current = false;
    }, 400);
  };

  const handleClick = (i: number) => {
    const winner = calculateWinner(board);
    // Prevent clicks if game is over, square is occupied, or it's AI's turn in AI mode
    if (winner || board[i] || (gameMode === 'ai' && !xIsNext) || aiMoveInProgress.current) return;
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    
    // Trigger AI move if in AI mode and it's now AI's turn (O's turn)
    if (gameMode === 'ai' && xIsNext) {
      makeAIMove(newBoard);
    }
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`
    : gameMode === 'ai' 
      ? xIsNext ? "Your Turn (X)" : "AI is thinking..."
      : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    aiMoveInProgress.current = false; // Reset AI move flag
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-black mb-8">Tic Tac Toe</h2>
      
      {/* Game Mode Toggle */}
      <div className="mb-6 flex gap-3 items-center">
        <button
          onClick={() => {
            setGameMode('player');
            resetGame();
          }}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
            gameMode === 'player'
              ? 'bg-blue-500 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Player vs Player
        </button>
        <button
          onClick={() => {
            setGameMode('ai');
            resetGame();
          }}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
            gameMode === 'ai'
              ? 'bg-blue-500 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Player vs AI
        </button>
      </div>
      
      <div className={`mb-8 px-6 py-2 rounded-full font-bold text-lg ${winner ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] mb-8">
        {board.map((square, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            className="h-20 sm:h-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-4xl font-black hover:bg-white/10 transition-colors"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: square ? 1 : 0 }}
              className={square === 'X' ? 'text-blue-500' : 'text-purple-500'}
            >
              {square}
            </motion.span>
          </motion.button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
