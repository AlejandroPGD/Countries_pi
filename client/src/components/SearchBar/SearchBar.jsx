import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeName } from "../../actions";
import styles from "./SearchBar.module.css"


export default function SearchBar() {
    const dispatch = useDispatch();
    //const gState = useSelector((state) => state);


    const [input, setInput] = useState({
        name: "",

    });
    // const [input, setInput] = useState({
    //     name: gState.name,
    //     page: gState.page,
    //     order: gState.order,
    //     filter: gState.filter,
    //     typeOrder: gState.typeOrder,
    // });
    // console.log("estoy en la barra de busqueda con ", input)
    // useEffect(() => {
    //     setInput((prevInput) => {
    //         return {
    //             name: gState.name,
    //             page: gState.page,
    //             order: gState.order,
    //             filter: gState.filter,
    //             typeOrder: gState.typeOrder,
    //         }
    //     })
    // }, [gState]);

    const handleOnChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            }
        });
    }

    function handleClick(event) {
        event.preventDefault();
        dispatch(changeName(input.name));
    }
    return (
        <div className={styles.searchbar}>
            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    name='name'
                    onChange={handleOnChange}
                    value={input.name}>
                </input>
            </div>

            <div>
                <button className={styles.btn} onClick={e => handleClick(e)}>Buscar</button>
            </div>
        </div>
    )
}

