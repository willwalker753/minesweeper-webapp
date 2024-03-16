class BoardStorageInterface {
    /*
    reset all to default/unset values
    returns this
    */
    reset = () => {
        throw new Error('reset is not implemented')
    }

    /*
    initializes the cells in the board so they can be read or set
    returns this
    */
    create_cells = (rowCount, colCount) => {
        throw new Error('create_cells is not implemented')
    }

    /*
    can only be called after calling create above
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

    returns the cell object 
        e.g. {
            'cell_type': 'empty',
            'is_hidden': true,
            'mark_type': 'question'
        }
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
    set the number of flagged cells to an int
    returns this
    */
    set_marked_count = (count) => {
        throw new Error('set_marked_count is not implemented')
    }

    /*
    returns int
    */
    get_marked_count = () => {
        throw new Error('get_marked_count is not implemented')
    }
}

export default BoardStorageInterface;
