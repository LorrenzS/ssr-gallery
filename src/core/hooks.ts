import { useEffect, useRef } from "react";

export const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export const useOutsideClick = (ref: any, callback: () => void): void => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
        callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
        document.removeEventListener('click', handleClick);
        };
    });
};