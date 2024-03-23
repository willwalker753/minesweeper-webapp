import React from 'react';

const GameStopwatch = ({
    gameElapsedSeconds=0
}) => {
    return (
        <div>
            {gameElapsedSeconds}
        </div>
    );
};

export default GameStopwatch;