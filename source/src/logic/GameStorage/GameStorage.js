import GameStorageInterface from './GameStorageInterface';

class GameStorage extends GameStorageInterface {
    constructor(onGameStateChange, onBoardRowsChange, onMineCountChange, onMarkedCellCountChange) {
        super();
        this._onGameStateChange = onGameStateChange;
        this._onBoardRowsChange = onBoardRowsChange;
        this._onMineCountChange = onMineCountChange;
        this._onMarkedCellCountChange = onMarkedCellCountChange;
        this._gameState = 'in_progress';
        this._boardRows = [];
        this._mineCount = 0;
        this._markedCellCount = 0;
    }

    set_game_state = (gameState) => {
        this._gameState = gameState;
        this._onGameStateChange(this._gameState);
    }

    get_game_state = () => {
        return this._gameState;
    }

    reset = () => {
        this._set_board_rows([]);
        this._set_mine_count(0);
        this._set_marked_cell_count(0);
        return this;
    }

    initialize_board_rows = (rowCount, colCount) => {
        const cell = {
            cell_type: 'empty',
            is_hidden: true,
            mark_type: null,
            surrounding_mine_count: 0,
        }
        let row = [];
        for (let c=0; c<colCount; c++) {
            row.push(structuredClone(cell))
        }
        let boardRows = [];
        for (let r=0; r<rowCount; r++) {
            boardRows.push(structuredClone(row))
        }
        this._set_board_rows(boardRows)
        return this;
    }

    set_cell_type = (x, y, cellType) => {
        this._set_cell_kv(x, y, 'cell_type', cellType);
        return this;
    }

    set_cell_is_hidden = (x, y, isHidden) => {
        this._set_cell_kv(x, y, 'is_hidden', isHidden);
        return this;
    }

    set_cell_mark_type = (x, y, markType) => {
        this._set_cell_kv(x, y, 'mark_type', markType);
        return this;
    }

    set_cell_surrounding_mine_count = (x, y, surMineCount) => {
        this._set_cell_kv(x, y, 'surrounding_mine_count', surMineCount);
        return this;
    }

    get_cell = (x, y) => {
        try {
            return this._boardRows[y][x];
        } catch (e) {
            // allow TypeError caused by trying to get a cell coordinate that doesn't exist
            if ((e instanceof TypeError) === true) {
                return undefined;
            }
            throw new Error(e);
        }
    }

    set_mine_count = (count) => {
        this._set_mine_count(count);
        return this;
    }

    get_mine_count = () => {
        return this._mineCount;
    }

    set_marked_cell_count = (count) => {
        this._set_marked_cell_count(count);
        return this;
    }

    get_marked_cell_count = () => {
        return this._markedCellCount;
    }

    // centralizes the onChange logic
    _set_board_rows = (boardRows) => {
        this._boardRows = boardRows;
        this._onBoardRowsChange(this._boardRows);
    }
    _set_mine_count = (mineCount) => {
        this._mineCount = mineCount;
        this._onMineCountChange(this._mineCount);
    }
    _set_marked_cell_count = (markedCellCount) => {
        this._markedCellCount = markedCellCount;
        this._onMarkedCellCountChange(this._markedCellCount);
    }

    // update one of the fields in a given cell
    _set_cell_kv = (x, y, key, value) => {
        try {
            let boardRows = structuredClone(this._boardRows);
            boardRows[y][x][key] = value;
            this._set_board_rows(boardRows);
            return this;
        } catch (e) {
            // allow TypeError caused by trying to update a cell coordinate that doesn't exist
            if ((e instanceof TypeError) === true) {
                return this;
            }
            throw new Error(e);
        }
    }
}

export default GameStorage;
