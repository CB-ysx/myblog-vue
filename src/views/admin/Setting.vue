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
      <!-- modify password -->
      <div class="password-box">
        <div class="input-field">
          <h5>Old Password:</h5>
          <div class="input-area">
            <input :class="{ 'red-border': error[0]}" type="password" v-model="oPassword"/>
          </div>
        </div>
        <div class="input-field">
          <h5>New Password:</h5>
          <div class="input-area">
            <input :class="{ 'red-border': error[1]}" type="password" v-model="nPassword"/>
          </div>
        </div>
        <div class="input-field">
          <h5>Verify Password:</h5>
          <div class="input-area">
            <input :class="{ 'red-border': error[2]}" type="password" v-model="vPassword" @keyup.enter="submit"/>
          </div>
        </div>
        <div class="btn-box">
          <button type="button" ref="save" class="btn error" @click="submit">Chang Password</button>
        </div>
      </div>
      <!-- pay images -->
      <div class="pay-images-box">
        <header class="border-shadow">
          <h4>Pay Image</h4>
        </header>
        <div class="pay-images">
          <!-- show -->
          <div class="pay" v-for="(payImage, index) in payImages" @contextmenu.prevent="$refs.ctxMenu.open($event, {id: payImage.id, index: index, title: payImage.title})">
            <img :src="payImage.url" :alt="payImage.title" :title="payImage.title">
            <h5 class="title">
              <div v-show="editPayImgId !== payImage.id" class="title-text">
                {{ payImage.title }}
              </div>
              <input v-if="editPayImgId === payImage.id" v-focus type="text" v-model="editPayImgVal" @keyup.enter="editPayImg(this)">
            </h5>
          </div>
          <!-- upload image show -->
          <div class="pay" v-for="(file, index) in files" @contextmenu.prevent="$refs.ctxMenu.open($event, {id: file.id, index: index, title: file.title})">
            <img :src="file.dataUrl" :alt="file.name" :title="file.name" width="160" height="160">
            <h5 class="title">
              <div v-show="editPayImgId !== file.id && file.status === 'success'" class="title-text">
                {{ file.name }}
              </div>
              <div class="file-progress" v-if="file.status !== 'error' && file.status !== 'success'">
                <span :style="{ width: file.progress + '%' }"> </span>
              </div>
              <div v-if="file.status === 'error'" class="title-text">
                {{ file.status }}
              </div>
              <input v-if="editPayImgId === file.id && file.status === 'success'" v-focus type="text" v-model="editPayImgVal" @keyup.enter="editPayImg(this)">
            </h5>
          </div>
          <div class="upload-box">
            <vue-clip :options="options" :on-added-file="addedFile" :on-complete="complete">
              <!-- upload area -->
              <template slot="clip-uploader-action" scope="params">
                <div :class="{'is-dragging': params.dragging}" class="upload-action">
                  <div class="dz-message"><h5> Click or Drag and Drop files here upload </h5></div>
                </div>
              </template>
            </vue-clip>
          </div>
          <!-- pay images context menu -->
          <context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen($event)" @ctx-cancel="onCtxCancel" @contextmenu.prevent>
            <li class="option" @click="editPayImgId = payImageMenu.id; editPayImgVal = payImageMenu.title;" @contextmenu.prevent>Edit</li>
            <li class="option" @click="delPay(payImageMenu.id)" @contextmenu.prevent>Delete</li>
          </context-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contextMenu from 'vue-context-menu'

let payUrl = ''
let modifyUrl = ''

