const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require('sequelize');

const { Country, Sightseeing, sighseeing_countries } = require("../db.js");



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const countries = async () => {
    const restcountries = await axios.get("https://restcountries.com/v3/all");
    //console.log("respuesta de la api", restcountries.data);
    return restcountries.data;
}

const sightseeing = [
    {
        name: "Ocio",
        difficulty: 1,
        duration: 10,
        season: "Primavera",
    },
    {
        name: "Visitar lugares históricos",
        difficulty: 1,
        duration: 10,
        season: "Verano",
    },
    {
        name: "Gastronomía",
        difficulty: 1,
        duration: 10,
        season: "Primavera",
    },
    {
        name: "Surf",
        difficulty: 4,
        duration: 3,
        season: "Verano",
    },
    {
        name: "Esquí",
        difficulty: 4,
        duration: 4,
        season: "Invierno",
    },
];

//GET /countries/{idPais}:

router.get('/countries/:id', async (req, res) => {

    const id = req.params.id;

    try {
        let countriesFound = await Country.findByPk(id, {
            include: [
                {
                    model: Sightseeing,
                }
            ],
        });
        return res.json(countriesFound);
    } catch (error) {
        console.log(error);
    }
});


//GET /countries:
//?retorna listado de paises
router.get('/countries', async (req, res) => {

    const countriesApi = await countries();
    const api = countriesApi.map(c => {
        return {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[0],
            region: c.region,
            subregion: c.subregion || "Antartica",
            capital: c.capital ? c.capital[0] : "none",
            area: c.area,
            population: c.population,
        }
    });
    //console.log("AA", api);
    //console.log("tabla", await Country.findAll());
    //await Country.bulkCreate(api);
    //console.log("tabladespues", await Country.findAll());

    //?si la bd esta vacia  la llena con los paises de la api y las actividades turisticas
    try {
        let there = await Country.findAll();
        let thereSightseeing = await Sightseeing.findAll();
        //console.log("there", there);
        if (!there.length) await Country.bulkCreate(api);
        if (!thereSightseeing.length) {
            await Sightseeing.bulkCreate(sightseeing);
            //pongo actividades turisticas aleatoreas a cada pais
            let arrayCountries = await Country.findAll();
            arrayCountries.map(c => c.setSightseeings(Math.round(Math.random() * 4 + 1)));
            // const paisaux = await Country.findByPk("COL");
            // console.log(paisaux);
            // await paisaux.setSightseeings(2)
        }
        //console.log("countries", await Country.findAll());
    } catch (error) {
        console.log(error)
    }


    // GET /countries?name="...":

    //?si llega algun name por query  retorna solo los paises que coincidan

    let { name, filter, page, order, typeOrder } = req.query;

    order = order ? order : 'ASC';
    typeOrder = typeOrder ? typeOrder : 'name';
    //name: buscar por nombre
    //filter: filtra por continente
    //page: paginado
    // order: ascendente o descendente
    //typeOrder: por nombre o por cantidad de poblacion


    if (name) {
        try {
            let countriesFound = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%',
                    },
                },
                attributes: ['name', 'flag', 'region', 'id', 'population'],
                limit: 9,
                offset: page ? page : 0,
                order: [[typeOrder, order]],
                //include: { model: Sightseeing },
            });
            return res.json(countriesFound);
        } catch (error) {
            console.log(error);
        }
        //     //?filtrado por continente   
        //     //todo la actividad turistica voy a filtrarla en el front
    } else if (filter) {
        try {
            let countriesFound = await Country.findAll({
                where: {
                    region: filter,
                },
                attributes: ['name', 'flag', 'region', 'id', 'population'],
                limit: 9,
                offset: page ? page : 0,
                order: [[typeOrder, order]],
                //include: { model: Sightseeing },
            });
            return res.json(countriesFound);
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            console.log()
            let countriesFound = await Country.findAll({
                attributes: ['name', 'flag', 'region', 'id', 'population'],
                limit: 9,
                offset: page ? page : 0,
                order: [[typeOrder, order]],
                //include: { model: Sightseeing },
            });
            return res.json(countriesFound);
        } catch (error) {
            console.log(error);
        }
    }
})


// POST / activities:

router.post('/activities', async (req, res) => {

    const activity = req.body;
    //todo debe llegar name, difficulty, duration, season, countryId
    try {
        let [act, created] = await Sightseeing.findOrCreate({
            where: {
                name: activity.name,
                difficulty: activity.difficulty,
                duration: activity.duration,
                season: activity.season,
            },
        });

        await act.addCountries(activity.countryId);

        res.json(act)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
