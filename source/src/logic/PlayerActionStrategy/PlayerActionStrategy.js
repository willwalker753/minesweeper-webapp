import PlayerActionStrategyInterface from './PlayerActionStrategyInterface';

class PlayerActionStrategy extends PlayerActionStrategyInterface {
    constructor(boardGenerator, gameStorage, cellCoordinateHelper) {
        super();
        this.boardGenerator = boardGenerator;
        this.gameStorage = gameStorage;
        this.cellCoordinateHelper = cellCoordinateHelper;
    }

    new_game = (difficulty) => {
        this.boardGenerator.generate_template(difficulty);
        return this;
    }

    reveal_cell = (x, y) => {
        if (this._ensure_game_is_in_progress() === false) return this;
        
        // if the cell is already revealed, then dont reveal it again  
        const cell = this.gameStorage.get_cell(x, y);
        if (cell.is_hidden === false) return this;

        // if the cell is marked, then dont reveal it
        if (cell.mark_type !== null) return this;

        // if the cell is a mine, then player loses the game
        if (cell.cell_type === 'mine') {
            this.gameStorage.set_cell_is_hidden(x, y, false);
            this.gameStorage.set_game_state('lose');
            return this;
        }

        // if the cell has any surrounding mines, then only reveal that cell
        if (cell.surrounding_mine_count > 0) {
            this.gameStorage.set_cell_is_hidden(x, y, false);
            this._add_revealed_empty_cell_count(1);
            this._handle_win_condition();
            return this;
        }

        // otherwise the cell has no surrounding mines, so reveal the group of empty cells that it is in
        let revealedMarkedCellCount = 0;
        let revealedCellCount = 0;
        let cellRevealQueue = [[x, y]];
        while (cellRevealQueue.length > 0) {
            const [centerX, centerY] = cellRevealQueue.shift();
            const cellSurCoordPairs = this.cellCoordinateHelper.get_surrounding_coord_pairs(centerX, centerY)
            const cellGroupCoordPairs = [[centerX, centerY], ...cellSurCoordPairs];
            for (let i=0; i<cellGroupCoordPairs.length; i++) {
                const [curX, curY] = cellGroupCoordPairs[i];
                const curCell = this.gameStorage.get_cell(curX, curY);

                // if the cell coordinate does not exist, then skip it
                if (curCell === undefined) continue;

                // if the cell is already revealed, then don't reveal it and don't propagate to surrounding cells
                if (curCell.is_hidden === false) continue;
                
                // reveal the cell
                this.gameStorage.set_cell_is_hidden(curX, curY, false);
                if (curCell.mark_type !== null) revealedMarkedCellCount++;
                revealedCellCount++;
                
                // if the cell has no surrounding mines, then try to reveal its surrounding cells
                if (curCell.surrounding_mine_count === 0) {
                    cellRevealQueue.push([curX, curY])
                }
            }       
        }
        // subtract the revealed marked cells from the the marked cell count 
        const curMarkedCellCount = this.gameStorage.get_marked_cell_count();
        this.gameStorage.set_marked_cell_count(curMarkedCellCount - revealedMarkedCellCount);
        // update the revealed cell count
        this._add_revealed_empty_cell_count(revealedCellCount);

        this._handle_win_condition();
        return this;
    }

    cycle_cell_mark = (x, y) => {
        if (this._ensure_game_is_in_progress() === false) return this;
        
        // dont change cell marking on revealed cells
        const cell = this.gameStorage.get_cell(x, y);
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

    // change the game state to in progress unless the game can't be in progress
    // returns (boolean) 
    //         - True when the game is currently in progress
    //         - False when the game is not in progress and modifications shouldn't be allowed
    _ensure_game_is_in_progress = () => {
        // start the game if it hasn't been started yet
        if (this.gameStorage.get_game_state() === 'ready') this.gameStorage.set_game_state('in_progress');
        // dont allow any cell changes when the game is over
        if (this.gameStorage.get_game_state() === 'in_progress') return true;
        return false;
    }

    // adds a number to the revealed_empty_cell_count
    _add_revealed_empty_cell_count = (addend) => {
        const revealedEmptyCellCount = this.gameStorage.get_revealed_empty_cell_count();
        this.gameStorage.set_revealed_empty_cell_count(revealedEmptyCellCount + addend);
        return this;
    }

    // set the game state to 'win' when all cells except mines are revealed
    _handle_win_condition = () => {
        const totalCellCount = this.gameStorage.get_total_cell_count();
        const mineCount = this.gameStorage.get_mine_count();
        const revealedEmptyCellCount = this.gameStorage.get_revealed_empty_cell_count();
        if ((totalCellCount - mineCount) === revealedEmptyCellCount) {
            this.gameStorage.set_game_state('win')
        }
        return this;
    }
}

export default PlayerActionStrategy;
