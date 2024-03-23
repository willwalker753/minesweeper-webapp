import React, { useState, useMemo, useEffect } from 'react';
import Board from '../../components/Board/Board';
import GameStorage from '../../logic/GameStorage/GameStorage';
import BoardGenerator from '../../logic/BoardGenerator/BoardGenerator';
import PlayerActionStrategy from '../../logic/PlayerActionStrategy/PlayerActionStrategy';
import CellCoordinateHelper from '../../logic/CellCoordinateHelper/CellCoordinateHelper';
import DifficultySelector from '../../components/DifficultySelector/DifficultySelector';
import GameStopwatch from '../../components/GameStopwatch/GameStopwatch';
import useGameStopwatch from '../../logic/stopwatch/useGameStopwatch/useGameStopwatch';
import initGameStorage from '../../logic/GameStorage/initGameStorage';
import './minesweeper.css';

// orchestrates a minesweeper game
function Minesweeper() {
    const [gameState, setGameState] = useState(initGameStorage.game_state);
    const [boardRows, setBoardRows] = useState(initGameStorage.board_rows);
    const [mineCount, setMineCount] = useState(initGameStorage.mine_count);
    const [markedCellCount, setMarkedCellCount] = useState(initGameStorage.marked_cell_count);
    const [gameElapsedSeconds] = useGameStopwatch(gameState);
    const defaultDifficulty = 'easy';
    
    const [tmp_revealed_empty_cell_count, set_tmp_revealed_empty_cell_count] = useState(initGameStorage.revealed_empty_cell_count);
    const [tmp_total_cell_count, set_tmp_total_cell_count] = useState(initGameStorage.total_cell_count);

    // when a stored value in a class changes, update the corresponding react state
    const propagateClassStorageChange = (key, value) => {
        const keySetStateMap = {
            game_state: setGameState,
            board_rows: setBoardRows,
            mine_count: setMineCount,
            marked_cell_count: setMarkedCellCount,
            revealed_empty_cell_count: set_tmp_revealed_empty_cell_count,
            total_cell_count: set_tmp_total_cell_count,
        }
        keySetStateMap?.[key] && keySetStateMap[key](value);
    }

    const gameStorage = useMemo(() => new GameStorage(propagateClassStorageChange), []);
    const cellCoordinateHelper = useMemo(() => new CellCoordinateHelper(), []);
    const boardGenerator = useMemo(() => new BoardGenerator(gameStorage, cellCoordinateHelper), []);
    const playerActionStrategy = useMemo(() => new PlayerActionStrategy(boardGenerator, gameStorage, cellCoordinateHelper), []);

    // start the game on page load
    useEffect(() => {
        playerActionStrategy.new_game(defaultDifficulty);
    }, []);

    const handleCellReveal = (x, y) => {
        playerActionStrategy.reveal_cell(x, y);
    }

    const handleCycleCellMark = (x, y) => {
        playerActionStrategy.cycle_cell_mark(x, y);
    }

    return (
        <div className='minesweeper'>
            <p>Debug - Game State: {gameState}</p>
            <p>Debug - Mine Count: {mineCount}</p>
            <p>Debug - Marked Cell Count: {markedCellCount}</p>
            <p>Debug - Revealed Empty Cell Count: {tmp_revealed_empty_cell_count}</p>
            <p>Debug - Total Cell Count: {tmp_total_cell_count}</p>

            <DifficultySelector 
                defaultDifficulty={defaultDifficulty}
                onDifficultyChange={(newDifficulty) => playerActionStrategy.new_game(newDifficulty)}
            />
            <GameStopwatch
                gameElapsedSeconds={gameElapsedSeconds}
            />
            <Board
                boardRows={boardRows}
                onCellReveal={handleCellReveal}
                onCycleCellMark={handleCycleCellMark}
            />
        </div>
    );
}

export default Minesweeper;