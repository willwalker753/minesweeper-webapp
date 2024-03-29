class GameStorageInterface {
    /*
    set the status of the game
    gameState (string)
        - 'initializing' setting up the game
        - 'ready' game is ready to be played and no moves have been made
        - 'in_progress' game is currently being played
        - 'win' won the game
        - 'lose' lost the game
    returns this
    */
    set_game_state = (gameState) => {
        throw new Error('set_game_state is not implemented')
    }

    /*
    returns string
    */
    get_game_state = () => {
        throw new Error('get_game_state is not implemented')
    }

    /*
    reset all to default/unset values
    returns this
    */
    reset = () => {
        throw new Error('reset is not implemented')
    }

    /*
    initializes the cells in the board so they can be read or set
    "cell" methods below should only be called after initialize_board_rows
    returns this
    */
    initialize_board_rows = (rowCount, colCount) => {
        throw new Error('initialize_board_rows is not implemented')
    }

    /*
    x (number) the cell x coordinate starting at 0
    y (number) the cell y coordinate starting at 0
    type (string) 'empty', 'mine'
    returns this
    */
    set_cell_type = (x, y, type) => {
        throw new Error('set_cell_type is not implemented')
    }

    /*
    x (number)
    y (number)
    isHidden (boolean) true when the cell has not been revealed yet
    returns this
    */
    set_cell_is_hidden = (x, y, isHidden) => {
        throw new Error('set_cell_is_hidden is not implemented')
    }

    /*
    x (number)
    y (number)
    markType (string) null, 'flag', 'question'
    returns this
    */
    set_cell_mark_type = (x, y, markType) => {
        throw new Error('set_cell_mark_type is not implemented')
    }

    /*
    x (number)
    y (number)
    surMineCount (number) 0 when there are no surrounding mines. up to 8 max
    returns this
    */
    set_cell_surrounding_mine_count = (x, y, surMineCount) => {
        throw new Error('set_cell_surrounding_mine_count is not implemented')
    }

    /*
    x (number)
    y (number)

    [if cell exists] returns the cell object
        e.g. {
            'cell_type': 'empty',
            'is_hidden': true,
            'mark_type': 'question',
            'surrounding_mine_count': 0
        }
    [if cell does not exist] returns undefined
    */
    get_cell = (x, y) => {
        throw new Error('get_cell is not implemented')
    }

    /*
    set the actual number of mines on the board to an int (not to be confused with the flag count)
    returns this
    */
    set_mine_count = (count) => {
        throw new Error('set_mine_count is not implemented')
    }

    /*
    returns int
    */
    get_mine_count = () => {
        throw new Error('get_mine_count is not implemented')
    }

    /*
    set the number of flagged/question cells to an int
    returns this
    */
    set_marked_cell_count = (count) => {
        throw new Error('set_marked_cell_count is not implemented')
    }

    /*
    returns int
    */
    get_marked_cell_count = () => {
        throw new Error('get_marked_cell_count is not implemented')
    }

    // set the number of revealed empty cells to an int
    // returns this
    set_revealed_empty_cell_count = (count) => {
        throw new Error('set_revealed_empty_cell_count is not implemented')
    }

    // returns int
    get_revealed_empty_cell_count = () => {
        throw new Error('get_revealed_empty_cell_count is not implemented')
    }

    // set the total number of cells in the board to an int
    // returns this
    set_total_cell_count = (count) => {
        throw new Error('set_total_cell_count is not implemented')
    }

    // returns int
    get_total_cell_count = () => {
        throw new Error('get_total_cell_count is not implemented')
    }
}

export default GameStorageInterface;
