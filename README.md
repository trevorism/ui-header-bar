# ui-header-bar
![Build](https://github.com/trevorism/ui-header-bar/actions/workflows/build.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/trevorism/ui-header-bar)
![GitHub language count](https://img.shields.io/github/languages/count/trevorism/ui-header-bar)
![GitHub top language](https://img.shields.io/github/languages/top/trevorism/ui-header-bar)
![npm](https://img.shields.io/npm/v/@trevorism/ui-header-bar)

Vue based header bar component for Trevorism.com apps.

## Version 6 requires a migrated app

The bar reads the session from [`@trevorism/ui-auth`](https://www.npmjs.com/package/@trevorism/ui-auth)
rather than from cookies, and Login and Logout go through the one-time code handoff. That means the
app must serve the `/api/auth/*` routes, which it gets from the `com.trevorism:micronaut-ui-auth`
backend dependency. An app that has not been migrated should stay on 5.x.

The bar calls `ensureBootstrapped()` itself, so it renders the right state even if the app forgets
`app.use(TrevorismAuth)`. Without the plugin there is no axios auto-refresh, so install it.

`@trevorism/ui-auth` is a peer dependency on purpose. It keeps the session in a single module-level
store, and two copies on disk would leave the bar reading a store the app never populated.

## Usage

```
<script setup>
import { MenuBar } from "@trevorism/ui-header-bar";
</script>

<template>
    <MenuBar></MenuBar>
</template>
```

`MenuBar` and `SideMenu` are named exports; `MenuBar` is also the default export. The `local` prop
is gone. Links are relative when the bar is running on trevorism.com and absolute everywhere else,
which is what the prop was doing by hand.

Assumes Vuestic, VueClickAway, VueRouter and the Trevorism auth plugin are installed.

main.js
```javascript
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { TrevorismAuth } from '@trevorism/ui-auth'
import VueClickAway from "vue3-click-away";
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

import './assets/main.css'


const app = createApp(App)
app.use(router)
app.use(TrevorismAuth, { router })
app.use(VueClickAway);
app.use(createVuestic());
app.mount('#app')

```

### Development server
```
npm run dev
```
