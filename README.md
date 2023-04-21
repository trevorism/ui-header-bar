# ui-header-bar
![Build](https://github.com/trevorism/ui-header-bar/actions/workflows/build.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/trevorism/ui-header-bar)
![GitHub language count](https://img.shields.io/github/languages/count/trevorism/ui-header-bar)
![GitHub top language](https://img.shields.io/github/languages/top/trevorism/ui-header-bar)
![npm](https://img.shields.io/npm/v/@trevorism/ui-header-bar)

Vue based header bar component for Trevorism.com apps.

## Usage
```
<script setup>
import { MenuBar } from "@trevorism/ui-header-bar";
</script>

<template>
    <MenuBar :local=false></MenuBar>
</template>
```

Assumes Vuestic, VueClickAway, and VueRouter are installed.

main.js
```javascript
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'


import VueClickAway from "vue3-click-away";
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

import './assets/main.css'


const app = createApp(App)
app.use(router)
app.use(VueClickAway);
app.use(createVuestic());
app.mount('#app')

```



### Development server
```
npm run dev
```