export default {
  name: 'setting',
  data () {
    return {
      title: 'Setting',
      oPassword: '',
      nPassword: '',
      vPassword: '',
      payImages: '',
      payImageMenu: '',
      editPayImgId: '',
      editPayImgVal: '',
      error: [false, false, false],
      options: {
        url: payUrl,
        parallelUploads: 1,
        // uploadMultiple: true,
        thumbnailWidth: 160,
        thumbnailHeight: 160,
        acceptedFiles: 'image/*'
      },
      files: []
    }
  },
  components: {
    contextMenu
  },
  watch: {
    oPassword: function (val) {
      if (!val.length) {
        this.error[0] = true
      } else {
        this.error[0] = false
      }
    },
    nPassword: function (val) {
      if (!val.length) {
        this.error[1] = true
      } else {
        this.error[1] = false
      }
    },
    vPassword: function (val) {
      if (this.nPassword !== val) {
        this.error[2] = true
      } else {
        this.error[2] = false
      }
    }
  },
  methods: {
    preventScroll: (event) => {
      if (event.type === 'mousewheel') {
        event.preventDefault()
        return false
      }
      if (event.keyCode === 38) {
        event.preventDefault()
        return false
      }
      if (event.keyCode === 40) {
        event.preventDefault()
        return false
      }
    },
    // Context Menu
    onCtxOpen: function (locals) {
      console.log(this)
      this.$refs.main.addEventListener('mousewheel', this.preventScroll)
      window.addEventListener('keydown', this.preventScroll)
      this.payImageMenu = locals
      console.log(this.payImageMenu)
    },
    onCtxCancel: function (locals) {
      console.log('cancel')
      this.$refs.main.removeEventListener('mousewheel', this.preventScroll)
      window.removeEventListener('keydown', this.preventScroll)
      this.payImageMenu = ''
    },
    // Pay image
    editPayImg: function () {
      if (this.editPayImgVal === this.payImageMenu.title) {
        this.editPayImgId = ''
        return false
      }
      // Update a pay image data
      this.$http.put(payUrl + '/' + this.editPayImgId, { title: this.editPayImgVal }).then(res => {
        console.log(res.data)
        this.payImages[this.payImageMenu.index].title = this.editPayImgVal
        // hide
        this.editPayImgId = ''
      }, res => {
        console.log(res)
      })
    },
    submit: function () {
      if (!this.oPassword.length) {
        console.log('oPassword')
        this.error[0] = true
      } else if (!this.nPassword.length) {
        this.error[1] = true
      } else if (this.nPassword === this.vPassword) {
        this.error[2] = true
      } else {
        for (var i = 0; i < this.error.length; i++) {
          if (this.error[i]) {
            this.error[i] = false
          }
        }
        // modify password
        this.$http.put(modifyUrl, { oPassword: this.oPassword, nPassword: this.nPassword }).then(res => {
          console.log(res.data)
          this.payImages[this.payImageMenu.index].title = this.editPayImgVal
          // hide
          this.editPayImgId = ''
        }, res => {
          console.log(res)
        })
      }
    },
    // pay image upload
    addedFile: function (file) {
      this.files.push(file)
    },
    complete: function (file, status, xhr) {
      file.addAttribute('id', xhr.response.id)
    }
  },
  beforeCreate () {
    payUrl = window.blogUrl.pay
    modifyUrl = window.blogUrl.modify
  },
  mounted () {
    // Get the Setting data
    this.$http.get(payUrl).then(res => {
      console.log(res.data)
      this.payImages = res.data
    }, res => {
      console.log(res.status)
      if (res.status === 401) {
        this.$router.push({path: '/login'})
      }
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
      margin-top: 1.5em;
    }
  }
  .pay-images{
    padding-top: 1em;
    .pay{
      border: 1px solid #dfe1e3;
      border-radius: 5px;
      box-shadow: 0 0 8px #ccc;
      display: inline-block;
      padding: 0.5em 1em 0;
      margin: 0 1em 1em 0;
      text-align: center;
      vertical-align: top;
      img{
        border-radius: 5px;
        display: inline-block;
      }
      .title{
        margin: 0.5em 0;
      }
      .title-text{
        padding: 1px 0;
      }
      input{
        padding: 0 8px;
        width: 160px;
      }
      .file-progress{
        padding: 2px 0;
        height: 4px;
        background: #eee;
        position: relative;
        span{
          display: block;
          height: 100%;
          background: #5cb85c;
        }
      }
    }
    .upload-box{
      vertical-align: top;
      display: inline-block;
      .upload-action{
        width: 160px;
        height: 160px;
      }
    }
  }
}
.red-border{
  border-color: red !important;
}
</style>
