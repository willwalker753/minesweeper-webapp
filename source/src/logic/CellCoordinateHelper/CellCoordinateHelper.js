import CellCoordinateHelperInterface from './CellCoordinateHelperInterface';

class CellCoordinateHelper extends CellCoordinateHelperInterface {
    constructor() {
        super();
    }

    get_surrounding_coord_pairs = (centerX, centerY) => {
        return [
            [centerX, centerY + 1], // n
            [centerX + 1, centerY + 1], // ne
            [centerX + 1, centerY], // e
            [centerX + 1, centerY - 1], // se
            [centerX, centerY - 1], // s
            [centerX - 1, centerY - 1], // sw
            [centerX - 1, centerY], // w
            [centerX - 1, centerY + 1], // nw
        ];
    }
}

export default CellCoordinateHelper;