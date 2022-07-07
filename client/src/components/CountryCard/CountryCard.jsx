import React from "react";
import styles from "./CountryCard.module.css"

export default function CountryCard({ name, flag, region, sightseeings }) {
    //console.log(sightseeings[0].name)
    return (
        <div className={styles.cardContainer}>
            <img src={flag} alt={name}></img>
            <div>
                <h3>País: {name}</h3>
                <h5>Continente: {region}</h5>
                <div>Actividades Turísticas: {sightseeings?.map(c => <div key={c.id}><prev>{c.name}. </prev></div>)}</div>

            </div>
        </div>
    )
}