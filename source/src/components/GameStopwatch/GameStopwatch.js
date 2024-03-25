import React, { useMemo } from 'react';

const GameStopwatch = ({
    gameElapsedSeconds=0
}) => {
    const gameTimeStr = useMemo(() => {
        const minutes = Math.floor(gameElapsedSeconds / 60);
        const seconds = gameElapsedSeconds % 60;
        // add leading zeros to the time (e.g. 0:1 becomes 00:01)
        return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    }, [gameElapsedSeconds])

    return (
        <div>
            {gameTimeStr}
        </div>
    );
};

export default GameStopwatch;