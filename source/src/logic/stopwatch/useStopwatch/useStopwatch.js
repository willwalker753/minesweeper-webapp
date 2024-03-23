import { useState, useEffect } from 'react';

// custom hook for managing a stopwatch
const useStopwatch = () => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const start = () => {
        // dont start the stopwatch if it is already running
        if (startTime) return;
        setStartTime(new Date());
    }

    const stop = () => {
        setStartTime(null);
    }

    const reset = () => {
        setStartTime(null);
        setElapsedSeconds(0);
    }

    // update elapsed seconds every second
    useEffect(() => {
        // if there is no start time, then dont update elapsed seconds
        if (!startTime) return;

        const interval = setInterval(() => {
            // calculate the number of seconds since the timer was started
            const newElapsedSeconds = Math.floor((new Date() - startTime) / 1000);
            setElapsedSeconds(newElapsedSeconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return [
        elapsedSeconds,
        start,
        stop,
        reset
    ]
}

export default useStopwatch;
