<template>
  <header class="clearfix">
    <a class="logo vertical-center-content">{{ title }}</a>
    <nav class="nav">
      <ul>
        <li v-for="(item, index) in items">
          <router-link class="nav-link" :class="{ active: index === selected }" @click="choose(index)" :to="item.name">{{item.name}}</router-link>
          <!-- <a class="nav-link" :class="{ active: index === selected }" @click="choose(index)" :href="item.url">{{item.name}}</a> -->
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  data () {
    return {
      title: 'joris\' blog',
      items: [
        {
          name: 'Home'
        },
        {
          name: 'TimeLine'
        },
        {
          name: 'Images'
        },
        {
          name: 'About'
        }
      ],
      selected: 0
    }
  },
  methods: {
    choose: function (index) {
      this.selected = index
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .container{
    max-width: 840px;
    margin: 0 auto;
  }
  header{
    padding: 1em 0.5em;
    box-shadow: 0 0 4px rgba(0,0,0,.25);
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    .logo{
      font-size: 1.5em;
      color: #2c3e50;
      font-family: Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif;
      font-weight: 500;
    }
  }
  .content{
    padding-top: 60px;
  }
  .nav{
    display: inline-block;
    float: right;
    text-align: center;
  }
  .nav-link{
    display: inline-block;
    padding-bottom: 3px;
    text-decoration: none;
    font-weight: 600;
    color: #34495e;
    &.active,&:hover{
      border-bottom: 3px solid #42b983;
    }
  }
  nav ul{
    list-style: none;
  }
  nav li{
    display: inline-block;
    margin: 0 .6em;
  }
</style>
