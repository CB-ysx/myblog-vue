/**
 * Created by joriscai on 2017/5/17.
 * This is Setting.vue
 */
<template>
  <div class="setting">
    <header class="border-shadow">
      <h3 class="title">
        {{ title }}
      </h3>
    </header>
    <!-- contents -->
    <div class="main-box" ref="main">
      <div class="password-box">
        <div class="input-field">
          <h5>Old Password:</h5>
          <div class="input-area">
            <input type="password" v-model="oPassword"/>
          </div>
        </div>
        <div class="input-field">
          <h5>New Password:</h5>
          <div class="input-area">
            <input type="password" v-model="nPassword"/>
          </div>
        </div>
        <div class="input-field">
          <h5>Verify Password:</h5>
          <div class="input-area">
            <input type="password" v-model="vPassword"/>
          </div>
        </div>
        <div class="btn-box">
          <button type="button" ref="save" class="btn error" name="save">Chang Password</button>
        </div>
      </div>
      <!-- skills -->
      <div class="password-box">
        <header class="border-shadow">
          <h4>Pay Image</h4>
        </header>
      </div>
    </div>
  </div>
</template>

<script>

let url = ''
export default {
  name: 'setting',
  data () {
    return {
      title: 'Setting',
      oPassword: '',
      nPassword: '',
      vPassword: ''
    }
  },
  methods: {
  },
  mounted () {
    url = this.$root.$data.pay
    // Get the Setting data
    this.$http.get(url).then(res => {
      console.log(res.data.contact)
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.setting{
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 1.6em;
  header{
    display: flex;
    justify-content: space-between;
    .btn-box{
      padding: 0.6em 1em;
    }
  }
  h4,h5{
    margin-bottom: 5px;
  }
  .password-box{
    .btn-box{
      margin-top: 1em;
    }
  }
}
</style>
