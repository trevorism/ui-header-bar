import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import MenuBar from "../src/components/MenuBar.vue";

const findLinkByText = (wrapper, text) =>
  wrapper.findAll("a").find((anchor) => anchor.text().trim() === text);

describe("MenuBar", () => {
  beforeEach(() => {
    document.cookie = "user_name=; Max-Age=0";
    document.cookie = "admin=; Max-Age=0";
  });

  it("renders properly", () => {
    const wrapper = mount(MenuBar);
    expect(wrapper.find("img")).toBeDefined();
  });

  it("hides the admin link from non admin users", async () => {
    const wrapper = mount(MenuBar);
    await nextTick();
    expect(findLinkByText(wrapper, "Admin")).toBeUndefined();
  });

  it("points the admin link at the admin console", async () => {
    document.cookie = "user_name=tester";
    document.cookie = "admin=true";
    const wrapper = mount(MenuBar);
    await nextTick();
    expect(findLinkByText(wrapper, "Admin").attributes("href")).toBe(
      "https://admin.auth.trevorism.com",
    );
  });
});
