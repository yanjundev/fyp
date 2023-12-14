import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('simple server');
});

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});

export default app;
