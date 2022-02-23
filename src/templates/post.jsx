import { format } from "date-fns"
import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import { lighten, setLightness } from "polished"
import React from "react"
import { Helmet } from "react-helmet"

import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { Footer } from "../components/Footer"
import SiteNav, { SiteNavMain } from "../components/header/SiteNav"
import PostContent from "../components/PostContent"
import { ReadNext } from "../components/ReadNext"
import { Subscribe } from "../components/subscribe/Subscribe"
import { Wrapper } from "../components/Wrapper"
import IndexLayout from "../layouts"
import { colors } from "../styles/colors"
import { inner, outer, SiteMain } from "../styles/shared"
import config from "../utils/siteConfig"
import { AuthorList } from "../components/AuthorList"

const PageTemplate = ({ data, pageContext, location }) => {
  const post = data.ghostPost

  const date = new Date(post.created_at)
  // 2018-08-20
  const datetime = format(date, "yyyy-MM-dd")
  // 20 AUG 2018
  const displayDatetime = format(date, "dd LLL yyyy")

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.title}</title>

        <meta name="description" content={post.excerpt || post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.excerpt || post.excerpt}
        />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {post.image && (
          <meta
            property="og:image"
            content={`${config.siteUrl}${post.feature_image}`}
          />
        )}
        <meta property="article:published_time" content={post.created_at} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.tags && <meta property="article:tag" content={post.tags[0]} />}

        {config.facebook && (
          <meta property="article:publisher" content={config.facebook} />
        )}
        {config.facebook && (
          <meta property="article:author" content={config.facebook} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.excerpt || post.excerpt}
        />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {post.image && (
          <meta
            name="twitter:image"
            content={`${config.siteUrl}${post.feature_image}`}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.authors[0].name} />
        <meta name="twitter:label2" content="Filed under" />
        {post.tags && <meta name="twitter:data2" content={post.tags[0]} />}
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split("https://twitter.com/")[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split("https://twitter.com/")[1]}`}
          />
        )}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.image && NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags">
                  {post.tags &&
                    post.tags.length > 0 &&
                    config.showAllTags &&
                    post.tags.map((tag, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <>, &nbsp;</>}
                        <Link to={`/tags/${_.kebabCase(tag.name)}/`}>
                          {tag.name}
                        </Link>
                      </React.Fragment>
                    ))}
                  {post.tags && post.tags.length > 0 && !config.showAllTags && (
                    <Link to={`/tags/${_.kebabCase(post.tags[0].name)}/`}>
                      {post.tags[0].name}
                    </Link>
                  )}
                </PostFullTags>
                <PostFullTitle className="post-full-title">
                  {post.title}
                </PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorList authors={post.authors} tooltip="large" />
                    <section className="post-full-byline-meta">
                      <h4 className="author-name">
                        {post.authors.map((author, idx) => (
                          <Link
                            key={idx}
                            to={`/author/${_.kebabCase(author.name)}/`}
                          >
                            {author.name}
                          </Link>
                        ))}
                      </h4>
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span>
                          {post.reading_time} MIN READ
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {post.feature_image && (
                <PostFullImage>
                  <img
                    src={post.feature_image}
                    style={{ height: "100%", width: "100%" }}
                    alt={post.title}
                  />
                </PostFullImage>
              )}
              <PostContent html={post.html} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}
            </article>
          </div>
        </main>

        <ReadNext
          currentPageSlug={location.pathname}
          tags={post.tags}
          relatedPosts={data.allGhostPost}
          pageContext={pageContext}
        />

        <Footer />
      </Wrapper>
    </IndexLayout>
  )
}

export const query = graphql`
  query ($slug: String) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
    allGhostPost(sort: { order: DESC, fields: [published_at] }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    // background: #fff;
    background: ${colors.darkmode};
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`

// eslint-disable-next-line
export const PostFull = css`
  position: relative;
  z-index: 50;
`

// eslint-disable-next-line
export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`

// eslint-disable-next-line
export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`

const PostFullTags = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;
`

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  // color: var(--midgrey);
  color: ${lighten("0.1", colors.midgrey)};
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten("0.1", colors.midgrey)};
  }
`

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten("0.1", colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten("0.1", colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten("0.1", colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  /* border-top-color: color(var(--darkmode) l(+15%)); */
  border-top-color: ${lighten("0.15", colors.darkmode)};

  .post-full-byline-meta h4 a {
    color: rgba(255, 255, 255, 0.75);
  }

  .post-full-byline-meta h4 a:hover {
    color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten("0.15", colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`

// eslint-disable-next-line
export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  // color: ${setLightness("0.05", colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  color: rgba(255, 255, 255, 0.9);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`

const PostFullImage = styled.figure`
  margin: 25px 0 50px;
  height: auto;
  width: 100%;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;
`

export default PageTemplate
