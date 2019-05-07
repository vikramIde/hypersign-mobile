<template lang='pug'>
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-btn(
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        )
          q-icon(name="menu")

        q-toolbar-title
          | Quasar App
        div
          | Quasar v{{ $q.version }}

    q-drawer(
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    )
      q-list
        q-item-label
          | Essential Links
        q-item(
          clickable
          tag="a"
          target="_blank"
          href="http:v1.quasar-framework.org"
        )
          q-item-section(avatar)
            q-icon(name="school")
          q-item-section
            q-item-label
            | Docs
            q-item-label(caption)
            | v1.quasar-framework.org
        q-item(clickable tag="a" target="_blank" href="https:github.comquasarframework")
          q-item-section(avatar)
            q-icon(name="code")
          q-item-section
            q-item-label
            | Github
            q-item-label(caption)
            |  github.comquasarframework
          q-item-section
        q-item
        q-item(clickable tag="a" target="_blank" href="http:chat.quasar-framework.org")
          q-item-section(avatar)
            q-icon(name="chat")
          q-item-section
            q-item-label
            | Discord Chat Channel
            q-item-label(caption)
            | chat.quasar-framework.org
        q-item(clickable tag="a" target="_blank" href="https:forum.quasar-framework.org")
          q-item-section(avatar)
            q-icon(name="record_voice_over")
          q-item-section
            q-item-label
            | Forumq-item-label
            q-item-label(caption)
            | forum.quasar-framework.org
        q-item(clickable tag="a" target="_blank" href="https:twitter.comquasarframework")
          q-item-section(avatar)
            q-icon(name="rss_feed")
          q-item-section
            q-item-label
            | Twitter
            q-item-label(caption) @quasarframeworkq-item-label

    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
