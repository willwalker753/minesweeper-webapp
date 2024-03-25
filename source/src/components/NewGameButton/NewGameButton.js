import React from 'react';

const NewGameButton = ({ onClick }) => {
    return (
        <button 
            onClick={(e) => onClick()}
        >
            New Game
        </button>
    )
}

export default NewGameButton;