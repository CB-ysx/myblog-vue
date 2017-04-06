/**
 * Created by joriscai on 2017/3/31.
 * This is Admin.vue
 */
<template>
  <div class="container">
    <nav class="side clearfix" :class="{ 'side-hidden': hidMenu, 'side-show': !hidMenu}">
      <header>
        <h3 title="click to edit your profile">{{ name }}</h3>
      </header>
      <section class="nav-items">
        <ul>
          <li v-for="(item, index) in navItems[0]">
            <router-link class="nav-link" :to="item">{{ index }}</router-link>
          </li>
        </ul>
        <b class="tags">
          SETTINGS
        </b>
        <ul>
          <li v-for="(item, index) in navItems[1]">
            <router-link class="nav-link" :to="item">{{ index }}</router-link>
          </li>
        </ul>
      </section>
      <footer class="nav-footer">
        <div class="logout">
          <a href="#">
            <svg class="icon logout-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1403">
              <path d="M796.8 64H544c-19.2 0-32 12.8-32 32s12.8 32 32 32h256v768H544c-19.2 0-32 12.8-32 32s12.8 32 32 32h252.8c38.4 0 67.2-28.8 67.2-64V128c0-35.2-32-64-67.2-64z m-528 480H640c19.2 0 32-12.8 32-32s-12.8-32-32-32H268.8l137.6-137.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-192 192c-3.2 3.2-6.4 6.4-6.4 9.6-3.2 6.4-3.2 16 0 25.6 3.2 3.2 3.2 6.4 6.4 9.6l192 192c6.4 6.4 16 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L268.8 544z" p-id="1736"></path>
            </svg>
          </a>
        </div>
        <div class="hid-menu" @click="menuToggle">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2176">
            <!-- <path d="M928 160h-832c-19.2 0-32-12.8-32-32s12.8-32 32-32h832c19.2 0 32 12.8 32 32s-12.8 32-32 32zM928 416H384c-19.2 0-32-12.8-32-32s12.8-32 32-32h544c19.2 0 32 12.8 32 32s-12.8 32-32 32zM928 672H384c-19.2 0-32-12.8-32-32s12.8-32 32-32h544c19.2 0 32 12.8 32 32s-12.8 32-32 32zM928 928h-832c-19.2 0-32-12.8-32-32s12.8-32 32-32h832c19.2 0 32 12.8 32 32s-12.8 32-32 32zM249.6 377.6V672c-6.4 6.4-12.8 6.4-19.2 0L70.4 524.8C64 518.4 64 518.4 64 512s0-6.4 6.4-12.8l160-147.2c6.4-6.4 12.8-6.4 19.2 0v25.6z" p-id="2814"></path> -->
            <path v-if="!hidMenu" d="M812.8 237.6L768 192 493.6 466.4 448 512l45.6 45.6L768 832l44.8-45.6L538.4 512zM320 128h64v768h-64z" p-id="2572"></path>
            <path v-else d="M211.2 237.6L256 192l274.4 274.4L576 512l-45.6 45.6L256 832l-44.8-45.6L485.6 512zM640 128h64v768h-64z" p-id="2582"></path>
          </svg>
        </div>
        <!-- <div class="hid-menu" @click="menuToggle" v-else :class="{ 'side-show': hidMenu}">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2176">
            <path d="M911.2 668 400.8 668c-24.8 0-44.8-21.6-44.8-48s20-48 44.8-48l510.4 0c24.8 0 44.8 21.6 44.8 48S936 668 911.2 668zM911.2 444 400.8 444c-24.8 0-44.8-21.6-44.8-48s20-48 44.8-48l510.4 0c24.8 0 44.8 21.6 44.8 48S936 444 911.2 444zM908 228l-781.6 0c-26.4 0-49.6-20-50.4-46.4-0.8-27.2 20.8-49.6 48-49.6l781.6 0c26.4 0 49.6 20 50.4 46.4C956.8 205.6 935.2 228 908 228zM76 667.2 76 348.8c0 0 0 0 0 0l223.2 159.2c0 0 0 0 0 0L76 667.2C76 668 76 668 76 667.2zM124 788l781.6 0c26.4 0 49.6 20 50.4 46.4 0.8 27.2-20.8 49.6-48 49.6l-781.6 0c-26.4 0-49.6-20-50.4-46.4C75.2 810.4 96.8 788 124 788z" p-id="473"></path>
            <path d="M211.2 237.6L256 192l274.4 274.4L576 512l-45.6 45.6L256 832l-44.8-45.6L485.6 512zM640 128h64v768h-64z" p-id="2582"></path>
          </svg>
        </div> -->
      </footer>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      title: 'this is a admin pages',
      name: 'Joris Cai',
      hidMenu: false,
      navItems: [{
        'Artilces': '/artilces',
        'TimeLines': '/timelines',
        'Images': '/images'
      },
      {
        'General': '/settings',
        'Profile': '/profiles'
      }]
    }
  },
  methods: {
    menuToggle () {
      this.hidMenu = !this.hidMenu
    }
  },
  mounted () {
    // console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$border-color:#dfe1e3;
$side-width: 10em;
@mixin bor-bottom ($w:1px, $cl:$border-color){
  border-bottom: $w solid $cl;
}
.container{
  display: flex;
  height: 100%;
}
html,body,#app,.container{
  height: 100%;
}
$side-bg:#f5f7f8;
@keyframes sideShow {
  from {
    margin-left: -($side-width - 2);
  }
  to {
    margin-left: 0;
  }
}
@keyframes sideHidden {
  from {
    margin-left: 0;
  }
  to {
    margin-left: -($side-width - 2);
  }
}
.side{
  width: $side-width;
  display: flex;
  flex-direction: column;
  background: $side-bg;
  height: 100%;
  &.side-show, &.side-hidden:hover{
    animation: sideShow 0.15s;
    margin-left: 0;
  }
  &.side-hidden{
    animation: sideHidden 0.15s;
    margin-left: -($side-width - 2);
  }
  header{
    @include bor-bottom;
  }
  h3{
    text-align: center;
    cursor: pointer;
  }
  $border-width: 8px;
  @at-root .nav-items{
    padding: 1em 1em 1em 0;
    font-size: 16px;
    flex-grow: 1;
    overflow-y: auto;
    @include bor-bottom;
    ul{
      padding: 0 0 1em;
    }
    li{
      padding: 0.5em 1.2em;
      &:active,.active{
        background: #88beec;
      }
      &:hover{
        background: #DEEAF5;
        border-top-right-radius: $border-width;
        border-bottom-right-radius: $border-width;
      }
    }
    .tags{
      padding-left: 1em;
      font-size: 0.7em;
    }
    .nav-link{
      color: #34495e;
    }
  }
  @at-root .nav-footer{
    display: flex;
    padding: 0.5em 0.2em;
    justify-content: space-between;
    $pad-icon: 0.5em;
    .logout{
      justify-content: flex-start;
      padding-right: $pad-icon;
      border-right: 1px solid $border-color;
    }
    .hid-menu{
      background: $side-bg;
      justify-content: flex-end;
      padding-left: $pad-icon;
      border-left: 1px solid $border-color;
    }
    .icon{
      width: 0.8em;
      height: 0.8em;
      vertical-align: middle;
      fill: #bfbfbf;
      overflow: hidden;
      font-size: 28px;
      cursor: pointer;
    }
  }
}
</style>
