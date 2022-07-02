import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../../actions';

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
        <div>
            <img src={country.flag} alt={country.name}></img>
            <h1>{country.name}</h1>
            <h2>{country.id}</h2>
            <h2>Continente: {country.region}</h2>
            <h2>Capital: {country.capital}</h2>
            <h2>Subregión: {country.subregion}</h2>
            <h2>Área: {country.area}</h2>
            <h2>Población{country.population}</h2>
            <h2>Actividades Turísticas{country.sightseeings ? <div>
                <div>{country.sightseeings[0].name}</div>
                <div>Dificultad: {country.sightseeings[0].difficulty}</div>
                <div>Duración: {country.sightseeings[0].duration}</div>
                <div>Temporada: {country.sightseeings[0].season}</div>
            </div> : null}</h2>
            <button onClick={e => handleBack(e)}>
                Atras
            </button>
        </div>
    )
}

export default Detail