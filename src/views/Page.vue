<template>
<div class="app-container container">
  <div class="wrap row">
    <app-header></app-header>
    <app-content></app-content>
  </div>

  <app-footer></app-footer>
</div>
</template>

<script>
import AppHeader from './Page.header.vue'
import AppContent from './Page.content.vue'
import AppFooter from './Page.footer.vue'

export default {
  components: {
    AppHeader,
    AppContent,
    AppFooter
  },
  mounted () {
    this.trackRoute()
  },
  watch: {
    '$route.name' (name) {
      this.trackRoute()
    }
  },
  methods: {
    trackRoute () {
      this.$gtag.pageview({
        page_location: window.location.href,
        page_path: this.$route.path,
        page_title: this.$route.name
      })
    }
  }
}
</script>

<style lang="less">
@import url("~@/styles/_variables.less");

.app-container {
  height: 100%;
  min-height: 100%;
  position: relative;

  > .wrap {
    position: relative;
    height: calc(100% - @app-footer__height);
  }
}

@media (max-width: 550px) {
  .app-container {
    overflow: hidden;

    > .wrap {
      height: calc(100% - @app-footer__height--small);
    }
  }
}

@media (max-height: 550px) {
  .app-container {
    overflow: hidden;

    > .wrap {
      height: calc(100% - @app-footer__height--extra-small);
    }
  }
}
</style>
