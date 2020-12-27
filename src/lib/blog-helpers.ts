import moment from 'moment'

export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

export const getDateStr = date => {
  // return new Date(date).toLocaleString('en-US', {
  //   month: 'long',
  //   day: '2-digit',
  //   year: 'numeric',
  // })
  return moment(date).format('YYYY/MM/DD')
}

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes'
}

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}

export const parseImageUrl = (id, url, width) => {
  let rUrl
  if (url.startsWith('https://s3')) {
    let [parsedOriginUrl] = url.split('?')
    rUrl = `https://www.notion.so/image/${encodeURIComponent(
      parsedOriginUrl
    ).replace('s3.us-west', 's3-us-west')}`
  } else if (url.startsWith('/image')) {
    rUrl = `https://www.notion.so/${url}?table=block&id=${id}&width=600&userId=&cache=v2`
  } else {
    rUrl = url
  }

  return `${rUrl}?table=block&id=${id}&width=600&userId=e376f42f-bfed-40ea-8fe1-4010b6898048&cache=v2`
}
