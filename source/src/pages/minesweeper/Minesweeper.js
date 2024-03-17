import React, { useState, useMemo, useEffect } from 'react';
import Board from '../../components/Board/Board';
import BoardStorage from '../../logic/GameStorage/GameStorage';
import BoardGenerator from '../../logic/BoardGenerator/BoardGenerator';
import PlayerActionStrategy from '../../logic/PlayerActionStrategy/PlayerActionStrategy';
import './minesweeper.css';

// orchestrates a minesweeper game
function Minesweeper() {
    const [gameState, setGameState] = useState('in_progress');
    const [boardRows, setBoardRows] = useState([]);
    const [mineCount, setMineCount] = useState(0);
    const [markedCellCount, setMarkedCellCount] = useState(0);

    const boardStorage = useMemo(() => new BoardStorage(setGameState, setBoardRows, setMineCount, setMarkedCellCount), []);
    const boardGenerator = useMemo(() => new BoardGenerator(boardStorage), []);
    const playerActionStrategy = useMemo(() => new PlayerActionStrategy(boardGenerator, boardStorage), []);

    // start the game on page load
    useEffect(() => {
        playerActionStrategy.new_game('easy');
    }, []);

    const handleCellReveal = (x, y) => {
        playerActionStrategy.reveal_cell(x, y);
    }

    const handleCycleCellMark = (x, y) => {
        playerActionStrategy.cycle_cell_mark(x, y);
    }

    return (
        <div className='minesweeper'>
            <p>Marked Cell Count: {markedCellCount}</p>
            <Board
                boardRows={boardRows}
                onCellReveal={handleCellReveal}
                onCycleCellMark={handleCycleCellMark}
            />
        </div>
    );
}

export default Minesweeper;