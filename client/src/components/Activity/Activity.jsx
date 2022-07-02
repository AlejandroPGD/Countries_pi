import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activitiesUpdate, getAllCountries, setActivities } from '../../actions';

function Activity(props) {
    const dispatch = useDispatch();
    const countriesName = useSelector((state) => state.allCountries);

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    useEffect(() => {

        setInput((prevInput) => {
            return {
                ...prevInput,
                allNames: countriesName,
            }
        })
    }, [countriesName]);


    const [error, setError] = useState({
        errorName: "",
        errorDifficulty: "",
        errorDuration: "",
        errorSeason: "",
        errorPaises: "",

    });

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: [],
        allNames: [],
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setActivities(input));
        dispatch(activitiesUpdate(true));
    }
    useEffect(() => {
        validate();
    }, [input.name, input.difficulty, input.duration, input.season, input.countryId]);

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            if (event.target.name === "paises") {

                return {
                    ...prevInput,
                    countryId: [...input.countryId, event.target.value],

                }
            }
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            }
        });
    }

    const validate = () => {
        let errorName = "";
        let errorDifficulty = "";
        let errorDuration = "";
        let errorSeason = "";
        let errorPaises = "";

        if (!/^\D{1,50}$/.test(input.name)) errorName = "Debe ingresar un nombre";
        if (!/^[1-5]{1}$/.test(input.difficulty)) errorDifficulty = "Debe ingresar entre 1-5";
        if (!/^\d{1,2}$/.test(input.duration)) errorDuration = "Debe ingresar cantidad de horas";
        if (input.season === "") errorSeason = "Debe seleccionar una temporada";
        if (!input.countryId.length) errorPaises = "Debe seleccionar al menos un país";

        setError((prevInput) => {
            return {
                errorName: errorName,
                errorDifficulty: errorDifficulty,
                errorDuration: errorDuration,
                errorSeason: errorSeason,
                errorPaises: errorPaises,
            }
        });

    }

    const handleClose = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                countryId: input.countryId?.filter(e => e !== event.target.name),

            }
        })
    }
    const handleBack = (event) => {
        props.history.goBack();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre: </label>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                />
                {!error.errorName ? null : <span>{error.errorName}</span>}
            </div>
            <div>
                <label htmlFor="difficulty">Dificultad: </label>
                <input
                    type="number"
                    name="difficulty"
                    value={input.difficulty}
                    onChange={handleInputChange}
                />
                {!error.errorDifficulty ? null : <span>{error.errorDifficulty}</span>}
            </div>
            <div>
                <label htmlFor="duration">Duracion: </label>
                <input
                    type="number"
                    name="duration"
                    value={input.duration}
                    onChange={handleInputChange}
                />
                {!error.errorDuration ? null : <span>{error.errorDuration}</span>}
            </div>
            <div>
                <label htmlFor="season">Temporada:   </label>
                <select name="season" value={input.season} onChange={(e) => handleInputChange(e)}>
                    <option value=""></option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value=" Invierno"> Invierno</option>
                    <option value="Primavera">Primavera</option>
                </select>
                {!error.errorSeason ? null : <span>{error.errorSeason}</span>}
            </div>
            <div>
                <label htmlFor="paises">Paises: </label>
                <select name="paises" value={input.paises} onChange={(e) => handleInputChange(e)}>
                    <option value=""></option>
                    {
                        input.allNames?.map(e => <option key={e.id} value={e.id} >{e.name}</option>)
                    }

                </select>
                {!error.errorPaises ? null : <span>{error.errorPaises}</span>}
            </div>
            <div>
                {
                    input.countryId?.map(e => <div key={e}>
                        <div>{e}</div>
                        <button onClick={e => handleClose(e)} name={e}>X</button>
                    </div>
                    )

                }
            </div>
            <button onClick={e => handleBack(e)}>
                Atras
            </button>

            <div>
                <input type="submit" value="Crear nueva actividad turística" disabled={error.errorName || error.errorDifficulty || error.errorDuration || error.errorSeason || error.errorPaises} />
            </div>
        </form>


    )
}

export default Activity