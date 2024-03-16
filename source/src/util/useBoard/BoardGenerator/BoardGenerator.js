import BoardGeneratorInterface from './BoardGeneratorInterface';

class BoardGenerator extends BoardGeneratorInterface {
    constructor(boardStorage) {
        super();
        this.boardStorage = boardStorage;
    }

    generate_custom = (rowCount, colCount, mineCount) => {
        this.boardStorage.reset()
        this.boardStorage.create_cells(rowCount, colCount);
        // randomize the positions of the mines   
        for (let m=0; m<mineCount; m++) {
            const x = Math.floor(Math.random() * colCount);
            const y = Math.floor(Math.random() * rowCount);
            this.boardStorage.set_cell_type(x, y, 'mine');
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