import React, { useMemo } from 'react';

// displays the remaining number of cells to be marked (to equal the number of mines)
// this doesn't mean the correct cells are marked
const MarkedCellCountdown = ({ markedCellCount, mineCount }) => {
    const remainingMarkCount = useMemo(() => {
        const newRemainingMarkCount = mineCount - markedCellCount;
        if (!newRemainingMarkCount || newRemainingMarkCount < 0) return 0;
        return newRemainingMarkCount;
    }, [markedCellCount, mineCount]);

    return (
        <div>
            {remainingMarkCount}
        </div>
    )
}

export default MarkedCellCountdown;