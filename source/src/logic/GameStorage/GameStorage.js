import GameStorageInterface from './GameStorageInterface';

class GameStorage extends GameStorageInterface {
    constructor(
        onStorageChange=(key, value) => null // sends the changed storage key and its new value
    ) {
        super();
        this.onStorageChange = onStorageChange;
        // please only access the storage through _write_storage and _read_storage methods (to centralize handling)
        this._initStorage = {
            game_state: 'in_progress',
            board_rows: [],
            mine_count: 0,
            marked_cell_count: 0,
            revealed_empty_cell_count: 0,            
            total_cell_count: 0,
        }
        this._storage = structuredClone(this._initStorage);
    }

    reset = () => {
        const initStorage = structuredClone(this._initStorage);
        Object.keys(initStorage).forEach(key => this._write_storage(key, initStorage[key]));
        return this;
    }

    set_game_state = (gameState) => {
        this._write_storage('game_state', gameState);
        return this;
    }

    get_game_state = () => {
        return this._read_storage('game_state');
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
        this._write_storage('board_rows', boardRows);
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
            return this._read_storage('board_rows')[y][x];
        } catch (e) {
            // allow TypeError caused by trying to get a cell coordinate that doesn't exist
            if ((e instanceof TypeError) === true) {
                return undefined;
            }
            throw new Error(e);
        }
    }

    set_mine_count = (count) => {
        this._write_storage('mine_count', count);
        return this;
    }

    get_mine_count = () => {
        return this._read_storage('mine_count');
    }

    set_marked_cell_count = (count) => {
        this._write_storage('marked_cell_count', count);
        return this;
    }

    get_marked_cell_count = () => {
        return this._read_storage('marked_cell_count');
    }

    set_revealed_empty_cell_count = (count) => {
        this._write_storage('revealed_empty_cell_count', count);
        return this;
    }

    get_revealed_empty_cell_count = () => {
        return this._read_storage('revealed_empty_cell_count');
    }

    set_total_cell_count = (count) => {
        this._write_storage('total_cell_count', count);
        return this;
    }

    get_total_cell_count = () => {
        return this._read_storage('total_cell_count');
    }

    // update one of the fields in a given cell
    _set_cell_kv = (x, y, key, value) => {
        try {
            let boardRows = structuredClone(this._read_storage('board_rows'));
            boardRows[y][x][key] = value;
            this._write_storage('board_rows', boardRows);
            return this;
        } catch (e) {
            // allow TypeError caused by trying to update a cell coordinate that doesn't exist
            if ((e instanceof TypeError) === true) {
                return this;
            }
            throw new Error(e);
        }
    }

    _write_storage = (key, value) => {
        // update storage and call the on change callback
        this._storage[key] = value;
        this.onStorageChange(key, this._storage[key]);
    }

    _read_storage = (key) => {
        return this._storage[key];
    }
}

export default GameStorage;
