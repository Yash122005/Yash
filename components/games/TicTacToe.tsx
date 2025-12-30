
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

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

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-black mb-8">Tic Tac Toe</h2>
      
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
