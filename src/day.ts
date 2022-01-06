import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

type State = 'initial' | 'wrong' | 'correct';

function randomDate(): number {
    const now = new Date();
    const firstDateOfYear = new Date(now.getFullYear(), 0, 1);
    const lastDateOfYear = new Date(now.getFullYear(), 11, 31);
    
    const min = firstDateOfYear.getTime();
    const max = lastDateOfYear.getTime();

    const time = Math.floor(Math.random() * (max - min + 1)) + min;

    return new Date(time).getTime();
}

function useDay() {
    const [state, setState] = useState<State>('initial');
    const [points, setPoints] = useLocalStorage('day/points', 0);
    const [rawDate, setRawDate] = useLocalStorage('day/current-date', randomDate);
    
    const date = new Date(rawDate);

    const guess = useCallback((day: number) => {
        const dayOfTheWeek = date.getDay();
        if (day === dayOfTheWeek) {
            setPoints(points => points + 1);
            setRawDate(randomDate);
            setState('correct');
        } else {
            setPoints(points => points - 1);
            setState('wrong');
        }
    }, [date]);

    return {
        points,
        date,
        state,
        guess,
    }
}

export default useDay;