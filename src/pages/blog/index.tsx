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
            <div className="flex">
              {post.FeatureImage && (
                <img
                  src={parseImageUrl(post.id, post.FeatureImage, 100)}
                  alt="feature image"
                  className=" h-48"
                />
              )}
              <div className={blogStyles.postPreview} key={post.Slug}>
                <h3>
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
                  <div className="authors text-sm">
                    By: {post.Authors.join(' ')}
                  </div>
                )}
                {post.Date && (
                  <div className="posted text-sm">
                    Posted: {getDateStr(post.Date)}
                  </div>
                )}
                <p className=" text-xs">
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
