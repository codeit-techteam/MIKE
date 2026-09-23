import { author } from "@/sanity/schemaTypes/author";
import { category } from "@/sanity/schemaTypes/category";
import { post } from "@/sanity/schemaTypes/post";
import { tag } from "@/sanity/schemaTypes/tag";
import { blockContent } from "@/sanity/schemaTypes/objects/blockContent";
import { faqItem } from "@/sanity/schemaTypes/objects/faqItem";
import { seo } from "@/sanity/schemaTypes/objects/seo";

export const schemaTypes = [
  post,
  author,
  category,
  tag,
  blockContent,
  faqItem,
  seo,
];
