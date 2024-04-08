import bodyParser from 'body-parser';

import routes from '@/core/routes';

const listen = async (config, app) => {
  app.listen(config.server.PORT, () => {
    console.log(`server listening on port ${config.server.PORT}`);
  });
};

const start = (config, app) => {
  app.use(bodyParser.json());

  routes(app);
  listen(config, app);
};

export { start };
