"use client";
import { BlogPostContent } from "./BlogPostContent";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogPostClientWrapperProps {
  source: MDXRemoteSerializeResult;
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
