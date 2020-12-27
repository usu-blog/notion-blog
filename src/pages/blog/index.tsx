import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'
import {
  getBlogLink,
  getDateStr,
  postIsPublished,
  parseImageUrl,
} from '~/lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const BlogIndex = ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>UsuCode</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div
              className="flex flex-col md:flex-row bg-no-repeat"
              key={post.Slug}
            >
              {post.FeatureImage && (
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                  <div className=" w-full md:w-72 flex mx-auto cursor-pointer">
                    <div
                      className="w-full bg-center"
                      style={{
                        backgroundImage: `url(${parseImageUrl(
                          post.id,
                          post.FeatureImage,
                          100
                        )})`,
                        paddingTop: '56.25%',
                      }}
                    >
                      {/* <img alt="feature image" className=" h-48" /> */}
                    </div>
                  </div>
                </Link>
              )}
              <div className=" flex-1 p-4">
                <h3 className=" cursor-pointer">
                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <div className={blogStyles.titleContainer}>
                      {!post.Published && (
                        <span className={blogStyles.draftBadge}>Draft</span>
                      )}
                      <a className="">{post.Page}</a>
                    </div>
                  </Link>
                </h3>
                {post.Authors.length > 0 && (
                  <div className="authors text-xs text-gray-600">
                    By: {post.Authors.join(' ')}
                  </div>
                )}
                {post.Date && (
                  <div className="posted text-xs text-gray-600">
                    Posted: {getDateStr(post.Date)}
                  </div>
                )}
                <p className=" mt-2 text-xs">
                  {(!post.preview || post.preview.length === 0) &&
                    'No preview available'}
                  {(post.preview || []).map((block, idx) =>
                    textBlock(block, true, `${post.Slug}${idx}`)
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BlogIndex
