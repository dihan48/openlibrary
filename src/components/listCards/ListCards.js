import React from 'react';
import { Card } from '../card/Card';
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
                status === 'idle'
                ?
                list.map((card, index) => <Card key={index} card={card}/>)
                :
                <div className={styles.loader}>
                    Loading...
                </div>
            }
        </div>
    );
}