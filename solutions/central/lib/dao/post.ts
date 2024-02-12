import { db } from '@/lib/db';
import { pages } from 'next/dist/build/templates/app-page';

export const createPostForUser = async (
  profileId: string,
  title: string,
  body: string,
  tags: string[],
  postDate: Date,
  isPublic: boolean,
) => {
  try {
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
export const getPostsByProfile = async () => {};

// for user feed
export const getPostsByProfiles = async (ids: string[]) => {
  try {
    const filter = ids.map((id) => {
      return { authorId: id };
    });

    const posts = await db.post.findMany({ where: { OR: filter } });
    console.log('POSTS', posts);
    return posts;
  } catch {
    return null;
  }
};

// get all latest public posts
export const getAllPosts = async () => {};
