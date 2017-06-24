/**
 * Created by joriscai on 2017/3/31.
 * This is Admin.vue
 */
<template>
  <div class="admin container">
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
        <!-- 退出 -->
        <div class="logout" @click="logout">
          <svg class="icon logout-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1403">
            <path d="M796.8 64H544c-19.2 0-32 12.8-32 32s12.8 32 32 32h256v768H544c-19.2 0-32 12.8-32 32s12.8 32 32 32h252.8c38.4 0 67.2-28.8 67.2-64V128c0-35.2-32-64-67.2-64z m-528 480H640c19.2 0 32-12.8 32-32s-12.8-32-32-32H268.8l137.6-137.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-192 192c-3.2 3.2-6.4 6.4-6.4 9.6-3.2 6.4-3.2 16 0 25.6 3.2 3.2 3.2 6.4 6.4 9.6l192 192c6.4 6.4 16 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L268.8 544z" p-id="1736"></path>
          </svg>
        </div>
        <!-- 收起、展开侧边栏 -->
        <div class="hid-menu" @click="menuToggle">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2176">
            <path v-if="!hidMenu" d="M812.8 237.6L768 192 493.6 466.4 448 512l45.6 45.6L768 832l44.8-45.6L538.4 512zM320 128h64v768h-64z" p-id="2572"></path>
            <path v-else d="M211.2 237.6L256 192l274.4 274.4L576 512l-45.6 45.6L256 832l-44.8-45.6L485.6 512zM640 128h64v768h-64z" p-id="2582"></path>
          </svg>
        </div>
      </footer>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
let url = ''
export default {
  name: 'admin',
  data () {
    return {
      title: 'this is a admin pages',
      name: 'Joris Cai',
      hidMenu: false,
      navItems: [{
        'Articles': '/articles',
        'TimeLines': '/timelines',
        'Images': '/images'
      },
      {
        'General': '/settings',
        'Profile': '/profile'
      }]
    }
  },
  beforeRouteEnter (to, from, next) {
    // url = window.blogUrl.logout
    let auth = localStorage.getItem('login')
    console.log(auth)
    if (auth === 'false' || !auth) {
      next({ path: '/login' })
    } else {
      console.log('else')
      next()
    }
  },
  methods: {
    menuToggle () {
      this.hidMenu = !this.hidMenu
    },
    logout () {
      this.$http.get(url).then(res => {
        console.log(url)
        if (res.status === 200) {
          localStorage.removeItem('login')
          this.$router.push({path: '/login'})
        }
      }, res => {
        console.log(res.status)
      })
    }
  },
  mounted () {
    url = window.blogUrl.logout
    // console.log(this.$el.classList)
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
  max-height: 100%;
  flex-grow: 1;
}
html,body,#app,.container{
  height: 100%;
  overflow-y: hidden;
}
.content{
  display: flex;
  flex: 1;
  // flex-grow: 1;
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
  border-right: 1px solid #dfe1e3;
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
    @at-root .icon{
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
