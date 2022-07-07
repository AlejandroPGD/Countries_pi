import axios from 'axios';


export const GET_COUNTRIES = "GET_COUNTRIES";
export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const GET_DETAILS = "GET_DETAILS";
export const CHANGE_NAME = "CHANGE_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const SET_ACTIVITIES = "SET_ACTIVITIES";
export const ACTIVITIES_UPDATE = "ACTIVITIES_UPDATE";
//export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";



export function getCountries({ name, filter, page, order, typeOrder, limit }) {
    // console.log("despacha este nombre", name)
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/countries?name=${name}&page=${page}&order=${order}&filter=${filter}&typeOrder=${typeOrder}&limit=${limit}`);
            // console.log("llega esto ", json.data)
            return dispatch({
                type: GET_COUNTRIES,
                payload: [json.data, name, page, order, filter, typeOrder, limit]
            })
        } catch (error) {
            alert("No encontrado");
            console.log(error);
        }
    }
}
export function getAllCountries() {

    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/allCountries`);
            return dispatch({
                type: ALL_COUNTRIES,
                payload: json.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/countries/${id}`);

            return dispatch({
                type: GET_DETAILS,
                payload: json.data,
            })
        } catch (error) {
            alert("No existe");
            console.log(error);
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/sightseeing`);
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function setActivities(body) {
    return async function (dispatch) {
        try {
            let json = await axios.post(`http://localhost:3001/activities`, body);
            return dispatch({
                type: SET_ACTIVITIES,
                payload: json.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        payload: name,
    }
}
export function activitiesUpdate(updated) {
    return {
        type: ACTIVITIES_UPDATE,
        payload: updated,
    }
}