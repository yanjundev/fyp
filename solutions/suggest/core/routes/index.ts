const discoverPosts = require('@/core/routes/controllers/discover');
const popularPosts = require('@/core/routes/controllers/popular');
const recommendPosts = require('@/core/routes/controllers/recommend');

const routes = (app) => {
  app.use('/api/discover', discoverPosts);
  app.use('/api/popular', popularPosts);
  app.use('/api/recommend', recommendPosts);
};

export default routes;
