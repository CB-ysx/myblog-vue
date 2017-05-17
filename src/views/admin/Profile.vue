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
        <button type="button" ref="save" class="btn success" :value="curent" @click="" name="save">Save</button>
      </div>
    </header>
    <!-- contents -->
    <div class="main-box">
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
            <svg class="icon add-icon" @click="" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
              <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
            </svg>
          </div>
        </header>
        <div class="skills-box">
          <span class="tag" v-for="item in data.skills">{{ item }}</span>
          <span class="tag"><input type="text" class="no-border"></span>
        </div>
      </div>
      <!-- contact -->
      <div class="contact">
        <header class="border-shadow">
          <h4>Contact</h4>
          <div class="btn-box">
            <svg class="icon add-icon" @click="" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
              <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
            </svg>
          </div>
        </header>
        <ul class="item-list list-manage">
          <li class="item" v-for="(item, index) in data.contact" @dblclick="edit(item.id, index)" :class="{ 'list-none': editCont === item.id }">
            <!-- show -->
            <div class="show-box" v-if="editCont !== item.id">
              <b>{{ index }}</b>
              <span class="item-text underline">
                {{ item[0] }}
              </span>
              <span class="item-text">
                <a :href="item[1]" class="underline">{{ item[1] }}</a>
              </span>
            </div>
            <!-- edit -->
            <div class="add-box" v-if="editCont === item.id">
              <div class="text-input">
                <input type="text" class="edit-input" :value="index" ref="editName" placeholder="Input a name">
                <input type="text" class="edit-input" v-focus :value="item[0]" ref="editAlias" placeholder="Input a alias">
                <input type="text" class="edit-input" :value="item[1]" ref="editUrl" placeholder="Input a url">
              </div>
              <div class="btn-box right">
                <svg class="icon save-icon" @click="save" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8304">
                  <path d="M940.032 182.784l-98.816-98.816c-8.192-8.192-18.432-12.8-29.696-12.8h-692.224c-26.112 0-47.616 21.504-47.616 47.616v785.92c0 26.112 21.504 47.616 47.616 47.616h784.896c26.624 0 48.128-21.504 48.128-48.128V211.968c0-10.752-4.096-21.504-12.288-29.184zM312.32 119.808h399.36v271.36h-399.36v-271.36z m463.36 783.36h-527.36v-305.152l30.208-30.208h466.944l30.208 30.208v305.152z m128.512-33.792c-0.512 18.944-16.384 34.304-35.328 34.304H824.32V579.072l-59.392-59.392h-505.856L199.68 579.072v324.608h-44.544c-18.944 0-34.816-15.872-34.816-34.816V154.624c0-18.944 15.872-34.816 34.816-34.816h108.544v320h496.64v-320h33.28c10.24 0 19.968 4.096 27.648 11.264l67.072 67.072c10.24 10.24 15.872 24.064 15.872 38.4v632.832z" p-id="11484"></path>
                  <path d="M607.744 199.168c-6.656 0-12.288 2.56-16.896 7.168-4.608 4.608-6.656 10.24-6.656 16.384v64c0 13.824 10.752 24.576 24.064 24.576s24.064-11.264 24.064-24.576v-64c0-12.8-11.264-23.552-24.576-23.552zM671.744 647.168h-320c-13.312 0-24.064 10.752-24.576 24.064 0 13.824 10.752 24.576 24.576 24.576h320c13.312 0 24.064-11.264 24.064-24.576 0-13.312-10.752-24.064-24.064-24.064zM671.744 775.168h-320c-13.312 0-24.064 10.752-24.576 24.064 0 13.824 10.752 24.576 24.576 24.576h320c13.312 0 24.064-11.264 24.064-24.576 0-13.312-10.752-24.064-24.064-24.064z" p-id="11485"></path>
                </svg>
                <svg class="icon del-icon" @click="del" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6820">
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
          <li class="add-box" v-if="">
            <div class="text-input">
              <input type="text" v-focus ref="addName" placeholder="Input a name">
              <input type="text" ref="addAlias" placeholder="Input a alias">
              <input type="text" ref="addUrl" placeholder="Input a url">
            </div>
            <div class="btn-box">
              <svg class="icon add-icon" @click="add" viewBox="0 0 1038 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854">
                <path d="M963.106901 11.680959H80.998041c-35.956369 0-65.105091 29.148722-65.105091 65.10509v882.10886c0 35.956369 29.148722 65.105091 65.105091 65.105091h882.10886c35.956369 0 65.105091-29.148722 65.10509-65.105091V76.786049c0-35.956369-29.147709-65.105091-65.10509-65.10509z m-102.873254 537.808194H553.701144v306.532502c0 17.478903-14.169264 31.648167-31.648167 31.648168s-31.648167-14.169264-31.648167-31.648168V549.489153H183.871295c-17.478903 0-31.648167-14.169264-31.648168-31.648167s14.169264-31.648167 31.648168-31.648168h306.533515V179.659304c0-17.478903 14.169264-31.648167 31.648167-31.648168s31.648167 14.169264 31.648167 31.648168v306.532502h306.532503c17.478903 0 31.648167 14.169264 31.648167 31.648167 0 17.479916-14.169264 31.64918-31.648167 31.64918z" p-id="4855"></path>
              </svg>
              <svg class="icon del-icon" @click="clear" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6820">
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
let url = ''
export default {
  name: 'profile',
  data () {
    return {
      title: 'Profile',
      data: '',
      motto: '',
      intro: '',
      editCont: ''
    }
  },
  methods: {
    compare: function (obj1, obj2) {
      let val1 = new Date(obj1.date)
      let val2 = new Date(obj2.date)
      return val2 - val1
    },
    edit: function (id, index) {
      this.editCont = id
      this.dataIndex = index
    },
    add: function () {
      let time = this.$refs.date.formattedValue
      let content = this.$refs.content.value
      console.log(time)
      console.log(content)
      if (!time) {
        alert('日期不能为空！')
        return
      }
      if (!content) {
        alert('标题不能为空！')
        return
      }
      // Add a Timeline data
      this.$http.post(url).then(res => {
        console.log(res.data)
        // this.timeLines.push({ id: res.data.id date: time, title: content })
      }, res => {
        console.log(res)
      })
      this.editId = ''
    },
    clear: function () {
      // clear Datepicker value
      this.$refs.date.$data.selectedDate = null
      this.$refs.date.$emit('cleared')
      // clear title value
      this.$refs.content.value = ''
    },
    save: function () {
      let time = this.$refs.editDate[0].formattedValue
      let content = this.$refs.editContent[0].value
      console.log(time)
      console.log(content)
      if (!time) {
        alert('日期不能为空！')
        return
      }
      if (!content) {
        alert('标题不能为空！')
        return
      }
      // Update a Timeline data
      this.$http.put(url + '/' + this.editId).then(res => {
        console.log(res.data)
        // update components data
        this.timeLines[this.dataIndex].date = time
        this.timeLines[this.dataIndex].title = content
      }, res => {
        console.log(res)
      })
      this.editId = ''
    },
    del: function () {
      console.log('delete ' + this.editId)
      // Delete a Timeline data
      this.$http.delete(url + '/' + this.editId).then(res => {
        console.log(res.data)
        // update components data
        this.timeLines.splice(this.dataIndex, 1)
      }, res => {
        console.log(res)
      })
      this.editId = ''
    }
  },
  mounted () {
    url = this.$root.$data.about
    // Get the Profile List data
    this.$http.get(url).then(res => {
      console.log(res.data.contact)
      this.data = res.data
      this.motto = res.data.title
      this.intro = res.data.intro
    }, res => {
      console.log(res)
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
  .list-manage{
    margin-top: 1em;
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
</style>
