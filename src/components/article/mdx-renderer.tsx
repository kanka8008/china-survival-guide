import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface MdxRendererProps {
  source: string;
}

function TableWrapper({ children, ...props }: ComponentProps<"table">) {
  return (
    <div className="table-wrapper overflow-x-auto my-6">
      <table {...props} className="min-w-full text-sm">
        {children}
      </table>
    </div>
  );
}

const components = {
  table: TableWrapper,
};

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className={cn("article-content max-w-none")}>
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </div>
  );
}
