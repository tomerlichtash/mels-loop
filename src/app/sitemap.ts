import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import {
  getAllStories,
  getStoryArticles,
  getAllGlossarySlugs,
  getAllPosts,
} from "@/lib/content/loaders";

const BASE_URL = process.env.SITE_URL || "https://melsloop.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  // Static pages
  const staticPages = ["about", "contact", "contribute"];
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  // Stories & articles
  const stories = await getAllStories();
  for (const storySlug of stories) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/stories/${storySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });

      entries.push({
        url: `${BASE_URL}/${locale}/stories/${storySlug}/codex`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });

      entries.push({
        url: `${BASE_URL}/${locale}/stories/${storySlug}/resources`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    const articles = await getStoryArticles(storySlug);
    for (const articleSlug of articles) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/stories/${storySlug}/articles/${articleSlug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  // Glossary
  const glossarySlugs = await getAllGlossarySlugs();
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const termSlug of glossarySlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/glossary/${termSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  // Posts
  const postSlugs = await getAllPosts();
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }
  for (const postSlug of postSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/posts/${postSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
