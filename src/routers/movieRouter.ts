// import { Router } from 'express';
// import { getAll, create, update, delete } from '../controllers/movieController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = Router();

// router.get('/', protect, getAll);
// router.post('/', protect, admin, create);
// router.put('/:id', protect, admin, update);
// router.delete('/:id', protect, admin, delete);

// export default router;

import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getAllMovies,
  createNewMovie,
  updateMovie,
  deleteMovie,
  getMovieFilter,
} from '../controllers/movieController.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - releaseDate
 *         - trailerLink
 *         - posterUrl
 *         - genres
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the movie
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: The release date of the movie
 *         trailerLink:
 *           type: string
 *           description: The link to the movie trailer
 *         posterUrl:
 *           type: string
 *           description: The URL of the movie poster
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: The genres of the movie
 *       example:
 *         title: Inception
 *         releaseDate: 2010-07-16
 *         trailerLink: https://example.com/trailer
 *         posterUrl: https://example.com/poster.jpg
 *         genres:
 *           - Sci-Fi
 *           - Thriller
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Returns the list of all the movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/movies', protect, getAllMovies);

/**
 * @swagger
 * /movies/search:
 *   get:
 *     summary: Returns the list of movies based on filters
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/movies/search', protect, admin, getMovieFilter);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Some server error
 */
router.post('/movies', protect, admin, createNewMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update the movie by the id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie was not found
 *       500:
 *         description: Some error happened
 */
router.put('/movies/:id', protect, admin, updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Remove the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */
router.delete('/movies/:id', protect, admin, deleteMovie);

export default router;
