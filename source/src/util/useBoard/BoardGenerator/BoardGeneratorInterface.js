class BoardGenInterface {
    /*
    creates a new board and stores it in board storage
    rowCount (int)
    colCount (int) 
    mineCount (int)

    returns this
    */
    generate_custom = (rowCount, colCount, mineCount) => {
        throw new Error('generate_custom is not implemented')
    }

    /*
    creates a new board based on a preset difficulty and stores it in board storage
    difficulty (string) 'easy', 'medium', 'hard'
    returns this
    */
    generate_template = (difficulty) => {
        throw new Error('generate_template is not implemented')
    }
}

export default BoardGenInterface;