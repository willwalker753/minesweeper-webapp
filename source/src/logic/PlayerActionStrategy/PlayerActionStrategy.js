import PlayerActionStrategyInterface from './PlayerActionStrategyInterface';

class PlayerActionStrategy extends PlayerActionStrategyInterface {
    constructor(boardGenerator, gameStorage) {
        super();
        this.boardGenerator = boardGenerator;
        this.gameStorage = gameStorage;
    }

    new_game = (difficulty) => {
        this.boardGenerator.generate_template(difficulty);
        return this;
    }

    /*
    handle the logic for playing a cell
    returns this
    */
    reveal_cell = (x, y) => {
        let revealedMarkedCellCount = 0;
        let isRevealedCellCoordMap = {}; // e.g.{ [0,0]: true }
        const _reveal_surrounding_cells = (startX, startY) => {
            // if the cell is already revealed, then dont reveal again 
            const startCell = this.gameStorage.get_cell(startX, startY);
            if (startCell.is_hidden === false) return;

            if (cell.mark_type !== null) revealedMarkedCellCount++;
        }
        this.gameStorage.set_cell_is_hidden(x, y, false);

        // subtract the revealed marked cells from the the marked cell count 
        const curMarkedCellCount = this.gameStorage.get_marked_cell_count();
        this.gameStorage.set_marked_cell_count(curMarkedCellCount - revealedMarkedCellCount);

        return this;
    }

    /*
    cycles the cell's marking each time it is called
        cycle order: null --> 'flag' --> 'question'
    returns this
    */
    cycle_cell_mark = (x, y) => {
        const cell = this.gameStorage.get_cell(x, y);
        // dont change cell marking on revealed cells
        if (cell.is_hidden === false) return this;

        // cycle to the next mark
        const prevMarkType = cell.mark_type;
        const nextMarkTypeMap = {
            [null]: 'flag',
            'flag': 'question',
            'question': null
        }
        const nextMarkType = nextMarkTypeMap[prevMarkType]
        this.gameStorage.set_cell_mark_type(x, y, nextMarkType);

        // update the marked cell count
        const curMarkedCellCount = this.gameStorage.get_marked_cell_count();
        // if the cell changed to marked, then increment
        if (prevMarkType === null) this.gameStorage.set_marked_cell_count(curMarkedCellCount + 1);
        // if the cell changed to unmarked, then decrement
        if (nextMarkType === null) this.gameStorage.set_marked_cell_count(curMarkedCellCount - 1);

        return this;
    }
}

export default PlayerActionStrategy;
