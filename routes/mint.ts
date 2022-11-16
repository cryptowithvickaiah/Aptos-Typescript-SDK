import express from 'express';
import { calcRoute } from './calcRoute';
import { defaultRoute } from './defaultRoute';
import { mint } from './minting';
import { account } from './account';
import { collection } from './collection';
import { create_col } from './create_collectiong';
import { confirm_txn } from './confirm_txn';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(calcRoute);
routes.use(mint);
routes.use(account);
routes.use(collection);
routes.use(create_col);
routes.use(confirm_txn);