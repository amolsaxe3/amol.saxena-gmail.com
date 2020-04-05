'use strict';

const Sequelize = require('sequelize');
const db = require('./_db');

const Campus = db.define('campus', {
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        //notEmpty: true,
        //notEmpty: true, or below c heck it.
        validate: {
            notNull: {
                msg: 'name cannot be null',
            },
            notEmpty: {
                msg: 'Validation error',
            }
        },
    },

});


module.exports = Campus;
