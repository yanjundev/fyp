import express, { Request, Response } from 'express';

import { popularPosts, updatePopularPosts } from '@/lib/services/popular';

const router = express.Router();

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await popularPosts();

    return res.status(200).json({ msg: 'popular posts', posts: posts });
  } catch {
    return res.status(500).json({ error: 'smth went wrong bad luck' });
  }
});

router.post('/posts/:postId', async (req: Request, res: Response) => {
  try {
    await updatePopularPosts(req.params.postId);

    return res.status(200).json({ msg: 'done' });
  } catch {
    return res.status(500).json({ error: 'bad luck try again' });
  }
});

module.exports = router;
