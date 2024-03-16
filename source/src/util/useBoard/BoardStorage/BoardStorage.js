import BoardStorageInterface from './BoardStorageInterface';

class BoardStorage extends BoardStorageInterface{
    constructor(onRowsChange, onMineCountChange, onMarkedCountChange) {
        super();
        this._onRowsChange = onRowsChange;
        this._onMineCountChange = onMineCountChange;
        this._onMarkedCountChange = onMarkedCountChange;
        this._rows = [];
        this._mineCount = 0;
        this._markedCount = 0;
    }

    reset = () => {
        this._set_rows([]);
        this._set_mine_count(0);
        this._set_marked_count(0);
        return this;
    }

    create_cells = (rowCount, colCount) => {
        const cell = {
            'cell_type': 'empty',
            'is_hidden': true,
            'mark_type': null
        }
        let row = [];
        for (let c=0; c<colCount; c++) {
            row.push(structuredClone(cell))
        }
        let rows = [];
        for (let r=0; r<rowCount; r++) {
            rows.push(structuredClone(row))
        }
        this._set_rows(rows)
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

    get_cell = (x, y) => {
        return this._rows[y][x];
    }

    set_mine_count = (count) => {
        this._set_mine_count(count);
        return this;
    }

    get_mine_count = () => {
        return this._mineCount;
    }

    set_marked_count = (count) => {
        this._set_marked_count(count);
        return this;
    }

    get_marked_count = () => {
        return this._markedCount;
    }

    // centralizes the onChange logic
    _set_rows = (rows) => {
        this._rows = rows;
        this._onRowsChange(this._rows);
    }
    _set_mine_count = (mineCount) => {
        this._mineCount = mineCount;
        this._onMineCountChange(this._mineCount);
    }
    _set_marked_count = (markedCount) => {
        this._markedCount = markedCount;
        this._onMarkedCountChange(this._markedCount);
    }

    // update one of the fields in a given cell
    _set_cell_kv = (x, y, key, value) => {
        try {
            let rows = structuredClone(this._rows);
            rows[y][x][key] = value;
            this._set_rows(rows);
            return this;
        } catch (e) {
            if ((e instanceof TypeError) === true) {
                console.warn(`coordinates ${x},${y} probably out of range. full error:`, e);
                return this;
            }
            throw new Error(e);
        }
    }
}

export default BoardStorage;
