import { useAppSelector } from '../../store/hooks';
import shortid from 'shortid';
import PostCardItems from '../PostCardItems';

function PostCard() {
  const posts = useAppSelector((state) => state.post.posts);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <PostCardItems key={shortid.generate()} post={post} />;
        })}
    </>
  );
}

export default PostCard;
