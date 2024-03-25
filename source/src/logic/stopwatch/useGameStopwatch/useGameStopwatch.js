import { useEffect } from 'react';
import useStopwatch from '../useStopwatch/useStopwatch';

// custom hook to handle the stopwatch in a minesweeper game
const useGameStopwatch = (
    gameState // (string) the game_state from GameStorageInterface 
) => {
    const [elapsedSeconds, startStopwatch, stopStopwatch, resetStopwatch] = useStopwatch();

    useEffect(() => {
        if (gameState === 'initializing' || gameState === 'ready') {
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
