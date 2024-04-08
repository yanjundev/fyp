import {
  suggestedPosts,
  updateSimilarPostsSimilarity,
  updateSimilarPostsSuggestions,
} from '@/lib/services/similar';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/posts/:userId', async (req: Request, res: Response) => {
  try {
    const posts = await suggestedPosts(req.params.userId);

    return res.status(200).json({ msg: 'recommended posts', posts: posts });
  } catch {
    return res.status(500).json({ error: 'smth went wrong bad luck' });
  }
});

router.post('/posts/:userId', async (req: Request, res: Response) => {
  try {
    // update user's similarity and suggestions
    await updateSimilarPostsSimilarity(req.params.userId);
    await updateSimilarPostsSuggestions(req.params.userId);

    return res.status(200).json({ msg: 'done' });
  } catch {
    return res.status(500).json({ error: 'bad luck try again' });
  }
});

module.exports = router;
