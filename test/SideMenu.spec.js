import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SideMenu from "../src/components/SideMenu.vue";

describe("MenuBar", () => {
  it("is true", () => {
    expect(true).toBe(true);
  });

  it("renders a link properly", () => {
    const wrapper = mount(SideMenu, {
      props: {
        data: [{ name: "test", link: "https://www.google.com" }],
      },
    });
    expect(wrapper.find("h2").text()).toContain("test");
    expect(wrapper.find("a").text()).toContain("test");
    expect(wrapper.find("a").attributes("href")).toBe("https://www.google.com");
  });

  it("renders a local link properly", () => {
    const wrapper = mount(SideMenu, {
      props: {
        data: [{ name: "test", link: "/" }],
      },
    });
    expect(wrapper.find("h2").text()).toContain("test");
    expect(wrapper.find("a").text()).toContain("test");
    expect(wrapper.find("a").attributes("href")).toBe("/");
  });

  it("fires a top level action item instead of navigating", async () => {
    const action = vi.fn();
    const wrapper = mount(SideMenu, { props: { data: [{ name: "Logout", action }] } });

    await wrapper.find(".va-sidebar__item").trigger("click");

    expect(action).toHaveBeenCalledTimes(1);
    expect(wrapper.find("a").exists()).toBe(false);
  });

  it("fires an action item nested under a heading", async () => {
    const action = vi.fn();
    const wrapper = mount(SideMenu, {
      props: { data: [{ name: "Account", children: [{ name: "Logout", action }] }] },
    });

    await wrapper.find(".va-sidebar__item").trigger("click");

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("still renders links alongside actions", () => {
    const wrapper = mount(SideMenu, {
      props: {
        data: [
          {
            name: "Account",
            children: [
              { name: "Register", link: "https://trevorism.com/register" },
              { name: "Logout", action: vi.fn() },
            ],
          },
        ],
      },
    });

    expect(wrapper.find("a").attributes("href")).toBe("https://trevorism.com/register");
    expect(wrapper.findAll(".va-sidebar__item")).toHaveLength(2);
  });
});
