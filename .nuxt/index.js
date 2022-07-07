import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../node_modules/@rancher/shell/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_portalvue_20888733 from 'nuxt_plugin_portalvue_20888733' // Source: ./portal-vue.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_4ac078c8 from 'nuxt_plugin_cookieuniversalnuxt_4ac078c8' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_f845cdc0 from 'nuxt_plugin_axios_f845cdc0' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_plugins_4c243c39 from 'nuxt_plugin_plugins_4c243c39' // Source: ../node_modules/@rancher/shell/core/plugins.js (mode: 'all')
import nuxt_plugin_pluginsloader_893a4216 from 'nuxt_plugin_pluginsloader_893a4216' // Source: ../node_modules/@rancher/shell/core/plugins-loader.js (mode: 'all')
import nuxt_plugin_axios_782f88f9 from 'nuxt_plugin_axios_782f88f9' // Source: ../node_modules/@rancher/shell/plugins/axios (mode: 'all')
import nuxt_plugin_tooltip_087f37c6 from 'nuxt_plugin_tooltip_087f37c6' // Source: ../node_modules/@rancher/shell/plugins/tooltip (mode: 'all')
import nuxt_plugin_vueclipboard2_47f36240 from 'nuxt_plugin_vueclipboard2_47f36240' // Source: ../node_modules/@rancher/shell/plugins/vue-clipboard2 (mode: 'all')
import nuxt_plugin_vselect_3a3bded0 from 'nuxt_plugin_vselect_3a3bded0' // Source: ../node_modules/@rancher/shell/plugins/v-select (mode: 'all')
import nuxt_plugin_directives_918e413e from 'nuxt_plugin_directives_918e413e' // Source: ../node_modules/@rancher/shell/plugins/directives (mode: 'all')
import nuxt_plugin_transitions_1f560c01 from 'nuxt_plugin_transitions_1f560c01' // Source: ../node_modules/@rancher/shell/plugins/transitions (mode: 'all')
import nuxt_plugin_vuejsmodal_933368a6 from 'nuxt_plugin_vuejsmodal_933368a6' // Source: ../node_modules/@rancher/shell/plugins/vue-js-modal (mode: 'all')
import nuxt_plugin_jsyaml_0a904724 from 'nuxt_plugin_jsyaml_0a904724' // Source: ../node_modules/@rancher/shell/plugins/js-yaml (mode: 'client')
import nuxt_plugin_resize_ac869ede from 'nuxt_plugin_resize_ac869ede' // Source: ../node_modules/@rancher/shell/plugins/resize (mode: 'client')
import nuxt_plugin_shortkey_2d8f8900 from 'nuxt_plugin_shortkey_2d8f8900' // Source: ../node_modules/@rancher/shell/plugins/shortkey (mode: 'client')
import nuxt_plugin_i18n_29c63d8a from 'nuxt_plugin_i18n_29c63d8a' // Source: ../node_modules/@rancher/shell/plugins/i18n (mode: 'all')
import nuxt_plugin_globalformatters_2035e554 from 'nuxt_plugin_globalformatters_2035e554' // Source: ../node_modules/@rancher/shell/plugins/global-formatters (mode: 'all')
import nuxt_plugin_trimwhitespace_4582b9cb from 'nuxt_plugin_trimwhitespace_4582b9cb' // Source: ../node_modules/@rancher/shell/plugins/trim-whitespace (mode: 'all')
import nuxt_plugin_extendrouter_78a78a42 from 'nuxt_plugin_extendrouter_78a78a42' // Source: ../node_modules/@rancher/shell/plugins/extend-router (mode: 'all')
import nuxt_plugin_lookup_bfea8552 from 'nuxt_plugin_lookup_bfea8552' // Source: ../node_modules/@rancher/shell/plugins/lookup (mode: 'client')
import nuxt_plugin_intnumber_9b8edf78 from 'nuxt_plugin_intnumber_9b8edf78' // Source: ../node_modules/@rancher/shell/plugins/int-number (mode: 'client')
import nuxt_plugin_nuxtclientinit_38736cb6 from 'nuxt_plugin_nuxtclientinit_38736cb6' // Source: ../node_modules/@rancher/shell/plugins/nuxt-client-init (mode: 'client')
import nuxt_plugin_replaceall_605937ca from 'nuxt_plugin_replaceall_605937ca' // Source: ../node_modules/@rancher/shell/plugins/replaceall (mode: 'all')
import nuxt_plugin_backbutton_47194dca from 'nuxt_plugin_backbutton_47194dca' // Source: ../node_modules/@rancher/shell/plugins/back-button (mode: 'all')
import nuxt_plugin_plugin_b292f9e0 from 'nuxt_plugin_plugin_b292f9e0' // Source: ../node_modules/@rancher/shell/plugins/plugin (mode: 'client')
import nuxt_plugin_codemirrorloader_bfa995d2 from 'nuxt_plugin_codemirrorloader_bfa995d2' // Source: ../node_modules/@rancher/shell/plugins/codemirror-loader (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"kubewarden","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"hid":"icon","rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.png"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_portalvue_20888733 === 'function') {
    await nuxt_plugin_portalvue_20888733(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_4ac078c8 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_4ac078c8(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_f845cdc0 === 'function') {
    await nuxt_plugin_axios_f845cdc0(app.context, inject)
  }

  if (typeof nuxt_plugin_plugins_4c243c39 === 'function') {
    await nuxt_plugin_plugins_4c243c39(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginsloader_893a4216 === 'function') {
    await nuxt_plugin_pluginsloader_893a4216(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_782f88f9 === 'function') {
    await nuxt_plugin_axios_782f88f9(app.context, inject)
  }

  if (typeof nuxt_plugin_tooltip_087f37c6 === 'function') {
    await nuxt_plugin_tooltip_087f37c6(app.context, inject)
  }

  if (typeof nuxt_plugin_vueclipboard2_47f36240 === 'function') {
    await nuxt_plugin_vueclipboard2_47f36240(app.context, inject)
  }

  if (typeof nuxt_plugin_vselect_3a3bded0 === 'function') {
    await nuxt_plugin_vselect_3a3bded0(app.context, inject)
  }

  if (typeof nuxt_plugin_directives_918e413e === 'function') {
    await nuxt_plugin_directives_918e413e(app.context, inject)
  }

  if (typeof nuxt_plugin_transitions_1f560c01 === 'function') {
    await nuxt_plugin_transitions_1f560c01(app.context, inject)
  }

  if (typeof nuxt_plugin_vuejsmodal_933368a6 === 'function') {
    await nuxt_plugin_vuejsmodal_933368a6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_jsyaml_0a904724 === 'function') {
    await nuxt_plugin_jsyaml_0a904724(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_resize_ac869ede === 'function') {
    await nuxt_plugin_resize_ac869ede(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_shortkey_2d8f8900 === 'function') {
    await nuxt_plugin_shortkey_2d8f8900(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_29c63d8a === 'function') {
    await nuxt_plugin_i18n_29c63d8a(app.context, inject)
  }

  if (typeof nuxt_plugin_globalformatters_2035e554 === 'function') {
    await nuxt_plugin_globalformatters_2035e554(app.context, inject)
  }

  if (typeof nuxt_plugin_trimwhitespace_4582b9cb === 'function') {
    await nuxt_plugin_trimwhitespace_4582b9cb(app.context, inject)
  }

  if (typeof nuxt_plugin_extendrouter_78a78a42 === 'function') {
    await nuxt_plugin_extendrouter_78a78a42(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lookup_bfea8552 === 'function') {
    await nuxt_plugin_lookup_bfea8552(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_intnumber_9b8edf78 === 'function') {
    await nuxt_plugin_intnumber_9b8edf78(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtclientinit_38736cb6 === 'function') {
    await nuxt_plugin_nuxtclientinit_38736cb6(app.context, inject)
  }

  if (typeof nuxt_plugin_replaceall_605937ca === 'function') {
    await nuxt_plugin_replaceall_605937ca(app.context, inject)
  }

  if (typeof nuxt_plugin_backbutton_47194dca === 'function') {
    await nuxt_plugin_backbutton_47194dca(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_plugin_b292f9e0 === 'function') {
    await nuxt_plugin_plugin_b292f9e0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_codemirrorloader_bfa995d2 === 'function') {
    await nuxt_plugin_codemirrorloader_bfa995d2(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
