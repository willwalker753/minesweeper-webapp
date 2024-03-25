import React, { useMemo } from 'react';

const CellActionSelector = ({
    cellLeftClickActionType, // 'reveal' or 'cycle_cell_mark'
    onCellLeftClickActionTypeChange=(newCellLeftClickActionType)=>null
}) => {
    
    const cycleLeftClickAction = () => {
        const nextActionMap = {
            reveal: 'cycle_cell_mark',
            cycle_cell_mark: 'reveal',
        }
        onCellLeftClickActionTypeChange(nextActionMap[cellLeftClickActionType]);
    }

    const buttonChildren = useMemo(() => {
        const actionChildrenMap = {
            reveal: 'shovel', // TODO: find icons later
            cycle_cell_mark: 'flag',
        }
        return actionChildrenMap[cellLeftClickActionType];
    }, [cellLeftClickActionType])
    
    return (
        <button
            onClick={cycleLeftClickAction}
        >
            {buttonChildren}
        </button>
    )
}

export default CellActionSelector;