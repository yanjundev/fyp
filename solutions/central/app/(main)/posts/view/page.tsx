import { fetchFollowing } from '@/actions/user/follow';
import { checkPostAuthor, getProfilePost } from '@/actions/user/posts';
import { PostView } from '@/components/post/post-view';

interface ViewPostProps {
  searchParams: { postId: string };
}

const ViewPost = async ({ searchParams }: ViewPostProps) => {
  const post = await getProfilePost(searchParams.postId);

  let isCreator;
  let isFollower;

  if (post?.authorId) {
    isCreator = await checkPostAuthor(post.authorId);

    const following = await fetchFollowing();
    isFollower = following?.map((f) => f?.profileId === post.authorId);
  }

  return post && (isCreator || isFollower || post.public) ? (
    <PostView post={post} isCreator={isCreator!!} />
  ) : (
    '404 this plan doesnt exist : )'
  );
};

export default ViewPost;
