import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old story pages -> new article pages
      {
        source: "/docs/the-story-of-mel/pages/:pageId",
        destination: "/en/stories/the-story-of-mel/articles/:pageId",
        permanent: true,
      },
      {
        source: "/:locale/docs/the-story-of-mel/pages/:pageId",
        destination: "/:locale/stories/the-story-of-mel/articles/:pageId",
        permanent: true,
      },
      // Old docs hub -> new story landing
      {
        source: "/docs/the-story-of-mel",
        destination: "/en/stories/the-story-of-mel",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/en/stories/the-story-of-mel",
        permanent: true,
      },
      // Old codex -> new codex
      {
        source: "/docs/the-story-of-mel/codex/:path*",
        destination: "/en/stories/the-story-of-mel/codex/:path*",
        permanent: true,
      },
      // Old resources -> new resources
      {
        source: "/docs/the-story-of-mel/resources",
        destination: "/en/stories/the-story-of-mel/resources",
        permanent: true,
      },
      // Old top-level pages
      {
        source: "/glossary",
        destination: "/en/glossary",
        permanent: true,
      },
      {
        source: "/glossary/:id",
        destination: "/en/glossary/:id",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/en/posts",
        permanent: true,
      },
      {
        source: "/posts/:id",
        destination: "/en/posts/:id",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/en/about",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/contribute",
        destination: "/en/contribute",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
