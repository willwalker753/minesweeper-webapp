import BoardGeneratorInterface from './BoardGeneratorInterface';

class BoardGenerator extends BoardGeneratorInterface {
    constructor(gameStorage, cellCoordinateHelper) {
        super();
        this.gameStorage = gameStorage;
        this.cellCoordinateHelper = cellCoordinateHelper;
    }

    generate_custom = (rowCount, colCount, mineCount) => {
        // enforce that the mine count is not greater than the number of cells
        // if mines was greater then an infinite loop would happen when trying to randomize the mine position
        if (mineCount > (rowCount * colCount)) {
            throw new Error('mine count cannot be greater than the total cell count')
        }

        this.gameStorage.reset()
        this.gameStorage.initialize_board_rows(rowCount, colCount);
        
        for (let m=0; m<mineCount; m++) {
            // add a mine to a random cell
            const _genMineCoordPair = () => {
                const mineX = Math.floor(Math.random() * colCount);
                const mineY = Math.floor(Math.random() * rowCount);

                // if the cell is already a mine, then try a different cell
                const mineCell = this.gameStorage.get_cell(mineX, mineY);
                if (mineCell.cell_type === 'mine') {
                    return _genMineCoordPair();
                }

                return [mineX, mineY];
            }
            const [mineX, mineY] = _genMineCoordPair();
            this.gameStorage.set_cell_type(mineX, mineY, 'mine');

            // loop through the mine's surrounding cells and increment their surrounding mine count
            const mineSurCoordPairs = this.cellCoordinateHelper.get_surrounding_coord_pairs(mineX, mineY);
            mineSurCoordPairs.forEach(([surX, surY]) => {
                const cell = this.gameStorage.get_cell(surX, surY) || { surrounding_mine_count: 0 };
                // game storage prevents errors from trying to update a cell that doesn't exist (outside the game board)
                this.gameStorage.set_cell_surrounding_mine_count(surX, surY, cell.surrounding_mine_count + 1);
            });
        }
        return this;
    }

    generate_template = (difficulty) => {
        const difficultyMap = {
            easy: {
                row_count: 9,
                col_count: 9,
                mine_count: 10,
            },
            medium: {
                row_count: 16,
                col_count: 16,
                mine_count: 40,
            },
            hard: {
                row_count: 16,
                col_count: 30,
                mine_count: 99,
            },
        }
        const {row_count, col_count, mine_count} = difficultyMap[difficulty.toLowerCase()];
        this.generate_custom(row_count, col_count, mine_count);
        return this;
    }
}

export default BoardGenerator;