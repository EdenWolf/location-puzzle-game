import React from 'react';

const Puzzle = ({ puzzle, onSolve }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{puzzle.title}</h2>
      
      <div className="prose max-w-none mb-6">
        <p>{puzzle.description}</p>
        
        {puzzle.imageUrl && (
          <div className="my-4">
            <img 
              src={puzzle.imageUrl} 
              alt={puzzle.title} 
              className="mx-auto rounded-md max-h-80 object-contain"
            />
          </div>
        )}
        
        {puzzle.hint && (
          <div className="bg-yellow-50 p-3 rounded-md mt-4 border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-800">Hint:</h4>
            <p className="text-yellow-700">{puzzle.hint}</p>
          </div>
        )}
      </div>
      
      {puzzle.type === 'location' ? (
        <div className="mt-4">
          <p className="text-center italic text-gray-600">
            Navigate to the correct location to solve this puzzle!
          </p>
        </div>
      ) : (
        <button
          onClick={onSolve}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          I've Solved This Puzzle
        </button>
      )}
    </div>
  );
};

export default Puzzle;
