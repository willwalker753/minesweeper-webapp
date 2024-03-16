class BoardPlayerActionInterface {
    /*
    generates and stores a new game in board storage
    difficulty (string) 'easy', 'medium', 'hard'
    returns this
    */
    new_game = (difficulty) => {

    }

    /*
    handle the logic for playing a cell
    returns object 
        {
            'game_state': 'in_progress', // 'win', 'mine_hit', 'in_progress'
        }
    */
    play_cell = (x, y) => {

    }

    /*
    cycles the cell's marking each time it is called
        cycle order: null --> 'flag' --> 'question'
    returns this
    */
    cycle_cell_mark = (x, y) => {

    }
}

export default BoardPlayerActionInterface;
