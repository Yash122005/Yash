
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ICONS = ['🔥', '⚡', '🌈', '💎', '🚀', '⭐', '🍀', '🍎'];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<{ id: number, emoji: string, isFlipped: boolean, isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const initialCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
        }, 600);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-black mb-8">Memory Match</h2>
      
      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-2xl font-black text-blue-400">{moves}</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Moves</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-purple-400">
            {cards.filter(c => c.isMatched).length / 2} / {ICONS.length}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pairs</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-[400px] mb-8">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all duration-300 ${
              card.isFlipped || card.isMatched 
                ? 'bg-white/10 rotate-0' 
                : 'bg-gradient-to-br from-white/10 to-white/5 rotate-y-180'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-8 text-2xl font-bold text-green-400">
          Perfect! You found them all!
        </motion.div>
      )}

      <button
        onClick={initGame}
        className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
      >
        {isWon ? 'Play Again' : 'Reset Game'}
      </button>
    </div>
  );
};

export default MemoryGame;
