import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { components } from "@/mdx-components";

/**
 * MDX components for news articles: the site's shared set, minus the utility
 * classes on text elements, so the article's scoped typography
 * (news-prose.module.scss) styles headings, paragraphs, lists, quotes and
 * links in one place. Images, code highlighting, tables and buttons keep the
 * shared implementations.
 */
type AnchorProps = ComponentPropsWithoutRef<"a">;

export const newsMdxComponents = {
  ...components,
  h1: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
  h5: (props: ComponentPropsWithoutRef<"h5">) => <h5 {...props} />,
  h6: (props: ComponentPropsWithoutRef<"h6">) => <h6 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} />
  ),
  aside: (props: ComponentPropsWithoutRef<"aside">) => <aside {...props} />,
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};
