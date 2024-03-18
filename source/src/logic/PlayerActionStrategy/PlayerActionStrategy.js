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
        const cell = this.gameStorage.get_cell(x, y);

        // if the cell is already revealed, then dont reveal it again  
        if (cell.is_hidden === false) return;

        // if the cell is marked, then dont reveal it
        if (cell.mark_type !== null) return;

        // if the cell is a mine, then player loses the game
        if (cell.cell_type === 'mine') {
            this.gameStorage.set_cell_is_hidden(x, y, false);
            this.gameStorage.set_game_state('mine_hit');
            /*
                still need to do the game win/lose stuff
                when the player hits a mine, i want that mine to explode and cause surrounding squares to be revealed (like a blast radius)
                    then when that "blast" reaches other mines, they should also explode (smaller explosion)
                to know when the game wins, there should be a count for the revealed cells, if revealed_cell_count + mine_count = total_cells then win
            */
           return;
        }

        // if the cell has any surrounding mines, then only reveal that cell
        if (cell.surrounding_mine_count > 0) {
            this.gameStorage.set_cell_is_hidden(x, y, false);
            return;
        }

        // otherwise the cell has no surrounding mines, so reveal the group of empty cells that it is in
        let revealedMarkedCellCount = 0;
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
                
                // if the cell has no surrounding mines, then try to reveal its surrounding cells
                if (curCell.surrounding_mine_count === 0) {
                    cellRevealQueue.push([curX, curY])
                }
            }       
        }
        // const _reveal_surrounding_cells = (centerX, centerY) => {
        //     const cellSurCoordPairs = this.cellCoordinateHelper.get_surrounding_coord_pairs(centerX, centerY);
        //     const cellGroupCoordPairs = [[centerX, centerY], ...cellSurCoordPairs];
        //     cellGroupCoordPairs.forEach(([curX, curY]) => {
        //         const curCell = this.gameStorage.get_cell(curX, curY);

        //         // if the cell coordinate does not exist, then skip it
        //         if (curCell === undefined) return;

        //         // if the cell is already revealed, then don't reveal it and don't propagate to surrounding cells
        //         if (curCell.is_hidden === false) return;
                
        //         // reveal the cell
        //         this.gameStorage.set_cell_is_hidden(curX, curY, false);
        //         if (curCell.mark_type !== null) revealedMarkedCellCount++;
                
        //         // if the cell has no surrounding mines, then try to reveal its surrounding cells
        //         if (curCell.surrounding_mine_count === 0) {
        //             _reveal_surrounding_cells(curX, curY);
        //         }
        //     })            
        // }
        // _reveal_surrounding_cells(x, y);
        // subtract the revealed marked cells from the the marked cell count 
        const curMarkedCellCount = this.gameStorage.get_marked_cell_count();
        this.gameStorage.set_marked_cell_count(curMarkedCellCount - revealedMarkedCellCount);

        return this;
    }

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
