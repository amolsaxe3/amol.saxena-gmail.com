const Sequelize = require('sequelize');

const db = require('./database')

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        //notEmpty: true, or below check it.
        validate: {
            notNull: {
                msg: 'firstName cannot be null',
            },
            notEmpty: {
                msg: 'Validation notEmpty on firstName',
            }
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        //notEmpty: true, or below check it.
        validate: {
            notNull: {
                msg: 'lastName cannot be null',
            },
            notEmpty: {
                msg: 'Validation notEmpty on lastName',
            }
        },
    },

    email: {
        type: Sequelize.STRING,
        isUnique :true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },

    // email: {
    //     type    : Sequelize.STRING,
    //     isUnique :true,
    //     allowNull:false,
    //     validate:{
    //         isEmail: true,
    //         notNull: {
    //             msg: 'email cannot be null',
    //         },
    //         notEmpty: {
    //             msg: 'Validation notEmpty on email',
    //         }
    //     }
    // },

    gpa: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: true,
          min: 0.0,
          max: 4.0,
        },
      },

    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "/student-default-img.jpg",
    },
 
});

module.exports = Student