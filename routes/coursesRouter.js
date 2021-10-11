const { getCourses, postCourse, getCourse, updateCourse, deleteCourse } = require('../controller/coursesController')


const router = require('express').Router()


router.get('/courses', getCourses)
router.post('/create', postCourse)
router.get('/courses/:slug', getCourse)
router.patch('/courses/:slug', updateCourse)
router.delete('/courses/:slug', deleteCourse)
module.exports = {
    path: '/api', 
    router
}

