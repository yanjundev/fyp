import { db } from '@/core/db';

export const getDiscoverPost = async (postId: string) => {
  try {
    const post = await db.discoveryPosts.findFirst({ where: { postId } });

    return post;
  } catch {
    throw 'error';
  }
};

export const addDiscoverPost = async (postId: string) => {
  try {
    await db.discoveryPosts.create({
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
export const getDiscoverPosts = async () => {
  try {
    const posts = await db.discoveryPosts.findMany({
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
export const pruneDiscoverPosts = async () => {
  try {
    const TWO_WEEKS_AGO = 14;
    const d = new Date();
    d.setDate(d.getDate() - TWO_WEEKS_AGO);

    await db.discoveryPosts.deleteMany({
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
