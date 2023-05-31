import express from 'express'
const router = express.Router();

import AdminController from '../controller/AdminController.js'
import AdminAuthorization from '../middlewares/AdminAuthorization.js'

router.get('/theater-rooms', AdminAuthorization, AdminController.getTheaterRooms)
router.post('/theater-rooms-for-scheduling-movie', AdminAuthorization, AdminController.getTheaterRoomsForSchedulingMovie)
router.post('/theater-rooms', AdminAuthorization, AdminController.createTheaterRoom)
router.put('/theater-rooms/:id', AdminAuthorization, AdminController.updateTheaterRoom)
router.delete('/theater-rooms/:id', AdminAuthorization, AdminController.deleteTheaterRoom)
router.post('/theater-rooms-by-showtime', AdminAuthorization, AdminController.sheduleShowtime)



router.post('/movies', AdminAuthorization, AdminController.createMovie)
router.put('/movies/:id', AdminAuthorization, AdminController.updateMovie)
router.delete('/movies/:id', AdminAuthorization, AdminController.deleteMovie)


router.post('/foods', AdminAuthorization, AdminController.createFood)
router.put('/foods/:id', AdminAuthorization, AdminController.updateFood)
router.delete('/foods/:id', AdminAuthorization, AdminController.deleteFood)

router.post('/drinks', AdminAuthorization, AdminController.createDrink)
router.put('/drinks/:id', AdminAuthorization, AdminController.updateDrink)
router.delete('/drinks/:id', AdminAuthorization, AdminController.deleteDrink)

router.post('/staffs', AdminAuthorization, AdminController.createStaff)
router.get('/staffs', AdminAuthorization, AdminController.getStaffs)


router.get("/showtimes", AdminAuthorization, AdminController.getShowtimeByTheaterRoomId)

//TODO: 

router.post('/showtimes', AdminAuthorization, AdminController.sheduleShowtime)


// //TODO: update staff (lock account)
// router.put('/staffs/:id', AdminAuthorization, AdminController.updateStaff)



export default router