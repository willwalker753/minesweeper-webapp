import React from 'react';
import {
    EmptyCell,
    NumberCell,
    HiddenCell,
    FlaggedCell,
    QuestionCell,
    MineCell,
} from './Cell';
import './board.css';

// displays the minesweeper board
const Board = ({
    boardRows = [], // board rows from GameStorage
    onCellReveal = (x, y) => null,
    onCycleCellMark = (x, y) => null,
    cellLeftClickActionType='reveal', // 'reveal' or 'cycle_cell_mark'
}) => {

    const handleCellClick = (e, x, y) => {
        // if left click, then play the cell
        if (e.type === 'click') {
            if (cellLeftClickActionType === 'reveal') return onCellReveal(x, y);
            if (cellLeftClickActionType === 'cycle_cell_mark') return onCycleCellMark(x, y);
        }
        // if right click, then flag the cell
        if (e.type === 'contextmenu') {
            e.preventDefault();
            return onCycleCellMark(x, y);
        }
    }

    const cellContentDecision = (
        { cell_type, is_hidden, mark_type, surrounding_mine_count }, 
        cellProps
    ) => {
        const renderHiddenCell = () => {
            if (mark_type === null) return <HiddenCell {...cellProps} />;
            if (mark_type === 'flag') return <FlaggedCell {...cellProps} />;
            if (mark_type === 'question') return <QuestionCell {...cellProps} />;
        }
        const renderRevealedCell = () => {
            if (cell_type === 'mine') return <MineCell {...cellProps} />;
            if (surrounding_mine_count > 0) return <NumberCell number={surrounding_mine_count} {...cellProps} />;
            return <EmptyCell {...cellProps} />
        }
        const isHiddenRenderFuncMap = {
            [true]: renderHiddenCell,
            [false]: renderRevealedCell
        }
        const cellContent = isHiddenRenderFuncMap[is_hidden]();
        return cellContent;
    }

    return (
        <div className='board'>
            <div className='board-rows'>
                {boardRows.map((row, y) => {
                    return (
                        <div key={y} className='board-row'>
                            {row.map((cell, x) => {
                                return cellContentDecision(
                                    cell,
                                    {
                                        key: x,
                                        onClick: (e) => handleCellClick(e, x, y),
                                        onContextMenu: (e) => handleCellClick(e, x, y)
                                    }
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