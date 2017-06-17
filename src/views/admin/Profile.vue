/**
 * Created by joriscai on 2017/5/17.
 * This is Profile.vue
 */
<template>
  <div class="profile">
    <header class="border-shadow">
      <h3 class="title">
        {{ title }}
      </h3>
      <div class="btn-box">
        <button type="button" ref="save" class="btn success" @click="" name="save">Save</button>
      </div>
    </header>
    <!-- contents -->
    <div class="main-box" ref="main">
      <div class="input-field">
        <h4>Motto:</h4>
        <div class="input-area">
          <input type="text" v-model="motto"/>
        </div>
      </div>
      <div class="input-field">
        <h4>About Me:</h4>
        <div class="input-area">
          <textarea>{{ intro }}</textarea>
        </div>
      </div>
      <!-- skills -->
      <div class="skills">
        <header class="border-shadow">
          <h4>Skills</h4>
          <div class="btn-box">
            <svg class="icon add-icon" @click="toAddSkill = true" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
              <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
            </svg>
          </div>
        </header>
        <div class="skills-box">
          <span class="tag" v-for="(item, index) in data.skills" @contextmenu.prevent="$refs.ctxMenu.open($event, {id: item.id, index: index, name: item.name})">
            <!-- show skill -->
            <div v-show="editSkillId !== item.id">
              {{ item.name }}
            </div>
            <!-- edit skill -->
            <input type="text" v-focus class="no-border" v-if="editSkillId === item.id" v-model="editSkillVal" @keyup.enter="saveSkill">
          </span>
          <!-- add skill-->
          <span class="tag" v-if="toAddSkill"><input type="text" v-focus class="no-border" v-model="addSkillVal" @keyup.enter="addSkill"></span>
          <!-- skill context menu -->
          <context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen($event)" @ctx-cancel="onCtxCancel">
            <li class="option" @click="editSkillId = skillMenu.id; editSkillVal = skillMenu.name;">Edit</li>
            <li class="option" @click="delSkill(skillMenu.id)">Delete</li>
          </context-menu>
        </div>
      </div>
      <!-- contact -->
      <div class="contact">
        <header class="border-shadow">
          <h4>Contact</h4>
          <div class="btn-box">
            <svg class="icon add-icon" @click="toAddCont = true" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
              <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
            </svg>
          </div>
        </header>
        <ul class="item-list list-manage">
          <li class="item" v-for="(item, index) in data.contacts" @dblclick="editContact = index;editContactId = item.id" :class="{ 'list-none': editContact === index }">
            <!-- show contact -->
            <div class="show-box" v-show="editContact !== index">
              <b>{{ item.name }}</b>
              <span class="item-text underline">
                {{ item.alias }}
              </span>
              <span class="item-text">
                <a :href="item.url" class="underline">{{ item.url }}</a>
              </span>
            </div>
            <!-- edit contact -->
            <div class="add-box" v-if="editContact === index">
              <div class="text-input">
                <input type="text" class="edit-input" :value="item.name" ref="editName" placeholder="Input a name">
                <input type="text" class="edit-input" v-focus :value="item.alias" ref="editAlias" placeholder="Input a alias">
                <input type="text" class="edit-input" :value="item.url" ref="editUrl" placeholder="Input a url">
              </div>
              <div class="btn-box right">
                <svg class="icon save-icon" @click="saveContact" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8304">
                  <path d="M940.032 182.784l-98.816-98.816c-8.192-8.192-18.432-12.8-29.696-12.8h-692.224c-26.112 0-47.616 21.504-47.616 47.616v785.92c0 26.112 21.504 47.616 47.616 47.616h784.896c26.624 0 48.128-21.504 48.128-48.128V211.968c0-10.752-4.096-21.504-12.288-29.184zM312.32 119.808h399.36v271.36h-399.36v-271.36z m463.36 783.36h-527.36v-305.152l30.208-30.208h466.944l30.208 30.208v305.152z m128.512-33.792c-0.512 18.944-16.384 34.304-35.328 34.304H824.32V579.072l-59.392-59.392h-505.856L199.68 579.072v324.608h-44.544c-18.944 0-34.816-15.872-34.816-34.816V154.624c0-18.944 15.872-34.816 34.816-34.816h108.544v320h496.64v-320h33.28c10.24 0 19.968 4.096 27.648 11.264l67.072 67.072c10.24 10.24 15.872 24.064 15.872 38.4v632.832z" p-id="11484"></path>
                  <path d="M607.744 199.168c-6.656 0-12.288 2.56-16.896 7.168-4.608 4.608-6.656 10.24-6.656 16.384v64c0 13.824 10.752 24.576 24.064 24.576s24.064-11.264 24.064-24.576v-64c0-12.8-11.264-23.552-24.576-23.552zM671.744 647.168h-320c-13.312 0-24.064 10.752-24.576 24.064 0 13.824 10.752 24.576 24.576 24.576h320c13.312 0 24.064-11.264 24.064-24.576 0-13.312-10.752-24.064-24.064-24.064zM671.744 775.168h-320c-13.312 0-24.064 10.752-24.576 24.064 0 13.824 10.752 24.576 24.576 24.576h320c13.312 0 24.064-11.264 24.064-24.576 0-13.312-10.752-24.064-24.064-24.064z" p-id="11485"></path>
                </svg>
                <svg class="icon del-icon" @click="delContact" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6820">
                  <path d="M286.974967 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C302.32456 888.138706 295.468408 895.097188 286.974967 895.097188z" p-id="6821"></path>
                  <path d="M735.285412 895.097188l-448.310446 0c-8.493441 0-15.349593-6.856152-15.349593-15.349593s6.856152-15.349593 15.349593-15.349593l448.310446 0c8.493441 0 15.349593 6.856152 15.349593 15.349593S743.778854 895.097188 735.285412 895.097188z" p-id="6822"></path>
                  <path d="M737.025033 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C752.374626 888.138706 745.518474 895.097188 737.025033 895.097188z" p-id="6823"></path>
                  <path d="M168.373779 220.636073l687.252443 0 0 30.699186-687.252443 0 0-30.699186Z" p-id="6824"></path>
                  <path d="M367.202173 105.514125l289.595654 0 0 30.699186-289.595654 0 0-30.699186Z" p-id="6825"></path>
                  <path d="M426.553932 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6826"></path>
                  <path d="M566.746882 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6827"></path>
                </svg>
              </div>
            </div>
          </li>
          <!-- add contact -->
          <li class="add-box" v-if="toAddCont">
            <div class="text-input">
              <input type="text" v-focus ref="addName" placeholder="Input a name">
              <input type="text" ref="addAlias" placeholder="Input a alias">
              <input type="text" ref="addUrl" placeholder="Input a url">
            </div>
            <div class="btn-box">
              <svg class="icon add-icon" @click="addContact" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
                <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
              </svg>
              <svg class="icon del-icon" @click="toAddCont = false" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6820">
                <path d="M286.974967 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C302.32456 888.138706 295.468408 895.097188 286.974967 895.097188z" p-id="6821"></path>
                <path d="M735.285412 895.097188l-448.310446 0c-8.493441 0-15.349593-6.856152-15.349593-15.349593s6.856152-15.349593 15.349593-15.349593l448.310446 0c8.493441 0 15.349593 6.856152 15.349593 15.349593S743.778854 895.097188 735.285412 895.097188z" p-id="6822"></path>
                <path d="M737.025033 895.097188c-8.493441 0-15.349593-6.856152-15.349593-15.349593l0-595.052554c0-8.493441 6.856152-15.349593 15.349593-15.349593s15.349593 6.856152 15.349593 15.349593l0 595.052554C752.374626 888.138706 745.518474 895.097188 737.025033 895.097188z" p-id="6823"></path>
                <path d="M168.373779 220.636073l687.252443 0 0 30.699186-687.252443 0 0-30.699186Z" p-id="6824"></path>
                <path d="M367.202173 105.514125l289.595654 0 0 30.699186-289.595654 0 0-30.699186Z" p-id="6825"></path>
                <path d="M426.553932 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6826"></path>
                <path d="M566.746882 281.727453l30.699186 0 0 369.311207-30.699186 0 0-369.311207Z" p-id="6827"></path>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import contextMenu from 'vue-context-menu'

