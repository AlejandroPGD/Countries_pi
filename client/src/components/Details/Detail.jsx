import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../../actions';
import styles from "./Detail.module.css"

function Detail(props) {
    // console.log(props.match.params.id)
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch]);

    const country = useSelector(state => state.details);
    const handleBack = (event) => {
        props.history.goBack();
    }

    return (
        <div className={styles.details}>
            <div className={styles.bkg}>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <img src={country.flag} alt={country.name}></img>
                    </div>
                    <div className={styles.descContainer} >
                        <div>
                            <h1><pre>   {country.name} {country.id}</pre></h1>
                            <h2><pre>   Capital: {country.capital}              Área: {country.area}   </pre></h2>
                            <h2><pre>   Continente: {country.region}            Población: {country.population}   </pre></h2>
                            <h2><pre>   Subregión: {country.subregion}</pre></h2>
                        </div>
                    </div>
                    <div className={styles.actContainer}>
                        <h1>Actividades Turísticas{country.sightseeings ? <div>

                            {
                                country.sightseeings.map(e => <div key={e.name}><pre>{e.name} <br />Dificultad: {e.difficulty}<br />Duración: {e.duration}<br />Temporada: {e.season}</pre></div>)
                            }

                        </div> : null}</h1>

                    </div>
                    <div className={styles.btnContainer}>
                        <button className={styles.btn} onClick={e => handleBack(e)}>
                            Atras
                        </button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Detail