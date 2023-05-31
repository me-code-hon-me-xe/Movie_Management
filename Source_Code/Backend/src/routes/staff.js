import express from 'express';
const router = express.Router();

import StaffController from '../controller/StaffController.js';
import StaffAuthorization from '../middlewares/StaffAuthorization.js';

// // TODO: get all orders (order history)
// router.get('/orders', StaffAuthorization, StaffController.getOrders);
// // TODO: view order history detail

// router.get('/orders/:id', StaffAuthorization, StaffController.getOrderDetail);
// // TODO: create an order 

router.post('/orders', StaffAuthorization, StaffController.createOrder);
// TODO: create an order 

// router.put('/orders/:id', StaffAuthorization, StaffController.updateOrder);

export default router;