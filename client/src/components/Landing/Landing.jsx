import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Landing.module.css"

function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.bkg}>
                <div className={styles.container}>
                    <div className={styles.buttonContainer}>
                        <NavLink to='/home'>
                            <button className={styles.btn}> Ingresar</button>
                        </NavLink>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default Landing