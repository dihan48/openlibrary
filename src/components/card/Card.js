import React from 'react';
import styles from './Card.module.css';

export function CardBody(props) {
    return (
        <>
            <div className={styles.cover}>
                {
                    props?.card?.cover_i && props.card.cover_i !== -1
                        ? <img src={`http://covers.openlibrary.org/b/id/${props?.card?.cover_i}-M.jpg`} alt="" className={styles.image} />
                        :
                        <div className={styles.no_image}>
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    {props?.card?.title}
                                </div>
                                <div className={styles.author}>
                                    {props?.card?.author_name || "Unknown author"}
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    Title: {props?.card?.title}
                </div>
                <div className={styles.author}>
                    Author: {props?.card?.author_name || "Unknown author"}
                </div>
            </div>
        </>
    );
}

export function Card(props) {
    return (
        <div className={styles.container}>
            <CardBody {...props} />
        </div>
    );
}