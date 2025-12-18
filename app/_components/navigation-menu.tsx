"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  NotebookIcon,
  PickaxeIcon,
  SparkleIcon,
  ToiletIcon,
} from "~/components/icon";
import { routes } from "~/constants/routes";

const menu = [
  { key: "Home", title: "Home", path: routes.home, icon: ToiletIcon },
  { key: "Crafts", title: "Crafts", path: routes.crafts, icon: PickaxeIcon },
  {
    key: "Thoughts",
    title: "Thoughts",
    path: routes.thoughts,
    icon: SparkleIcon,
  },
  {
    key: "Writings",
    title: "Writings",
    path: routes.articles,
    icon: NotebookIcon,
  },
];

import { type Locale, i18n } from "~/i18n-config";



type NavigationMenuProps = {
  navDict: {
    home: string;
    crafts: string;
    thoughts: string;
    writings: string;
  };
};

export const NavigationMenu = ({ navDict }: NavigationMenuProps) => {
  const fullPathname = usePathname();
  const segments = fullPathname.split("/");
  const locale = (i18n.locales.includes(segments[1] as Locale) ? segments[1] : i18n.defaultLocale) as Locale;
  
  const pathWithoutLocale = fullPathname.replace(`/${locale}`, "") || "/";

  const [hovered, setHovered] = useState<string | null>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ulElement = ulRef.current;
    if (!ulElement) {
      return;
    }

    const handleMouseLeave = () => setHovered(null);
    ulElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ulElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const items = useMemo(
    () =>
      menu.map((item) => {
        const isActive = pathWithoutLocale === item.path || (item.path !== "/" && pathWithoutLocale.startsWith(item.path));

        let href = `/${locale}${item.path === "/" ? "" : item.path}`;
        if (locale === i18n.defaultLocale) {
            href = item.path === "/" ? "/" : item.path;
        }
        
        // Determine title key based on item.key (lowercase)
        const titleKey = item.key.toLowerCase() as keyof typeof navDict;
        const title = navDict[titleKey] || item.title;

        return (
          <NavigationMenuItem
            href={href}
            isActive={isActive}
            isHovered={hovered === item.key}
            item={{ ...item, title }}
            key={item.key}
            onHover={(e) => {
              if (e.pointerType === "mouse") {
                setHovered(item.key);
              }
            }}
          />
        );
      }),
    [pathWithoutLocale, locale, hovered, navDict]
  );


  return (
    <nav className="fixed bottom-4 z-overlay flex w-full items-center justify-center">
      <ul className="flex h-fit justify-center gap-2" ref={ulRef}>
        {items}
      </ul>
    </nav>
  );
};

const NavigationMenuItem = ({
  item,
  isActive,
  isHovered,
  onHover,
  href,
}: {
  item: (typeof menu)[number];
  isActive: boolean;
  isHovered: boolean;
  onHover: (e: PointerEvent<HTMLLIElement>) => void;
  href: string;
}) => {
  const Icon = item.icon;

  const animateState = {
    backgroundColor: isActive
      ? "var(--color-menu-active-background)"
      : "var(--color-menu-background)",
    color: isActive ? "var(--color-text-primary)" : "var(--color-background)",
  };

  const initialExitState = {
    backgroundColor: "var(--color-menu-background)",
    color: "var(--color-background)",
  };

  return (
    <motion.li
      animate={animateState}
      className="corner-squircle user-select-none relative flex h-11 transform transform-gpu items-center rounded-3xl border border-menu-border backdrop-blur-xs will-change-auto"
      exit={initialExitState}
      initial={initialExitState}
      key={item.path}
      layout
      onPointerEnter={onHover}
      transition={{ duration: 0.4 }}
    >
      <Link
        className="relative z-10 flex items-center justify-center p-3 text-text-primary outline-none"
        href={href}
      >
        <Icon size={18} />
        <AnimatePresence>
          {isActive ? (
            <motion.span
              animate={{ width: "auto", opacity: 1, marginLeft: "6px" }}
              className="flex h-fit items-center justify-center overflow-x-hidden whitespace-nowrap font-semibold text-sm"
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              key={item.path}
              transition={{ duration: 0.4 }}
            >
              {item.title}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </Link>
      {isHovered && !isActive && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="corner-squircle absolute bottom-full left-1/2 mb-3 origin-bottom -translate-x-1/2 transform-gpu whitespace-nowrap rounded-lg border border-menu-border bg-background/80 px-2 py-1 font-medium text-sm text-text-primary backdrop-blur-md will-change-[transform,opacity]"
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          layoutId="nav-hover-card"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.span
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
            initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
            key={item.title}
            transition={{ duration: 0.2 }}
          >
            {item.title}
          </motion.span>
        </motion.div>
      )}
    </motion.li>
  );
};
