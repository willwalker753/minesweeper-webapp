import React, { useState, useMemo, useEffect } from 'react';
import Board from '../../components/Board/Board';
import BoardStorage from '../../logic/GameStorage/GameStorage';
import BoardGenerator from '../../logic/BoardGenerator/BoardGenerator';
import PlayerActionStrategy from '../../logic/PlayerActionStrategy/PlayerActionStrategy';
import './minesweeper.css';
import CellCoordinateHelper from '../../logic/CellCoordinateHelper/CellCoordinateHelper';

// orchestrates a minesweeper game
function Minesweeper() {
    const [gameState, setGameState] = useState('in_progress');
    const [boardRows, setBoardRows] = useState([]);
    const [mineCount, setMineCount] = useState(0);
    const [markedCellCount, setMarkedCellCount] = useState(0);

    const boardStorage = useMemo(() => new BoardStorage(setGameState, setBoardRows, setMineCount, setMarkedCellCount), []);
    const cellCoordinateHelper = useMemo(() => new CellCoordinateHelper(), []);
    const boardGenerator = useMemo(() => new BoardGenerator(boardStorage, cellCoordinateHelper), []);
    const playerActionStrategy = useMemo(() => new PlayerActionStrategy(boardGenerator, boardStorage, cellCoordinateHelper), []);

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
            <p>Debug - Marked Cell Count: {markedCellCount}</p>
            <button onClick={() => playerActionStrategy.new_game('hard')}>Debug - New Game Hard</button>
            <Board
                boardRows={boardRows}
                onCellReveal={handleCellReveal}
                onCycleCellMark={handleCycleCellMark}
            />
        </div>
    );
}

export default Minesweeper;