"use client";
import { BlogPostContent } from "./BlogPostContent";

interface BlogPostClientWrapperProps {
  rawContent?: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  image?: string;
  validSlugs?: string[];
}

export default function BlogPostClientWrapper(props: BlogPostClientWrapperProps) {
  return <BlogPostContent {...props} />;
}
