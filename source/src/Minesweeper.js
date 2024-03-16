import React, { useEffect } from 'react';
import Board from './components/Board/Board';
import useBoard from './util/useBoard/useBoard';
import './minesweeper.css';

function Minesweeper() {
  const { generate_board_template } = useBoard({ onRowsChange: () => null });

  useEffect(() => {
    // start the game on page load
    generate_board_template('easy')
  }, [])

  return (
    <div className="minesweeper">
      <Board />
    </div>
  );
}

export default Minesweeper;