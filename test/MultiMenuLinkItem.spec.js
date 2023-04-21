import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MultiMenuLinkItem from "../src/components/MultiMenuLinkItem.vue";


describe("MultiMenuLinkItem", () => {
  it("renders properly", () => {
    const wrapper = mount(MultiMenuLinkItem, {
      propsData: {
        href: "https://www.google.com"
      }
    });
    expect(wrapper.find("a").exists()).toBe(true);
    expect(wrapper.props().useRouter).toBe(false);
  });

  it("href comes from properties", () => {
    const wrapper = mount(MultiMenuLinkItem, {
      propsData: {
        href: "/",
        useRouter: true
      }
    });
    expect(wrapper.find("a").attributes("href")).toBe("/");
  });


});
