import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSearch,
    nextPage,
    setStatus
} from '../../slices/searchSlice';
import { CardBody } from './Card';
import styles from './Card.module.css';

function useOnScreen(ref, page) {
    const dispatch = useDispatch();
    const value = useSelector(selectSearch);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting) {
                dispatch(setStatus('request'));
                dispatch(nextPage(value, page)); 
            }
        }
    );

    useEffect(() => {
        observer.observe(ref.current)
        return () => { observer.disconnect() }
    }, []);
}

export function CardLast(props) {
    const ref = useRef();
    useOnScreen(ref, props.page);
    return (
        <div className={styles.container} ref={ref}>
            <CardBody {...props} />
        </div>
    );
}