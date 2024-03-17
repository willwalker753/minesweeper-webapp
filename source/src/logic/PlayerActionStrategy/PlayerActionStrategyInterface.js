class PlayerActionStrategyInterface {
    /*
    generates and stores a new game in board storage
    difficulty (string) 'easy', 'medium', 'hard'
    returns this
    */
    new_game = (difficulty) => {
        throw new Error('new_game is not implemented');
    }

    /*
    handle the logic for playing a cell
    returns this
    */
    reveal_cell = (x, y) => {
        throw new Error('reveal_cell is not implemented');
    }

    /*
    cycles the cell's marking each time it is called
        cycle order: null --> 'flag' --> 'question'
    returns this
    */
    cycle_cell_mark = (x, y) => {
        throw new Error('cycle_cell_mark is not implemented');
    }
}

export default PlayerActionStrategyInterface;
