const path = require("path")
const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            tags {
              name
            }
          }
        }
      }
      allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            url
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    throw new Error(result.errors)
  }

  const tags = result.data.allGhostTag.edges
  const authors = result.data.allGhostAuthor.edges
  // const pages = result.data.allGhostPage.edges
  const posts = result.data.allGhostPost.edges

  // Create paginated index
  // TODO: new pagination
  const postsPerPage = 1000
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blog" : `blog/${i + 1}`,
      component: path.resolve("./src/templates/index.jsx"),
      context: {
        items: posts,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  posts.forEach(({ node }, index) => {
    const { slug, layout } = node
    const prev = index === 0 ? null : posts[index - 1].node
    const next = index === posts.length - 1 ? null : posts[index + 1].node

    createPage({
      path: `blog/${slug}`,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || "post"}.jsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        // primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : "",
      },
    })
  })

  // Create tag pages
  const tagTemplate = path.resolve("./src/templates/tags.jsx")

  tags.forEach((tag, i) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.node.slug)}/`,
      component: tagTemplate,
      context: {
        slug: tag.node.slug,
      },
    })
  })

  // Create author pages
  const authorTemplate = path.resolve("./src/templates/author.jsx")
  authors.forEach(edge => {
    createPage({
      path: `/author/${_.kebabCase(edge.node.slug)}/`,
      component: authorTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
