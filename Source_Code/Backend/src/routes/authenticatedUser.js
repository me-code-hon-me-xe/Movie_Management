import express from 'express';
const router = express.Router();

import AuthenticatedUserController from '../controller/AuthenticatedUserController.js';
import IsAuthenticated from '../middlewares/IsAuthenticated.js';

router.get('/movies', IsAuthenticated, AuthenticatedUserController.getMovies);
router.get('/movies/:id', IsAuthenticated, AuthenticatedUserController.getMovieById);
router.get('/movies/:id/showtimes', IsAuthenticated, AuthenticatedUserController.getMovieShowtime);
router.get('/foods', IsAuthenticated, AuthenticatedUserController.getFoods);
router.get('/drinks', IsAuthenticated, AuthenticatedUserController.getDrinks);
router.get('/user-info',IsAuthenticated,  AuthenticatedUserController.getUserInfo);
router.post('/update-info',IsAuthenticated,  AuthenticatedUserController.updateInfo);
router.get('/seatchart-by-showtime', IsAuthenticated, AuthenticatedUserController.getTheaterRoomByShowtime)


export default router;