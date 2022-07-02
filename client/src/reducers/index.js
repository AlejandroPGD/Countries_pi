import { CHANGE_NAME, GET_COUNTRIES, GET_DETAILS, GET_ACTIVITIES, ALL_COUNTRIES, SET_ACTIVITIES, ACTIVITIES_UPDATE } from "../actions"

const initialState = {

    countries: [],
    allCountries: [],
    name: '',
    page: 0,
    order: "ASC",
    filter: "",
    typeOrder: "name",
    details: {},
    activities: [],
    setActivities: "",
    limit: 9,
    activitiesUpdate: false,
}



export default function reducer(state = initialState, { type, payload }) {
    switch (type) {


        case GET_COUNTRIES:
            //[json.data, name, page, order, filter, typeOrder]
            return {
                ...state,
                countries: payload[0],
                name: payload[1],
                page: payload[2],
                order: payload[3],
                filter: payload[4],
                typeOrder: payload[5],
                limit: payload[6],


            }
        case ALL_COUNTRIES:
            return {
                ...state,
                allCountries: payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: payload
            }
        case CHANGE_NAME:
            return {
                ...state,
                name: payload,
            }
        case ACTIVITIES_UPDATE:
            return {
                ...state,
                activitiesUpdate: payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload,
            }
        case SET_ACTIVITIES:
            return {
                ...state,
                setActivities: payload,
            }
        default:
            return state
    }
}
