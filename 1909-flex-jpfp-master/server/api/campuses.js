const express = require('express');
const {db, Campus, Student} = require('../db')

// // This router is already mounted on /users in server/app.js
const router = express.Router();

// router.get('/campuses', function (req, res, next){
// 	console.log('inside the get /api/campuses route')
// 	Campus.findAll()
//   	.then(campuses => res.status(200).send(campuses))
//   	.catch(next);

// });

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id/staff', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


router.get('/', async function (req, res, next){
	try {
		const campuses = await Campus.findAll()
  		res.status(200).send(campuses)
	} catch (error) {
		console.log(error)
		next(error)
	}
	
  	
});

router.get('/:id', async function (req, res, next){
	try {
		const campuses = await Campus.findAll({
			where: {
			  id: req.params.id
			},
			include: [{
				model: Student
			}]
		})
  		res.status(200).send(campuses)
	} catch (error) {
		console.log(error)
		next(error)
	}  	  
});

router.post('/', function (req, res, next) {
	console.log('inside post campus: ', req.body);
	Campus.create(req.body)
	.then(campus => res.status(201).send(campus))
	.catch(next);
  });

  router.put('/:id', (req, res, next) => {
	console.log('campus in editCampus action: ', req.body);
	const { name, address, description } = req.body;
	const { id } = req.params;
	Campus.findByPk(id, {
	  include: [{ model: Student }],
	})
	  .then(foundCampus => {
		return foundCampus.update({
		  name,
		  address,
		  description
		});
	  })
	  .then(updatedCampus => {
		return res.status(201).send(updatedCampus);
	  })
	  .catch(err => next(err));
  });

  router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	Campus.destroy({
	  where: {
		id,
	  },
	})
	  .then(() => res.status(200).end())
	  .catch(err => next(err));
  });

module.exports = router;