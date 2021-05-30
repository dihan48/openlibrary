import React from 'react';
import { Card } from '../card/Card';
import { CardLast } from '../card/CardLast';
import { useSelector } from 'react-redux';
import { selectList } from '../../slices/searchSlice';
import { selectStatus } from '../../slices/searchSlice';
import styles from './ListCards.module.css';

export function ListCards() {
    const list = useSelector(selectList);
    const status = useSelector(selectStatus);
    return (
        <div className={styles.container}>
            {
                list.map((card, index) => {
                    if ((index + 1) === list.length && status === 'idle' && (index + 1) % 100 === 0) {
                        return (<CardLast key={index} card={card} page={(((index + 1) - (index + 1) % 100) / 100) + 1} />)
                    } else {
                        return (<Card key={index} card={card} />)
                    }
                })
            }
            {
                status === 'loading' &&
                <div className={styles.wrapper_loader}>
                    <div className={styles.loader} />
                </div>
            }
            {
                status === 'error' &&
                <>
                    Ошибка!
                </>
            }
        </div>
    );
}