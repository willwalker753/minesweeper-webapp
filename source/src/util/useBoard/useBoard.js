import { useState, useMemo, useEffect } from 'react';
import BoardStorage from './BoardStorage/BoardStorage';
import BoardGenerator from './BoardGenerator/BoardGenerator';

/*
this hook is the glue between the minesweeper classes and react
it instantiates the classes and converts the storage to a react state
*/
const useBoard = ({
    // the rows state is external because react doesn't like propagating state updates for large objects (even when using structured clone)
    onRowsChange = (rows) => console.log('here') 
} = {}) => {
    const [mineCount, setMineCount] = useState(0);
    const [markedCount, setMarkedCount] = useState(0);
    
    console.log(onRowsChange)
    const boardStorage = useMemo(() => new BoardStorage(onRowsChange, setMineCount, setMarkedCount), []);
    const boardGenerator = useMemo(() => new BoardGenerator(boardStorage), []);


/*

the issue is not with react state
it is because the hook is called twice and instantiates the classes twice (meaning when the board is generated, that storage and callback are seperate and do not go to the board component)
need to 'globally' instantiate the classes and move the rows state back to this component
after that i need to register 
    nevermind, i should probably get rid of the hook and move this hook logic to the Minesweeper parent component, then just directly pass down stuff

*/



    return {
        generate_board_template: boardGenerator.generate_template
    }
}

export default useBoard;