import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectList, selectModaleIndex, setModaleIndex } from '../../slices/searchSlice';
import styles from './ModaleCard.module.css';

export function ModaleCard(props) {
    const modaleindex = useSelector(selectModaleIndex);
    const card = useSelector(selectList)?.[modaleindex];
    const dispatch = useDispatch();
    return typeof card === "object" && card !== null && (
        <div
            className={styles.container}
            onClick={(e) => e.target.contains(e.currentTarget) && dispatch(setModaleIndex(-1))}
        >
            <div className={styles.card}>
                <div className={styles.card_close} onClick={() => dispatch(setModaleIndex(-1))}> ✖ </div>
                <div className={styles.cover}>
                    {
                        card?.cover_i && card.cover_i !== -1
                            ? <img src={`https://covers.openlibrary.org/b/id/${card?.cover_i}-M.jpg`} alt="" className={styles.image} />
                            :
                            <div className={styles.no_image}>
                                <div className={styles.info}>
                                    <div className={styles.title}>
                                        {card?.title}
                                    </div>
                                    <div className={styles.author}>
                                        {
                                            card?.author_name?.map((item, i) =>
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
                    <div className={styles.text}>
                        Title:
                        <span className={styles.line_text}>
                            {card?.title}
                        </span>
                    </div>
                    <div className={styles.text}>
                        Author:
                        {
                            card?.author_name?.map((item, i) =>
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
                    <div className={styles.text}>
                        Publish date:
                        {
                            card?.publish_date?.map((item, i) =>
                                <span className={styles.line_text} key={i}>
                                    {item}
                                </span>
                            )
                        }
                    </div>
                    <div className={styles.text}>
                        Publisher:
                        {
                            card?.publisher?.map((item, i) =>
                                <span className={styles.line_text} key={i}>
                                    {item}
                                </span>
                            )
                        }
                    </div>
                    <div className={styles.text}>
                        ISBN:
                        {
                            card?.isbn?.map((item, i) =>
                                <span className={styles.line_text} key={i}>
                                    {item}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}