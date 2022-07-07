import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCountries, getActivities, activitiesUpdate } from '../../actions';
import CountryCard from '../CountryCard/CountryCard';
import SearchBar from '../SearchBar/SearchBar';
import styles from "./Home.module.css"

function Home() {
    const dispatch = useDispatch();
    const gState = useSelector((state) => state);


    const [input, setInput] = useState({

        name: gState.name,
        page: gState.page,
        order: gState.order,
        filter: gState.filter,
        typeOrder: gState.typeOrder,
        activities: gState.activities,
        limit: gState.limit,
        wait: false,
        activity: ""
    });

    const [fil, setFil] = useState({
        activityFilter: [],
    })



    useEffect(() => {
        dispatch(getCountries(input));
    }, [dispatch, input]);

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                name: gState.name,
            }
        })
    }, [gState.name]);

    let countriesFilter = gState.countries;

    useEffect(() => {
        countriesFilter = gState.countries;
        filtrar(input.activity);
    }, [gState.countries])

    //filtro en front
    useEffect(() => {
        dispatch(getActivities());
        dispatch(activitiesUpdate(false));
    }, [dispatch, gState.activitiesUpdate]);//cambiar por el select acualice activities en Activity.jsx



    const handleClick = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                name: "",
                page: 0,
                order: "ASC",
                filter: "",
                typeOrder: "name",
                limit: 9,
                wait: false,
                activity: "",
            }
        });
    }

    const prev = (e) => {

        e.preventDefault();
        if (input.page <= 0) {
            setInput((prevInput) => {
                return {
                    ...prevInput,
                    page: 0,
                }
            });
        } else {
            setInput((prevInput) => {
                return {
                    ...prevInput,
                    page: input.page - 9,
                }
            });
        };
        ;
    };

    const next = (e) => {

        e.preventDefault();
        if (gState.countries.length < 9) {
            return;
        } else {

            setInput((prevInput) => {
                return {
                    ...prevInput,
                    page: input.page + 9,
                }
            });
        };
    };

    const handleOnChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                page: 0,
                [event.target.name]: event.target.value,
            }
        });
    }


    const filtrar = (search) => {
        const arrayFil = countriesFilter.filter(e => e.sightseeings[0].name === search);
        const filt = arrayFil.slice(input.page, input.page + 9)
        setFil((prevInput) => {
            return {
                ...prevInput,
                activityFilter: filt,
            }
        })


    }

    const handleActivitiesChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            if (event.target.value === "") {
                return {
                    ...prevInput,
                    page: 0,
                    limit: 9,
                    wait: false,
                    activity: "",
                }
            } else {

                return {
                    ...prevInput,
                    page: 0,
                    limit: 300,
                    wait: true,
                    activity: event.target.value,
                }
            }
        });

    }

    const allActivities = useSelector((state) => state.activities);
    const allCountries = useSelector((state) => state.countries);

    //? *********************************************************************************
    //? *********************************************************************************
    //? *********************************************************************************
    //? *********************************************************************************

    return (
        <div className={styles.home}>
            <div className={styles.bkg}>
                <div className={styles.container}>
                    <div className={styles.linkContainer}>
                        <NavLink to='/activities'><h3>Crear Actividad Turística</h3></NavLink>
                    </div>
                    <div className={styles.searchContainer}>
                        <SearchBar />
                    </div>
                    <div className={styles.loadContainer}>
                        <button className={styles.btn} onClick={(event) => {
                            handleClick(event);
                        }}>Cargar Todos Los Países</button>
                    </div>
                    <div className={styles.filtContinenteContainer}>
                        <div>
                            <select name="filter" value="filter" onChange={(e) => handleOnChange(e)}>
                                <option value="">{input.filter} </option>
                                <option value="">Todos</option>
                                <option value="Americas">América</option>
                                <option value="Africa">África</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europa</option>
                                <option value="Oceania">Oceanía</option>
                            </select>
                        </div>
                        <div>
                            <h3>Filtrar por Continente</h3>
                        </div>


                    </div>
                    <div className={styles.filtActivitiesContainer}>
                        <div>
                            <select name="selectActivities" value="selectActivities" onChange={(e) => handleActivitiesChange(e)}>
                                <option value="">{input.activity}</option>
                                <option value="">Todos</option>
                                {
                                    allActivities?.map(e => <option key={e.name} value={e.name}>{e.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <h3>Actividades Turísticas</h3>
                        </div>
                    </div>
                    <div className={styles.radioContainer} >
                        <div className={styles.radioOpt} >
                            <input type="radio" value="ASC" name="order" checked={input.order === "ASC"} onChange={(e) => handleOnChange(e)} /> <h3>Ascendente</h3>
                            <input type="radio" value="DESC" name="order" checked={input.order === "DESC"} onChange={(e) => handleOnChange(e)} /><h3><prev>Descendente</prev></h3>
                        </div>
                        <div>
                            <h3>Orden</h3>
                        </div>
                    </div>

                    <div className={styles.tipeContainer}>
                        <div>
                            <select name="typeOrder" value="typeOrder" onChange={(e) => handleOnChange(e)}>
                                <option value="">{input.typeOrder}</option>
                                <option value="name">Nombre</option>
                                <option value="population">Poblacion</option>
                            </select>
                        </div>
                        <div>
                            <h3>Tipo</h3>
                        </div>
                    </div>
                    <div className={styles.countriesContainer}>
                        {input.wait ? fil.activityFilter.map(c => {
                            return (
                                <div key={c.id}>
                                    <NavLink to={`/home/${c.id}`}>
                                        <CountryCard name={c.name} flag={c.flag} region={c.region} sightseeings={c.sightseeings} />
                                    </NavLink>
                                </div>
                            )
                        }) : allCountries?.map(c => {
                            return (
                                <div key={c.id}>
                                    <NavLink to={`/home/${c.id}`}>
                                        <CountryCard name={c.name} flag={c.flag} region={c.region} sightseeings={c.sightseeings} />
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.backContainer}>
                        <button className={styles.btnBN} onClick={e => prev(e)} disabled={input.page <= 0}>{"<"}</button>
                    </div>
                    <div className={styles.nextContainer}>
                        <button className={styles.btnBN} onClick={e => next(e)} disabled={allCountries.length < 9}>{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Home