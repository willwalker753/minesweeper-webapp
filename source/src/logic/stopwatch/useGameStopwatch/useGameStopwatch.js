import { useEffect } from 'react';
import useStopwatch from '../useStopwatch/useStopwatch';

// custom hook to handle the stopwatch in a minesweeper game
const useGameStopwatch = (
    gameState // (string) the game_state from GameStorageInterface 
) => {
    const [elapsedSeconds, startStopwatch, stopStopwatch, resetStopwatch] = useStopwatch();

    useEffect(() => {
        console.log(gameState)

        // todo next:
        //  the initializing game state is not propagating because it is only set for a couple ms 
        //  i need to check that the set state call is actually happening.
        //  if it is, then accomplish it in a different way, like another game state value for board 'unchanged' or 'initialized'

        if (gameState === 'initializing') {
            resetStopwatch();
            return;
        }
        if (gameState === 'in_progress') {
            startStopwatch();
            return;
        }
        if (gameState === 'win' || gameState === 'lose') {                
            stopStopwatch();
            return;
        }
    }, [gameState]);

    return [
        elapsedSeconds
    ]
}

export default useGameStopwatch;
