import express, { Request, Response } from 'express';

import { discoverPosts, updateDiscoverPosts } from '@/lib/services/discover';

const router = express.Router();

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await discoverPosts();

    return res.status(200).json({ msg: 'discover posts', posts: posts });
  } catch {
    return res.status(500).json({ error: 'smth went wrong bad luck' });
  }
});

router.post('/posts/:postId', async (req: Request, res: Response) => {
  try {
    await updateDiscoverPosts(req.params.postId);

    return res.status(200).json({ msg: 'done' });
  } catch {
    return res.status(500).json({ error: 'bad luck try again' });
  }
});

module.exports = router;
