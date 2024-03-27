import React from 'react';
import Button from '../Button/Button';

const NewGameButton = ({ onClick }) => {
    return (
        <Button 
            shape='rect'
            styleType='warning'
            onClick={(e) => onClick()}
        >
            New Game
        </Button>
    )
}

export default NewGameButton;