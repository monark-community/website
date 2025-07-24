import React, { ReactNode } from "react";
import Image from "next/image";
import "./slideshow.component.scss";
import { NavLink } from "../navlink/navlink";

type Props = {
  items: Array<{
    name: string;
    img: string;
    href?: string;
  }>;
  itemsSize: {
    width: number;
    height: number;
  };
  itemsSpacing?: number;
  animationDuration?: number;
  className?: string;
};

function Slideshow({
  items,
  itemsSize,
  itemsSpacing,
  animationDuration,
  className,
}: Props) {
  const LinkWrap = ({
    children,
    href,
  }: {
    children: ReactNode;
    href?: string;
  }) => {
    if (href) {
      return (
        <NavLink
          href={href}
          style={
            itemsSpacing ? { margin: `0 ${itemsSpacing}px !important` } : {}
          }
        >
          {children}
        </NavLink>
      );
    }
    return children;
  };

  const renderItems = () => {
    return (
      <div
        className="logos-slide"
        style={
          animationDuration
            ? { animationDuration: `${animationDuration}s` }
            : {}
        }
      >
        {items.map((item) => (
          <LinkWrap href={item.href} key={item.name}>
            <Image
              src={item.img}
              alt={item.name}
              title={item.name}
              width={itemsSize.width}
              height={itemsSize.height}
            />
          </LinkWrap>
        ))}
      </div>
    );
  };

  return (
    <div className={className || ""}>
      <div className="slideshow-container">
        <div className="slideshow-logos">
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
