import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import MenuBar from "../src/components/MenuBar.vue";

const auth = vi.hoisted(() => ({
  session: null,
  login: vi.fn(),
  logout: vi.fn(),
  ensureBootstrapped: vi.fn(),
}));

vi.mock("@trevorism/ui-auth", async () => {
  const { reactive, computed } = await import("vue");
  auth.session = reactive({
    authenticated: false,
    admin: false,
    loading: false,
    username: null,
    role: null,
    permissions: null,
    tenant: null,
  });
  return {
    ensureBootstrapped: auth.ensureBootstrapped,
    useAuth: () => ({
      user: computed(() =>
        auth.session.authenticated
          ? {
              username: auth.session.username,
              role: auth.session.role,
              permissions: auth.session.permissions,
              tenant: auth.session.tenant,
              admin: auth.session.admin,
            }
          : null,
      ),
      isAuthenticated: computed(() => auth.session.authenticated),
      isAdmin: computed(() => auth.session.authenticated && auth.session.admin),
      loading: computed(() => auth.session.loading),
      ready: Promise.resolve(),
      refresh: vi.fn(),
      login: auth.login,
      logout: auth.logout,
    }),
  };
});

const findByText = (wrapper, selector, text) =>
  wrapper.findAll(selector).find((node) => node.text().trim() === text);

function signIn({ admin = false, username = "tester" } = {}) {
  auth.session.authenticated = true;
  auth.session.admin = admin;
  auth.session.username = username;
}

function signOut() {
  auth.session.authenticated = false;
  auth.session.admin = false;
  auth.session.username = null;
}

describe("MenuBar", () => {
  beforeEach(() => {
    auth.login.mockClear();
    auth.logout.mockClear();
    auth.ensureBootstrapped.mockClear();
    signOut();
  });

  it("renders properly", () => {
    const wrapper = mount(MenuBar);
    expect(wrapper.find("img")).toBeDefined();
  });

  it("bootstraps the session itself so the bar works without the plugin", () => {
    mount(MenuBar);
    expect(auth.ensureBootstrapped).toHaveBeenCalledTimes(1);
  });

  it("offers register and login while signed out", () => {
    const wrapper = mount(MenuBar);
    expect(findByText(wrapper, "button", "Login")).toBeDefined();
    expect(findByText(wrapper, "a", "Register")).toBeDefined();
  });

  it("starts the login handoff rather than linking to the login app", async () => {
    const wrapper = mount(MenuBar);

    await findByText(wrapper, "button", "Login").trigger("click");
    await flushPromises();

    expect(auth.login).toHaveBeenCalledTimes(1);
    expect(auth.login).toHaveBeenCalledWith();
  });

  it("does not send an already signed in user to login if they click during the session check", async () => {
    const wrapper = mount(MenuBar);

    const clicked = findByText(wrapper, "button", "Login").trigger("click");
    signIn();
    await clicked;
    await flushPromises();

    expect(auth.login).not.toHaveBeenCalled();
  });

  it("shows the signed in user and offers logout", async () => {
    signIn({ username: "tbrooks" });
    const wrapper = mount(MenuBar);
    await nextTick();

    expect(wrapper.text()).toContain("tbrooks");
    expect(findByText(wrapper, "button", "Logout")).toBeDefined();
    expect(findByText(wrapper, "button", "Login")).toBeUndefined();
  });

  it("calls logout rather than navigating to a logout page", async () => {
    signIn();
    const wrapper = mount(MenuBar);
    await nextTick();

    await findByText(wrapper, "button", "Logout").trigger("click");

    expect(auth.logout).toHaveBeenCalledTimes(1);
    expect(auth.logout).toHaveBeenCalledWith();
  });

  it("flips from signed out to signed in without a remount", async () => {
    const wrapper = mount(MenuBar);
    expect(findByText(wrapper, "button", "Login")).toBeDefined();

    signIn({ username: "tbrooks" });
    await nextTick();

    expect(findByText(wrapper, "button", "Login")).toBeUndefined();
    expect(wrapper.text()).toContain("tbrooks");
  });

  it("flips back to signed out when the session expires", async () => {
    signIn({ username: "tbrooks" });
    const wrapper = mount(MenuBar);
    await nextTick();

    signOut();
    await nextTick();

    expect(findByText(wrapper, "button", "Login")).toBeDefined();
    expect(wrapper.text()).not.toContain("tbrooks");
  });

  it("never shows the admin link to an anonymous visitor", async () => {
    auth.session.admin = true;
    const wrapper = mount(MenuBar);
    await nextTick();

    expect(findByText(wrapper, "a", "Admin")).toBeUndefined();
  });

  it("opens the mini menu and offers logout inside it", async () => {
    signIn({ username: "tbrooks" });
    const wrapper = mount(MenuBar);
    await nextTick();

    await wrapper.find(".rightMenu .va-icon").trigger("click");
    await nextTick();

    const sidebar = wrapper.findComponent({ name: "SideMenu" });
    expect(sidebar.exists()).toBe(true);
    expect(sidebar.text()).toContain("Logout");
  });

  it("logs out from the mini menu", async () => {
    signIn();
    const wrapper = mount(MenuBar);
    await nextTick();
    await wrapper.find(".rightMenu .va-icon").trigger("click");
    await nextTick();

    const item = wrapper
      .findComponent({ name: "SideMenu" })
      .findAll(".va-sidebar__item")
      .find((node) => node.text().trim() === "Logout");
    await item.trigger("click");

    expect(auth.logout).toHaveBeenCalledTimes(1);
  });

  it("hides the admin link from non admin users", async () => {
    signIn();
    const wrapper = mount(MenuBar);
    await nextTick();

    expect(findByText(wrapper, "a", "Admin")).toBeUndefined();
  });

  it("points the admin link at the admin console for an administrator", async () => {
    signIn({ admin: true });
    const wrapper = mount(MenuBar);
    await nextTick();

    expect(findByText(wrapper, "a", "Admin").attributes("href")).toBe(
      "https://admin.auth.trevorism.com",
    );
  });

  it("reveals the admin link when the session becomes an administrator", async () => {
    signIn();
    const wrapper = mount(MenuBar);
    await nextTick();
    expect(findByText(wrapper, "a", "Admin")).toBeUndefined();

    auth.session.admin = true;
    await nextTick();

    expect(findByText(wrapper, "a", "Admin")).toBeDefined();
  });

  it("uses absolute trevorism links when hosted somewhere else", () => {
    const wrapper = mount(MenuBar);

    expect(findByText(wrapper, "a", "Register").attributes("href")).toBe(
      "https://trevorism.com/register",
    );
  });

  it("keeps links relative when the host says it is the homepage", () => {
    const wrapper = mount(MenuBar, { props: { local: true } });

    expect(findByText(wrapper, "a", "Register").attributes("href")).toBe("/register");
    expect(findByText(wrapper, "a", "Contact").attributes("href")).toBe("/contact");
  });

  it("lets an app force absolute links", () => {
    const wrapper = mount(MenuBar, { props: { local: false } });

    expect(findByText(wrapper, "a", "Register").attributes("href")).toBe(
      "https://trevorism.com/register",
    );
  });
});
