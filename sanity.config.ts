import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { postSchema } from "./src/sanity/schemaTypes/post";

export default defineConfig({
  name: "marc-portfolio",
  title: "Marc FC · Blog CMS",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool(),
    visionTool(),
    markdownSchema(),
  ],

  schema: {
    types: [postSchema],
  },
});