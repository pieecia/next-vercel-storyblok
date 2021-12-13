import Head from 'next/head'
import Image from 'next/image'
import {Container} from "postcss";
import Link from "next/link";
import { request } from "../lib/datocms";

const HOMEPAGE_QUERY = `
query MyQuery {
  allArticles {
    id
    createdAt
    excerpt
    publishDate
    slug
    author {
      johnDoe
    }
    content {
      value
    }
    coverImage {
      url
    }
    articleTitle
  }
}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data }
  };
}

export default function Index(props) {
  const { data } = props;
  const posts = data.allArticles;
  return (
    <div>
      <div className="container px-4 md:px-0 max-w-6xl mx-auto">
        <h1 className="text-center font-extrabold text-3xl md:text-5xl mt-10">Blog posts</h1>
        <div className="flex flex-wrap justify-between pt-12 -mx-6">
          {posts.map(post => (
            <BlogPostPreview key={post.id} data={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

const BlogPostPreview = (props) => {
  const {data} = props;
  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg p-relative">
        <Image src={data.coverImage.url} alt={data.title} width={400} height={200} />
        <div className="w-full font-bold text-xl text-gray-900 px-6 pt-5 mb-3">
          <Link href={`/blog/${data.slug}`}>
            {data.articleTitle}
          </Link>
        </div>
        <div className="w-full text-gray-600 text-xs md:text-sm px-6 pb-5">
          <Link href={`/blog/${data.slug}`}>
            {data.excerpt}
          </Link>
        </div>
      </div>
    </div>
  )
}