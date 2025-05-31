const { createCourse, getCourses, getCourseById } = require('../services/courseService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// Handler for creating a new course
const createCourseHandler = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const instructorId = req.user.id;
    const course = await createCourse(title, description, price, instructorId);
    res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
  } catch (error) {
    next(error);
  }
};

// Handler for fetching all courses
const getCoursesHandler = async (req, res, next) => {
  try {
    const courses = await getCourses();
    res.status(200).json(new ApiResponse(200, courses, 'Courses fetched successfully'));
  } catch (error) {
    next(error);
  }
};

// Handler for fetching a course by ID
const getCourseByIdHandler = async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    res.status(200).json(new ApiResponse(200, course, 'Course fetched successfully'));
  } catch (error) {
    next(error);
  }
};


module.exports = { createCourseHandler, getCoursesHandler, getCourseByIdHandler };