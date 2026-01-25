"use client";

import dynamic from "next/dynamic";
import React from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const BlogPostClientWrapper = dynamic(() => import("./BlogPostClientWrapper"), { ssr: false });

interface ClientMDXLoaderProps {
  source: MDXRemoteSerializeResult;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  image?: string;
  validSlugs?: string[];
}

export default function ClientMDXLoader(props: ClientMDXLoaderProps) {
  return <BlogPostClientWrapper {...props} />;
}
