import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SubscribeController from './app/controllers/SubscribeController';
import NotificationController from './app/controllers/NotificationController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.show);

routes.get('/meetups', MeetupController.index);

routes.get('/schedule', ScheduleController.index);

routes.get('/meetup/:id', MeetupController.show);
routes.post('/meetup', upload.single('file'), MeetupController.store);
routes.put('/meetup/:id', upload.single('file'), MeetupController.update);
routes.delete('/meetup/:id', MeetupController.delete);

routes.get('/subscribe', SubscribeController.index);
routes.post('/subscribe/:id', SubscribeController.store);
routes.delete('/subscribe/:id/cancel', SubscribeController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
