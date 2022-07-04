import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activitiesUpdate, getAllCountries, setActivities } from '../../actions';
import styles from "./Activity.module.css"

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
    return (<div className={styles.activity}>
        <div className={styles.bkg}>
            <form className={styles.container} onSubmit={handleSubmit}>

                <div className={styles.nameContainer}>
                    <label htmlFor="name"><h1><pre> Nombre:      </pre></h1></label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                    />
                    {!error.errorName ? <h2><pre>    {null}                                          </pre></h2> : <h2><pre>          {error.errorName}             </pre></h2>}
                </div>
                <div className={styles.difficultyContainer}>
                    <label htmlFor="difficulty"><h1><pre> Dificultad:  </pre></h1></label>
                    <input
                        type="number"
                        name="difficulty"
                        value={input.difficulty}
                        onChange={handleInputChange}
                    />
                    {!error.errorDifficulty ? <h2><pre>    {null}                                          </pre></h2> : <h2><pre>          {error.errorDifficulty}             </pre></h2>}
                </div>
                <div className={styles.durationContainer}>
                    <label htmlFor="duration"><h1><pre> Duracion:    </pre></h1></label>
                    <input
                        type="number"
                        name="duration"
                        value={input.duration}
                        onChange={handleInputChange}
                    />
                    {!error.errorDuration ? <h2><pre>    {null}                                          </pre></h2> : <h2><pre>          {error.errorDuration}     </pre></h2>}
                </div>
                <div className={styles.seasonContainer}>
                    <label htmlFor="season"><h1><pre> Temporada:      </pre></h1></label>
                    <select name="season" value={input.season} onChange={(e) => handleInputChange(e)}>
                        <option value=""></option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno"> Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                    {!error.errorSeason ? <h2><pre>    {null}                                            </pre></h2> : <h2><pre>            {error.errorSeason}      </pre></h2>}
                </div>
                <div className={styles.countriesContainer}>
                    <label htmlFor="paises"><h1><pre> Paises: </pre></h1> </label>
                    <select name="paises" value={input.paises} onChange={(e) => handleInputChange(e)}>
                        <option value=""></option>
                        {
                            input.allNames?.map(e => <option key={e.id} value={e.id} >{e.name}</option>)
                        }

                    </select>
                    {!error.errorPaises ? <h2><pre>    {null}                                   </pre></h2> : <h2><pre>   {error.errorPaises}   </pre></h2>}
                </div>
                <div className={styles.countriesSelectedContainer}>
                    {
                        input.countryId?.map(e => <div className={styles.etiButton} key={e}>
                            <label><pre> {e} </pre></label>
                            <button onClick={e => handleClose(e)} name={e}>X</button>
                            <br></br>
                        </div>
                        )
                    }
                </div>
                <div className={styles.backButton}>
                    <button className={styles.btn} onClick={e => handleBack(e)}>
                        Atras
                    </button>
                </div>

                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" disabled={error.errorName || error.errorDifficulty || error.errorDuration || error.errorSeason || error.errorPaises}>
                        Crear nueva actividad turística
                    </button>

                </div>

            </form>
        </div>
    </div>


    )
}

export default Activity