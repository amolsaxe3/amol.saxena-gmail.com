const Sequelize = require('sequelize');

const db = require('./database')

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        //notEmpty: true, or below check it.
        validate: {
            notNull: {
                msg: 'Please provide a value for "Name"',
            },
            notEmpty: {
                msg: 'Validation notEmpty on name',
            }
        },
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "/Default-Campus.jpeg",
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false, 
        //notEmpty: true, or below check it.
        validate: {
            notNull: {
                msg: 'Please provide a value for "address"',
            },
            notEmpty: {
                msg: 'Validation notEmpty on address',
            }
        },
    },

    description: {
        type: Sequelize.TEXT,
    },


});

module.exports = Campus