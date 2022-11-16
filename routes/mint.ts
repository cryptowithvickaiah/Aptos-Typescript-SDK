import express from 'express';
import { account } from './account';

export const routes = express.Router();

routes.use(account);