let url = ''
let skillUrl = ''
let contUrl = ''
export default {
  name: 'profile',
  data () {
    return {
      title: 'Profile',
      data: '',
      motto: '',
      intro: '',
      editContact: '',
      editContactId: '',
      editSkillVal: '',
      editSkillId: '',
      addSkillVal: '',
      toAddCont: false,
      toAddSkill: false,
      skillMenu: ''
    }
  },
  components: {
    contextMenu
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
      this.$refs.main.addEventListener('mousewheel', this.preventScroll)
      window.addEventListener('keydown', this.preventScroll)
      this.skillMenu = locals
    },
    onCtxCancel: function (locals) {
      this.$refs.main.removeEventListener('mousewheel', this.preventScroll)
      window.removeEventListener('keydown', this.preventScroll)
      this.skillMenu = ''
    },
    // Skill
    addSkill: function () {
      console.log(this.addSkillVal)
      // Add a skill data
      this.$http.post(skillUrl, {name: this.addSkillVal}).then(res => {
        console.log(res.data)
        this.data.skills.push({id: res.data.id, name: this.addSkillVal})
        // hide
        this.toAddSkill = ''
      }, res => {
        console.log(res)
      })
    },
    saveSkill: function () {
      // console.log(this.editSkillVal)
      // console.log('12' + this.skillMenu.skill)
      if (this.editSkillVal === this.skillMenu.skill) {
        this.editSkillId = ''
        return false
      }
      // Update a skill data
      this.$http.put(skillUrl + '/' + this.editSkillId, {name: this.editSkillVal}).then(res => {
        console.log(res.data)
        this.data.skills[this.skillMenu.index].name = this.editSkillVal
        // hide
        this.editSkillId = ''
      }, res => {
        console.log(res)
      })
    },
    delSkill: function (id) {
      console.log('delete' + id)
      // Delete a skill data
      this.$http.delete(skillUrl + '/' + id).then(res => {
        console.log(res.data)
        this.data.skills.splice(this.skillMenu.index, 1)
      }, res => {
        console.log(res)
      })
    },
    // Contact
    addContact: function () {
      let name = this.$refs.addName.value
      let alias = this.$refs.addAlias.value
      let contactUrl = this.$refs.addUrl.value
      console.log(name)
      console.log(alias)
      console.log(contactUrl)
      if (!name) {
        alert('名称不能为空！')
        return
      }
      if (!alias) {
        alert('别名不能为空！')
        return
      }
      if (!contactUrl) {
        alert('链接不能为空！')
        return
      }
      // Add a Contact data
      this.$http.post(contUrl, {name: name, alias: alias, url: contactUrl}).then(res => {
        console.log(res.data)
        this.data.contacts.push({ id: res.data.id, name: name, alias: alias, url: contactUrl })
        this.toAddCont = ''
      }, res => {
        console.log(res)
      })
    },
    saveContact: function () {
      let name = this.$refs.editName[0].value
      let alias = this.$refs.editAlias[0].value
      let contactUrl = this.$refs.editUrl[0].value
      console.log(name)
      console.log(alias)
      console.log(contactUrl)
      if (!name) {
        alert('名称不能为空！')
        return
      }
      if (!alias) {
        alert('别名不能为空！')
        return
      }
      if (!contactUrl) {
        alert('链接不能为空！')
        return
      }
      // Update a Contact data
      this.$http.put(contUrl + '/' + this.editContactId, {name: name, alias: alias, url: contactUrl}).then(res => {
        console.log(res.data)
        // update components data
        // this.timeLines[this.dataIndex].date = time
        // this.timeLines[this.dataIndex].title = content
        console.log(this.editContact)
        console.log(this.data.contacts[this.editContact].name)
        this.data.contacts[this.editContact].name = name
        this.data.contacts[this.editContact].alias = alias
        this.data.contacts[this.editContact].url = contactUrl
        // hide input
        this.editContact = ''
      }, res => {
        console.log(res)
      })
    },
    delContact: function () {
      console.log('delete ' + this.editContactId)
      // Delete a Contact data
      this.$http.delete(contUrl + '/' + this.editContactId).then(res => {
        console.log(res.data)
        // update components data
        this.data.contacts.splice(this.editContact, 1)
        // hide
        this.editContact = ''
      }, res => {
        console.log(res)
      })
    }
  },
  beforeCreate () {
    url = window.blogUrl.about
    skillUrl = window.blogUrl.skill
    contUrl = window.blogUrl.contact
  },
  mounted () {
    // Get the Profile List data
    this.$http.get(url).then(res => {
      console.log(res.data)
      this.data = res.data
      this.motto = res.data.title
      this.intro = res.data.intro
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
.profile{
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
  h4{
    margin-bottom: 5px;
  }
  .list-manage{
    margin-top: 1em;
  }
}
.input-area{
  max-width: 600px;
  input,textarea{
    width: 100%;
    display: block;
  }
  textarea{
    resize: vertical;
    font: inherit;
    min-height: 10rem;
  }
}
.skills-box {
  padding-top: 1em;
  word-break: keep-all;
  word-wrap: break-word;
  .tag {
    background: #F9F9F9;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.34);
    display: inline-block;
    margin: 2px 9px 12px;
    padding: 5px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
}
.underline{
  text-decoration: underline;
  &:hover,&:active{
    text-decoration: underline;
  }
}
a{
  color: black;
}
input.no-border{
  padding: 0 6px;
  background: inherit;
  &:focus{
    background: white;
  }
}
div.ctx-menu-container{
  border: 0;
  ul{
    border: 1px solid #dde0e4;
    border-radius: 5px;
    box-shadow: 0 0 8px #ccc;
  }
  .ctx-menu{
    min-width: 100px;
  }
  .option{
    padding: 0 27px 0 20px;
    white-space: nowrap;
    cursor: pointer;
    &:hover{
      color: white;
      background-color: #4281F4;
    }
  }
}
</style>
