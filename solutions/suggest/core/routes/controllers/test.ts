import express, { Request, Response } from 'express';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ msg: 'test' });
});

module.exports = router;
