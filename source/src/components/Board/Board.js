import React, { useState, useEffect } from 'react';
import useBoard from '../../util/useBoard/useBoard';
import './board.css';

const Board = ({
    
}) => {
    const [rows, setRows] = useState([]);

    useBoard({ onRowsChange: (newRows) => {
            console.log(newRows)
            setRows(newRows);
        }
    });

    useEffect(() => {
        console.log('Rows updated:', rows);
    }, [rows]);

    return (
        <div className='board'>
            <div className='board-rows'>
                {rows.map((row, rIndex) => {
                    return (
                        <div className='board-row' key={rIndex}>
                            {row.map((cell, cIndex) => {
                                return (
                                    <div className='board-cell' key={cIndex}>
                                        {cell.cell_type}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Board;