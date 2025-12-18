"use client";

import { useTheme } from "next-themes";
import { type ComponentProps, useEffect, useRef } from "react";

export const Giscus = ({ ...props }: ComponentProps<"section">) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "ohprettyhak/haklee.me-comment");
    script.setAttribute("data-repo-id", "R_kgDOQNwqVA");
    script.setAttribute("data-category", "website");
    script.setAttribute("data-category-id", "DIC_kwDOQNwqVM4CxW9n-H");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-lang", "en");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "noborder_dark" : "noborder_light"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
    }

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [resolvedTheme]);

  return <section className="mt-16" ref={ref} {...props} />;
};
