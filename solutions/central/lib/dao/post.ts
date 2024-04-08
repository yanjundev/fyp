import { db } from '@/lib/db';
import { getProfileId } from './profile';

export const createPostForUser = async (
  profileId: string,
  title: string,
  body: string,
  tags: string[],
  postDate: Date,
  isPublic: boolean,
  planId?: string,
) => {
  try {
    let post;

    if (planId) {
      post = await db.post.create({
        data: {
          author: { connect: { id: profileId } },
          plan: { connect: { id: planId } },
          title,
          body,
          tags,
          postDate,
          public: isPublic,
        },
      });
    }

    post = await db.post.create({
      data: {
        author: { connect: { id: profileId } },
        title,
        body,
        tags,
        postDate,
        public: isPublic,
      },
    });

    return post;
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

// for editing
export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: { id },
      include: { plan: true },
    });

    return post;
  } catch {
    return null;
  }
};

/**
 * returns all posts with the profile id
 * @param profileId
 */
export const getPostsByProfile = async (profileId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { authorId: profileId },
      include: { plan: true },
      orderBy: { postDate: 'desc' },
    });

    return posts;
  } catch {
    return null;
  }
};

export const getPostsByTag = async (tag: string) => {
  try {
    const posts = await db.post.findMany({
      where: { tags: { has: tag }, public: true },
      include: { plan: true, likedPosts: true },
    });

    return posts;
  } catch {
    return null;
  }
};

// for user feed
export const getPostsByProfiles = async (ids: string[]) => {
  try {
    const filter = ids.map((id) => {
      return { authorId: id };
    });

    const posts = await db.post.findMany({
      where: { OR: filter },
      orderBy: { postDate: 'desc' },
      include: { plan: true },
    });
    return posts;
  } catch {
    return null;
  }
};

export const getPostsCount = async () => {
  try {
    const profileId = await getProfileId();

    if (profileId) {
      const count = await db.post.count({
        where: { authorId: profileId },
      });

      return count;
    }

    return 0;
  } catch {
    return null;
  }
};

// get all latest public posts
export const getAllPosts = async () => {};

export const updatePost = async (
  id: string,
  title: string,
  body: string,
  tags: string[],
  isPublic: boolean,
  planId: string | undefined,
) => {
  try {
    if (planId) {
      await db.post.update({
        where: { id },
        data: {
          plan: { connect: { id: planId } },
          title,
          body,
          tags,
          public: isPublic,
        },
      });
    }

    await db.post.update({
      where: { id },
      data: {
        title,
        body,
        tags,
        public: isPublic,
      },
    });
  } catch {
    return null;
  }
};

export const deletePost = async (id: string) => {
  try {
    await db.post.delete({ where: { id } });
  } catch {
    return null;
  }
};
