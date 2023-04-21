import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SideMenu from "../src/components/SideMenu.vue";

describe("MenuBar", () => {
  it("renders a link properly", () => {
    const wrapper = mount(SideMenu, {
      propsData: {
        data: [{name: "test", link: "https://www.google.com"}]
      }
    });
    expect(wrapper.find("h2").text()).toContain("test");
    expect(wrapper.find("a").text()).toContain("test");
    expect(wrapper.find("a").attributes('href')).toBe("https://www.google.com");

  });

  it("renders a local link properly", () => {
    const wrapper = mount(SideMenu, {
      propsData: {
        data: [{name: "test", link: "/"}]
      }
    });
    expect(wrapper.find("h2").text()).toContain("test");
    expect(wrapper.find("a").text()).toContain("test");
    expect(wrapper.find("a").attributes('href')).toBe("/");

  });
});
