import {request} from "../../lib/datocms";
import {StructuredText} from "react-datocms";

export default function BlogPost(props) {
  const { postData } = props;
  return (
    <div>
      <div className="container px-4 md:px-0 max-w-6xl mx-auto">
        <h1 className="text-center font-extrabold text-3xl md:text-5xl mt-10">{ postData.articleTitle }</h1>
        <div className="pt-12 -mx-6">
          <StructuredText data={ postData.content } />
        </div>
      </div>
    </div>
  )
}

const PATHS_QUERY = `
  query MyQuery {
    allArticles {
      slug
    }
  }
`;

export const getStaticPaths = async() => {
  const slugQuery = await request({
    query: PATHS_QUERY,
  });

  const paths = [];
  slugQuery.allArticles.map(p => {
    paths.push(`/blog/${p.slug}`);
  });

  return {
    paths,
    fallback: false
  }
}

const ARTICLE_QUERY = `
  query MyQuery($slug: String) {
    article(filter: {slug: {eq: $slug}}) {
      id
      articleTitle
      author {
        johnDoe
      }
      content {
        value
      }
    }
  }
`;

export const getStaticProps = async({params}) => {
  const post = await request({
    query: ARTICLE_QUERY,
    variables: {
      slug: params.slug
    }
  });
  console.log('post', post)
  return {
    props: {
      postData: post.article
    }
  }
}
