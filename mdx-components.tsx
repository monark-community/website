import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";
import WrappedImage from "./components/shared/wrapped-image.component";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-3xl md:text-4xl font-bold mb-2" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl md:text-3xl font-bold mb-2" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl md:text-2xl font-bold mb-2" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-lg md:text-xl font-bold mb-2" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <h5 className="text-md md:text-lg font-bold mb-2" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <h6 className="text-sm md:text-md font-bold mb-2" {...props} />
  ),
  p: (props: ParagraphProps) => <p className="leading-snug" {...props} />,
  ol: (props: ListProps) => (
    <ol className="list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-primary hover:brightness-125 underline underline-offset-2 transition-colors duration-200";
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
      className="font-lg italic border-l-[4px] border-primary pl-6 mt-6 mr-0 mb-6 ml-6"
      {...props}
    />
  ),
  img: ({ src, alt, width, height, ...props }: ComponentPropsWithoutRef<"img">) => {
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
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
