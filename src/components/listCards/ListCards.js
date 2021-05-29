import React from 'react';
import { Card } from '../card/Card'
import styles from './ListCards.module.css';

export function ListCards() {
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    );
}