"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import {
  BrandLogo,
  CircleDashIcon,
  MoonIcon,
  SunglassesIcon,
  SunIcon,
} from "~/components/icon";
import { routes } from "~/constants/routes";
import { useIsClient } from "~/hooks/use-is-client";

export const Header = () => {
  const { resolvedTheme: currentTheme, setTheme } = useTheme();

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5">
      <Link
        className="transition-transform duration-150 active:scale-[0.98]"
        href={routes.home}
      >
        <motion.div
          className="relative flex h-13 w-13 items-center justify-center rounded-full border border-neutral-100 bg-neutral-50"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            className="text-neutral-950"
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            variants={{
              initial: { scale: 1, rotateX: 0, rotateY: 0, z: 0 },
              hover: { scale: 1.2, rotateX: -16, rotateY: -16, z: 20 },
            }}
          >
            <BrandLogo height={36} width={30} />
          </motion.div>

          <motion.div
            className="absolute top-0 left-2.5 text-neutral-950"
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            variants={{
              initial: { opacity: 0, rotateX: 0, rotateY: 0, translateY: 0 },
              hover: { opacity: 1, rotateX: -16, rotateY: -16, translateY: 10 },
            }}
          >
            <SunglassesIcon height={10} width={24} />
          </motion.div>
        </motion.div>
      </Link>

      <div className="flex items-center gap-4 text-text-primary">
        <button
          className={twMerge(
            "touch-hitbox cursor-pointer rounded-md p-1 transition-all duration-150",
            "hover:bg-menu-background active:scale-[0.98]"
          )}
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
          type="button"
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            key={currentTheme}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {useIsClient() ? (
              // biome-ignore lint/style/noNestedTernary: Improves readability in this case.
              currentTheme === "light" ? (
                <MoonIcon height={22} width={22} />
              ) : (
                <SunIcon height={22} width={22} />
              )
            ) : (
              <CircleDashIcon height={22} width={22} />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  );
};
