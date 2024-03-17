import BoardGeneratorInterface from './BoardGeneratorInterface';

class BoardGenerator extends BoardGeneratorInterface {
    constructor(gameStorage) {
        super();
        this.gameStorage = gameStorage;
    }

    generate_custom = (rowCount, colCount, mineCount) => {
        this.gameStorage.reset()
        this.gameStorage.initialize_board_rows(rowCount, colCount);
        // randomize the positions of the mines   
        for (let m=0; m<mineCount; m++) {
            const x = Math.floor(Math.random() * colCount);
            const y = Math.floor(Math.random() * rowCount);
            this.gameStorage.set_cell_type(x, y, 'mine');
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