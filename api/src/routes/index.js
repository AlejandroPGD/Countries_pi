const { Router, response } = require('express');
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

        if (!countriesFound) return res.status(404).send('No se encontró el pais');
        return res.json(countriesFound);
    } catch (error) {
        console.log(error);
    }
});




//GET /countries:
//?retorna listado de paises
router.get('/countries', async (req, res) => {

    //?si la bd esta vacia  la llena con los paises de la api y las actividades turisticas
    try {
        let there = await Country.findAll();
        let thereSightseeing = await Sightseeing.findAll();

        if (!there.length) {
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
            await Country.bulkCreate(api);
        }
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

    let { name, filter, page, order, typeOrder, limit } = req.query;

    order = order ? order : 'ASC';
    typeOrder = typeOrder ? typeOrder : 'name';
    limit = limit ? limit : 9;
    //name: buscar por nombre
    //filter: filtra por continente
    //page: paginado
    // order: ascendente o descendente
    //typeOrder: por nombre o por cantidad de poblacion
    //console.log("name en api", req.query)

    if (name) {
        try {
            if (filter) {
                let countriesFound = await Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + name + '%',
                        },
                        region: filter

                    },
                    attributes: ['name', 'flag', 'region', 'id', 'population'],
                    limit: limit,
                    offset: page ? page : 0,
                    order: [[typeOrder, order]],

                    include: { model: Sightseeing },
                });
                if (!countriesFound.length) return res.status(404).send('No se encontró el pais');
                return res.status(200).send(countriesFound)
            } else {
                let countriesFound = await Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + name + '%',
                        },

                    },
                    attributes: ['name', 'flag', 'region', 'id', 'population'],
                    limit: limit,
                    offset: page ? page : 0,
                    order: [[typeOrder, order]],
                    include: { model: Sightseeing },
                });
                if (!countriesFound.length) return res.status(404).send('No se encontró el pais');
                return res.status(200).send(countriesFound)
            }
        } catch (error) {
            console.log(error);
        }
        //     //todo la actividad turistica voy a filtrarla en el front
    } else if (filter) {
        try {
            let countriesFound = await Country.findAll({
                where: {
                    region: filter,
                },
                attributes: ['name', 'flag', 'region', 'id', 'population'],
                limit: limit,
                offset: page ? page : 0,
                order: [[typeOrder, order]],
                include: { model: Sightseeing },
            });
            return res.status(200).send(countriesFound)//res.json(countriesFound);
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let countriesFound = await Country.findAll({
                attributes: ['name', 'flag', 'region', 'id', 'population'],
                limit: limit,
                offset: page ? page : 0,
                order: [[typeOrder, order]],
                include: { model: Sightseeing },
            });
            //return res.status(200).send(countriesFound)//res.json(countriesFound);
            if (!countriesFound.length) return res.status(404).send('No hay paises en la base de datos');
            return res.status(200).send(countriesFound)
        } catch (error) {
            console.log(error);

        }
    }
})

//GET/activities

router.get('/sightseeing', async (req, res) => {
    try {
        const sightseeing = await Sightseeing.findAll({ attributes: ['name'] });
        if (!sightseeing.length) return res.status(404).send('No hay actividades turisticas  en la base de datos');
        return res.status(200).send(sightseeing);

    } catch (error) {
        console.log(error);
    }
})
router.get('/allCountries', async (req, res) => {
    try {
        const countries = await Country.findAll({
            attributes: ['name', 'id'],
            order: [['name', 'ASC']],
        });
        if (!countries.length) return res.status(404).send('No hay paises  en la base de datos');
        return res.status(200).send(countries);

    } catch (error) {
        console.log(error);
    }
})


// POST / activities:

router.post('/activities', async (req, res) => {

    const activity = req.body;
    //console.log("esto llega por el body", activity);
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




// router.post("/test", async (req, res) => {
//     const { name, difficulty, duration, season } = req.body;
//     console.log("est", req.body)
//     try {
//         let va = await Sightseeing.create({ name, difficulty, duration, season })
//         res.send("created")
//     } catch (error) {
//         console.log(error)
//     }
// })




















module.exports = router;
