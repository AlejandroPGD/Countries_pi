import React from "react";
import styles from "./CountryCard.module.css"

export default function CountryCard({ name, flag, region, sightseeings }) {
    //console.log(sightseeings[0].name)
    return (
        <div className={`${styles.card}`}>
            <img src={flag} alt={name}></img>
            <div>
                <h5>{name}</h5>
                <h5>{region}</h5>
                <h5>{sightseeings[0].name}</h5>

            </div>
        </div>
    )
}