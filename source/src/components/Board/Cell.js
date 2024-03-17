import React from 'react';
import './cell.css';

const baseClassName = 'board-cell';

const EmptyCell = ({ ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-empty`} {...rest}></div>
)

const NumberCell = ({ number, ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-number`} {...rest}>
        {number}
    </div>
)

const HiddenCell = ({ ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-hidden`} {...rest}></div>
)

const FlaggedCell = ({ ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-flagged`} {...rest}>
        🚩
    </div>
)

const QuestionCell = ({ ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-question`} {...rest}>
        ?
    </div>
)

const MineCell = ({ ...rest }) => (
    <div className={`${baseClassName} ${baseClassName}-mine`} {...rest}>
        💣
    </div>
)

export {
    EmptyCell,
    NumberCell,
    HiddenCell,
    FlaggedCell,
    QuestionCell,
    MineCell
}