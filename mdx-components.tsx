import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";
import WrappedImage from "./components/common/wrapped-image.component";
import { Button, ButtonProps } from "./components/ui/button";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-12 mb-4" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-6 mb-2" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <h5 className="text-md md:text-lg font-bold mb-2" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <h6 className="text-sm md:text-md font-bold mb-2" {...props} />
  ),
  p: (props: ParagraphProps) => <p className="leading-relaxed" {...props} />,
  ol: (props: ListProps) => (
    <ol className="list-decimal text-muted-foreground pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-primary-ink underline underline-offset-[3px] decoration-primary/60 transition-colors duration-150 hover:text-foreground hover:decoration-foreground";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 border-l-[3px] border-primary pl-5 text-lg italic text-muted-foreground"
      {...props}
    />
  ),
  img: ({
    src,
    alt,
    width,
    height,
    ...props
  }: ComponentPropsWithoutRef<"img">) => {
    if (!src || typeof src !== "string") return null;
    return (
      <WrappedImage
        src={src}
        alt={alt || ""}
        width={Number(width) || 1200}
        height={Number(height) || 600}
        caption={alt}
        {...props}
      />
    );
  },
  aside: (props: ParagraphProps) => <aside className="my-6 rounded-lg border bg-card p-5" {...props} />,
  button: (props: ButtonProps) => {
    return <Button {...props} />;
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
