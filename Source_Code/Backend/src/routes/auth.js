import express from 'express';
const router = express.Router();

import AuthController from '../controller/AuthController.js';



router.get('/logout',AuthController.logout);
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);


export default router;