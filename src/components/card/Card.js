import React from 'react';
import styles from './Card.module.css';

export function Card() {
    return (
        <div className={styles.container}>
            <img src="" alt="" className={styles.image}/>
            <div className={styles.title}>
                Название книги
            </div>
            <div className={styles.author}>
                Автор
            </div>
        </div>
    );
}