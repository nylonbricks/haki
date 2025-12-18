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

export const NavigationMenu = () => {
  const pathname: string = `${usePathname().split("/")[1]}`;
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
        const isActive: boolean = `/${pathname}` === item.path;

        return (
          <NavigationMenuItem
            isActive={isActive}
            isHovered={hovered === item.key}
            item={item}
            key={item.key}
            onHover={(e) => {
              if (e.pointerType === "mouse") {
                setHovered(item.key);
              }
            }}
          />
        );
      }),
    [pathname, hovered]
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
}: {
  item: (typeof menu)[number];
  isActive: boolean;
  isHovered: boolean;
  onHover: (e: PointerEvent<HTMLLIElement>) => void;
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
        href={item.path}
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
