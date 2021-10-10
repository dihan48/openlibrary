import React from 'react';
import { useDispatch } from 'react-redux';
import { setModaleIndex } from '../../slices/searchSlice';
import styles from './Card.module.css';

export function CardBody(props) {
    return (
        <>
            <div className={styles.cover}>
                {
                    props?.card?.cover_i && props.card.cover_i !== -1
                        ? <img src={`https://covers.openlibrary.org/b/id/${props?.card?.cover_i}-M.jpg`} alt="" className={styles.image} />
                        :
                        <div className={styles.no_image}>
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    {props?.card?.title}
                                </div>
                                <div className={styles.author}>
                                    {
                                        props?.card?.author_name?.map((item, i) =>
                                            <span className={styles.line_text} key={i}>
                                                {item}
                                            </span>
                                        )
                                        ||
                                        <span className={styles.line_text}>
                                            "Unknown author"
                                        </span>
                                    }
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
                    Author:&nbsp;
                    {
                            props?.card?.author_name?.map((item, i) =>
                                <span className={styles.line_text} key={i}>
                                    {item}
                                </span>
                            )
                            ||
                            <span className={styles.line_text}>
                                "Unknown author"
                            </span>
                        }
                </div>
            </div>
        </>
    );
}

export function Card(props) {
    const dispatch = useDispatch();
    return (
        <div className={styles.container} onClick={() => dispatch(setModaleIndex(props.index))}>
            <CardBody {...props} />
        </div>
    );
}