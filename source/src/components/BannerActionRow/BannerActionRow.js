import React, { useMemo } from 'react';
import './bannerActionRow.css';

/* 
returns a horizontal banner containing the components from the actions list
props
    actions (array) example [
        { tile_width: 1, component: <button>Square Button</button> },
        { tile_width: 3, component: <button>Wide Button</button> },
    ]
*/
const BannerActionRow = ({
    actions=[]
}) => {
    const totalTileWidth = useMemo(() => {
        return actions.reduce((accumulator, curAction) => accumulator + curAction.tile_width, 0);
    }, [actions])

    return (
        <>
            <style>

            </style>
            <div className='bar'>
                <div className='bar-background' role='img' aria-label='Decorative banner'>
                    <img 
                        className='bar-end' 
                        src='/images/banner/banner-left-end.png'
                        alt=''
                    />
                    <div 
                        className='bar-connector' 
                    />
                    <img 
                        className='bar-end' 
                        src='/images/banner/banner-right-end.png'
                        alt=''
                    />
                </div>
                <div className='bar-content-container'>
                    {actions.map((action, index) => {
                        return (
                            // need to use bannerCarvedInsert 
                            <div className='bar-content-item' key={index}>
                                {action.component}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BannerActionRow;