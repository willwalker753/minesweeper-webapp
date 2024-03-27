import React from 'react';
import BannerActionRow from './BannerActionRow';
import NewGameButton from '../NewGameButton/NewGameButton';

const GameActionRow = ({
    onStartNewGame=()=>null,
}) => {

    return (
        <BannerActionRow
            actions={[
                {
                    tileWidth: 3,            
                    component: <NewGameButton onClick={onStartNewGame} />
                },
            ]}
        />
    )
}

export default GameActionRow;