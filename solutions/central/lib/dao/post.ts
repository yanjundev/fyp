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
    if (planId) {
      await db.post.create({
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

    await db.post.create({
      data: {
        author: { connect: { id: profileId } },
        title,
        body,
        tags,
        postDate,
        public: isPublic,
      },
    });
  } catch (error) {
    console.log(error);

    return null;
  }
};

// for editing
export const getPostById = async () => {};

// for overview of all posts
export const getPostsByProfile = async (id?: string) => {
  try {
    let profileId: string | undefined = id;

    if (id === undefined) {
      profileId = (await getProfileId()) as string;
    }

    const posts = await db.post.findMany({
      where: { authorId: profileId },
      include: { plan: true },
      orderBy: { postDate: 'desc' },
    });

    const user = await db.user.findFirst({
      where: { profile: { id: profileId } },
    });

    const mapped = posts.map((post) => {
      return {
        ...post,
        author: user
          ? {
              image: user.image,
              profileId,
              name: user.name,
              username: user.username,
            }
          : null,
      };
    });

    return mapped;
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

export const deletePost = async (id: string) => {
  try {
    await db.post.delete({ where: { id } });
  } catch {
    return null;
  }
};
