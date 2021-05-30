import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeSearch,
    selectSearch,
} from '../../slices/searchSlice';
import styles from './Header.module.css';

export function Header() {
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <form
                    className={styles.form}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.input}
                        onChange={(e) => dispatch(changeSearch(e.target.value))}
                        value={search}
                    />
                    <input type="submit" value="" className={styles.button} />
                </form>
            </div>
        </header>
    );
}