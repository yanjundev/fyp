import { db } from '@/core/db';

export const getPopularPost = async (postId: string) => {
  try {
    const post = await db.popularPosts.findFirst({ where: { postId } });

    return post;
  } catch {
    throw 'error';
  }
};

export const addPopularPost = async (postId: string) => {
  try {
    await db.popularPosts.create({
      data: {
        post: { connect: { id: postId } },
        added: new Date(),
      },
    });
  } catch {
    throw 'error';
  }
};

/**
 * @returns array of posts sorted by oldest added
 */
export const getPopularPosts = async () => {
  try {
    const posts = await db.popularPosts.findMany({
      orderBy: { added: 'asc' },
      select: { post: true },
    });

    return posts;
  } catch {
    throw 'error';
  }
};

/**
 * removes all posts older than two weeks
 */
export const prunePopularPosts = async () => {
  try {
    const TWO_WEEKS_AGO = 14;
    const d = new Date();
    d.setDate(d.getDate() - TWO_WEEKS_AGO);

    await db.popularPosts.deleteMany({
      where: {
        added: {
          lte: d,
        },
      },
    });
  } catch {
    throw 'error';
  }
};
