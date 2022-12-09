import { faker } from '@faker-js/faker';
import { Post } from '../slice/post';
import shortid from 'shortid';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function createPost() {
  const name = faker.name.fullName();
  const avatar = faker.image.avatar();
  const id = shortid.generate();
  const randNum = getRandomInt(1, 4);
  const imageSrc: string[] = [];
  for (let i = 0; i < randNum; i++) {
    imageSrc.push(faker.image.animals(630, 600, true));
  }

  return { id, name, avatar, imageSrc };
}

export function addPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(createPost());
    }, 500);
  });
}

export function addPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts: Post[] = [];
      for (let i = 0; i < 5; i++) {
        posts.push(createPost());
      }
      resolve(posts);
    }, 300);
  });
}
