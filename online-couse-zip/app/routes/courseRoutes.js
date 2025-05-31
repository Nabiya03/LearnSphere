// Importing Express, course controller, and middleware
const express = require('express');
const { createCourseHandler, getCoursesHandler, getCourseByIdHandler } = require('../controllers/courseController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants');


const router = express.Router();

// Defining course routes with authentication and authorization
router.post('/', authenticate, authorize([ROLES.INSTRUCTOR, ROLES.ADMIN]), createCourseHandler);
router.get('/', getCoursesHandler);
router.get('/:id', getCourseByIdHandler);

module.exports = router;