import { describe, expect, it } from "vitest";
import { projects } from "@/lib/projects";

describe("Портфолио: проекты", () => {
  it("содержит ровно IRON FORCE, NOIR / FORM, VIDEO MASTER и VANTA MOTORS", () => {
    expect(projects.map((p) => p.name)).toEqual(["IRON FORCE", "NOIR / FORM", "VIDEO MASTER", "VANTA MOTORS"]);
  });

  it("не содержит COFFEE RAF ни в каком виде", () => {
    expect(JSON.stringify(projects).toLowerCase()).not.toContain("coffee");
  });

  it("VANTA MOTORS открывает загруженный исходник сайта", () => {
    expect(projects.find((p) => p.slug === "vanta-motors")?.liveUrl).toBe("/sites/vanta-motors/index.html");
  });
});