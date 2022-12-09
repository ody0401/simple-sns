import Head from 'next/head';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store';
import { addPostsAPI } from '../actions/post';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inView) {
      dispatch(addPostsAPI());
    }
  }, [inView, dispatch]);
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="sns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <PostCard />
      </div>
      <div ref={ref}></div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(addPostsAPI());
  return { props: {} };
});
