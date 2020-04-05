'use strict';

const Sequelize = require('sequelize');
const db = require('./_db');

const Student = db.define('student', {

        // type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //     notNull: {
        //         msg: 'name cannot be null',
        //     },
        //     notEmpty: {
        //         msg: 'Validation error',
        //     }
        // },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phase: {
            type:   Sequelize.ENUM,
            values: ['NULL', 'junior', 'senior'],
        },
});


Student.findByPhase = function(phase) {
    return this.findAll({
        where: {
            phase: phase,
    
        },
    
        //include: [{all: true}],
    
        //include: [{model: User, as: 'from'},{model: User, as: 'to'}],// checkout the documentation of class methods
    })
    }



module.exports = Student;
