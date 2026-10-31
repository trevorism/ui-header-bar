import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import packageJson from "../package.json";

const STYLESHEET_PATH = resolve(packageJson.exports["./style.css"]);
const BUNDLE_PATH = resolve(packageJson.exports["."].import);

function withoutBuildMarkers(css) {
  return css.replace(/\/\*\$vite\$:\d+\*\//g, "").trim();
}

function injectedCss() {
  const bundle = readFileSync(BUNDLE_PATH, "utf8");
  return withoutBuildMarkers(bundle.match(/createTextNode\(`([\s\S]*?)`\)/)[1]);
}

describe("published stylesheet", () => {
  it("exists at the path the package exports", () => {
    expect(existsSync(STYLESHEET_PATH), `${STYLESHEET_PATH} is missing; run npm run build first`).toBe(true);
  });

  it("is the same css the bar injects at runtime", () => {
    expect(withoutBuildMarkers(readFileSync(STYLESHEET_PATH, "utf8"))).toBe(injectedCss());
  });

  it("carries the rules that hide the mobile menu on wide screens", () => {
    expect(readFileSync(STYLESHEET_PATH, "utf8")).toContain(".mini-menu");
  });
});
