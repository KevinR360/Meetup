import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SingupController from './app/controllers/SingupController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetup', MeetupController.index);
routes.post('/meetup', upload.single('file'), MeetupController.store);
routes.put('/meetup/:id', upload.single('file'), MeetupController.update);
routes.delete('/meetup/:id', MeetupController.delete);

routes.get('/singup', SingupController.index);
routes.post('/singup/:id', SingupController.store);
routes.delete('/singup/:id/cancel', SingupController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
