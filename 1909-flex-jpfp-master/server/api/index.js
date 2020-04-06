'use strict'

const handle = require('express')

const router = handle();

// Your routes go here!
// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// You can put all routes in this file HOWEVER,
// this file should almost be like a table of contents for the routers you create!
// For example:
//
// For your `/api/campuses` routes:

const campusesSubRouter = require('./campuses');

//router.use('/api/campuses', campusesSubRouter);
router.use('/campuses', campusesSubRouter) 

// And for your `/api/students` routes:
router.use('/students', require('./students'))

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
