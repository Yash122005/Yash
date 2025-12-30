
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TicTacToe from '../components/games/TicTacToe';
import MemoryGame from '../components/games/MemoryGame';
import ReactionTime from '../components/games/ReactionTime';

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'tictactoe' | 'memory' | 'reaction' | null>(null);

  const gameList = [
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'The classic game of strategy. Play against the machine (or yourself).',
      icon: 'fa-solid fa-hashtag',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Test your brain with this classic card-matching memory game.',
      icon: 'fa-solid fa-brain',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'reaction',
      title: 'Reaction Test',
      description: 'How fast are your reflexes? Click as soon as the screen turns green!',
      icon: 'fa-solid fa-bolt',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-20 min-h-screen"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6">Interactive Playground</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Need a break from code? Try out these mini-games built with React logic.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!activeGame ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {gameList.map((game) => (
              <motion.button
                key={game.id}
                whileHover={{ y: -10 }}
                onClick={() => setActiveGame(game.id as any)}
                className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 text-left overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity blur-3xl`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-8 shadow-lg shadow-black/50`}>
                  <i className={`${game.icon} text-3xl text-white`}></i>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {game.description}
                </p>
                <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                  Play Now <i className="fa-solid fa-chevron-right ml-1"></i>
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl mx-auto"
          >
            <button 
              onClick={() => setActiveGame(null)}
              className="mb-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Games
            </button>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
              {activeGame === 'tictactoe' && <TicTacToe />}
              {activeGame === 'memory' && <MemoryGame />}
              {activeGame === 'reaction' && <ReactionTime />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Games;
