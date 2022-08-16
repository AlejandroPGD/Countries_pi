import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getActivities, getCountries } from '../../actions';
import styles from "./Landing.module.css"

function Landing() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivities());
        dispatch(getCountries({
            name: "",
            page: 0,
            order: "ASC",
            filter: "",
            typeOrder: "name",
            limit: 9,
            wait: false,
            activity: "",
        }));
    }, [dispatch]);


    return (
        <div className={styles.landing}>
            <div className={styles.bkg}>
                <div className={styles.container}>
                    <div className={styles.buttonContainer}>
                        <NavLink style={{ textDecoration: 'none' }} to='/home'>
                            <button className={styles.btn}> Ingresar</button>
                        </NavLink>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default Landing