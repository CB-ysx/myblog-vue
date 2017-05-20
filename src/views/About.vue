<template>
  <div class="about container content">
    <div class="main">
      <!-- <h4>{{ state.name }} </h4><br> -->
      <h5 class="motto">{{ state.title }}</h5>
      <h4 class="border-shadow">ABOUT ME</h4>
      {{ state.intro }} <br>
      <h4 class="border-shadow">SKILLS</h4>
      <div class="skills-box">
        <span class="tag" v-for="skill in state.skills">{{ skill.skill }}</span>
      </div>
      <h4 class="border-shadow">CONTACT</h4>
      <ul class="contact">
        <li v-for="(contact, index) in state.contact">{{ contact.name }}: <a class="underline" :href="contact.url">{{ contact.alias }}</a></li>
      </ul>


    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      state: {
        name: '',
        title: '',
        intro: '',
        skills: '',
        contact: ''
      }
    }
  },
  mounted () {
    // get the timeLine datas
    this.$http.get(this.$root.$data.about).then(res => {
      console.log(res.data)
      this.state = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.motto{
  text-align: center;
  font-weight: 500;
  color: #65737E;
}
.underline{
  text-decoration: underline;
  &:hover{
    text-decoration: underline;
  }
}
.border-shadow{
  border-bottom: 1px solid rgba(0,0,0,.25);
}
.skills-box{
  word-break: keep-all;
  word-wrap: break-word;
  // text-align: center;
  .tag{
    background: #F9F9F9;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.34);
    display: inline-block;
    margin: 2px 9px 12px;
    padding: 5px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
