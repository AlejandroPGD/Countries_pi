const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('sightseeing', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM({
                values: ['Verano', 'Otoño', 'Invierno', 'Primavera']
            }),
            allowNull: false,
        },

    }, {
        timestamps: false,
    });
};
