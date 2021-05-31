import React from 'react';
import { Card } from '../card/Card';
import { CardLast } from '../card/CardLast';
import { useSelector } from 'react-redux';
import { selectList, selectStatus, selectModaleIndex } from '../../slices/searchSlice';
import { ModaleCard } from '../modaleCard/ModaleCard';
import styles from './ListCards.module.css';

export function ListCards() {
    const list = useSelector(selectList);
    const status = useSelector(selectStatus);
    const modateIndex = useSelector(selectModaleIndex);
    return (
        <div className={styles.container}>
            {
                list.map((card, index) => {
                    if ((index + 1) === list.length && status === 'idle' && (index + 1) % 100 === 0) {
                        return (<CardLast key={index} index={index} card={card} page={(((index + 1) - (index + 1) % 100) / 100) + 1} />)
                    } else {
                        return (<Card key={index} index={index} card={card} />)
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
            {
                modateIndex >= 0 &&
                <ModaleCard index={modateIndex}/>
            }
        </div>
    );
}