import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import MenuBar from "../src/components/MenuBar.vue";
import { ensureBootstrapped, useAuth } from "@trevorism/ui-auth";

describe("contract with the real @trevorism/ui-auth", () => {
  it("exports everything the bar imports", () => {
    expect(typeof useAuth).toBe("function");
    expect(typeof ensureBootstrapped).toBe("function");
  });

  it("returns every value the bar destructures", () => {
    const session = useAuth();

    for (const name of ["user", "isAuthenticated", "isAdmin", "loading", "ready"]) {
      expect(session[name], name).toBeDefined();
    }
    expect(typeof session.login).toBe("function");
    expect(typeof session.logout).toBe("function");
  });

  it("renders the signed out bar against the real library with no mocking", async () => {
    const wrapper = mount(MenuBar);
    await nextTick();

    const buttons = wrapper.findAll("button").map((button) => button.text().trim());
    expect(buttons).toContain("Login");
    expect(wrapper.findAll("a").map((anchor) => anchor.text().trim())).toContain("Register");
  });
});
