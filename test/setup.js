import { config } from '@vue/test-utils'
import { createVuestic } from 'vuestic-ui'
import VueClickAway from "vue3-click-away";

config.global.plugins.push(createVuestic())
config.global.plugins.push(VueClickAway)