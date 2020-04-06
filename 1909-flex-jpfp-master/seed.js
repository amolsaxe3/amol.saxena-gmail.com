const { green, red } = require('chalk')
const { db, Campus, Student } = require('./server/db')

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!

    const mars= 
      {
        name: 'Mars Academy',
        imageUrl: '/images/Mars-Academy.jpeg',
        address: 'milkyway',
        description: 'toddler academy'
      }
      const jupiter= 
      {
        name: 'Jupiter Academy',
        imageUrl: '/images/Jupiter-Academy.jpeg',
        address: 'milkyway extension school road',
        description: 'adult academy'
      }
      const mars= 
      {
        name: 'MIT Academy',
        imageUrl: '/images/MIT-university.jpg',
        address: 'milkyway',
        description: 'toddler academy'
      }
    

    const studentsInMars=[
      { id: 1, firstName: 'Mae', lastName: 'Jemison', email: 'mae@test.com', address: '1 main st, princeton', gpa: 3.5, imageUrl: '/Student1.jpeg', campusId: 1},
      { id: 2, firstName: 'Sally', lastName: 'Ride', email: 'sally@test.com', address: '2 main st, new york city', gpa: 4.0, imageUrl: '/Student2.jpeg', campusId: 1 },
      { id: 3, firstName: 'amol', lastName: 'saxena', email: 'amol@test.com', address: '3 main st, new york city', gpa: 2.9, imageUrl: '/Student3.jpg', campusId: 1 },
      { id: 4, firstName: 'agastya', lastName: 'saxena', email: 'amol2@test.com', address: '4 main st, new york city', gpa: 4.0, imageUrl: '/Student4.jpg', campusId: 1 },
      { id: 5, firstName: 'saanvi', lastName: 'saxena', email: 'amol3@test.com', address: '5 main st, new york city', gpa: 3.9, imageUrl: '/Student5.jpg', campusId: 1 },
      { id: 6, firstName: 'another', lastName: 'student', email: 'amol4@test.com', address: '6 main st, new york city', gpa: 3.5, imageUrl: '/Student5.jpg', campusId: 1 },

    ]

    return Campus.create(mars).then(campus => {
      return Promise.all(studentsInMars.map(student => {
        return Student.create({
          ...student,
          campusId: campus.id,
        })
      }));
    });


  } catch (err) {
   console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
