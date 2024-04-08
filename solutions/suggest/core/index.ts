import config from '@/config';
import server from '@/core/server';

import express, { Express } from 'express';

const app: Express = express();

server.start(config, app);
