import { graphql } from "gatsby"
import React from "react"
import { getSrc } from "gatsby-plugin-image"
import { Footer } from "../components/Footer"
import SiteNav from "../components/header/SiteNav"
import { PostCard } from "../components/PostCard"
import { Wrapper } from "../components/Wrapper"
import IndexLayout from "../layouts"
import {
  inner,
  outer,
  PostFeed,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteNavMain,
  SiteArchiveHeader,
  ResponsiveHeaderBackground,
  SiteHeaderBackground,
} from "../styles/shared"
import { Helmet } from "react-helmet"
import config from "../utils/siteConfig"

const Tags = ({ pageContext, data, location }) => {
  const tag = pageContext.slug ? pageContext.slug : ""
  const totalCount = data.allGhostPost.edges.length
  const { edges } = data.allGhostPost
  const tagData = data.ghostTag
  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tag} - {config.title}
        </title>
        <meta
          name="description"
          content={tagData.description ? tagData.description : ""}
        />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {config.facebook && (
          <meta property="article:publisher" content={config.facebook} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tag} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split("https://twitter.com/")[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          className="site-archive-header"
          css={[SiteHeader, SiteArchiveHeader]}
        >
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
          <ResponsiveHeaderBackground
            css={[outer, SiteHeaderBackground]}
            backgroundImage={getSrc(tagData?.node?.image)}
            className="site-header-background"
          >
            <SiteHeaderContent css={inner} className="site-header-content">
              <SiteTitle className="site-title">{tagData.name}</SiteTitle>
              <SiteDescription className="site-description">
                {tagData.description ? (
                  tagData.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && "1 post"}
                    {totalCount === 0 && "No posts"}
                  </>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </ResponsiveHeaderBackground>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => (
                <PostCard key={node.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  )
}

export default Tags

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!) {
    ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
