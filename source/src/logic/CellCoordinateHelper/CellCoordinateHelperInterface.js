class CellCoordinateHelperInterface {
    /*
    get the coordinates of the cells around a given coord (8 cells in total)
    centerX (number) x coord 
    centerX (number) y coord 

    returns array of coord pairs
        e.g. [[x,y], [0,1], ...etc]
    */
    get_surrounding_coord_pairs = (centerX, centerY) => {
        throw new Error('get_surrounding_coord_pairs is not implemented')
    }
}

export default CellCoordinateHelperInterface;