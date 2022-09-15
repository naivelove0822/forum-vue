<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
        v-if="image"
        :src="image" class="d-block img-thumbail mb-3" width="200" height="200"
        >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        {{ isProcessing ? "更新資料中..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      id: '-1',
      image: '',
      name: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
  //  這裡的user可能會出問題
    currentUser (user) {
      this.setUser(user)
    }

  },
  created() {
    const { id: userId } = this.$route.params
    if(userId.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return
    }
    this.setUser()
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return
    }
    this.setUser()
    next()
  },
  methods: {
    setUser () {
      // 將currentUser帶入該組件的Vue資料內
        this.id = this.currentUser.id,
        this.name = this.currentUser.name,
        this.image = this.currentUser.image
    },
    handleChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.image = imageURL
      }
    },
    async handleSubmit(e) {
      if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '尚未填寫姓名'
          })
          return
        }
      const form = e.target
      const formData = new FormData(form)
      try {
        this.isProcessing = true
        // 呼叫API更新使用者資料
        const { data } = await usersAPI.update({ userId: this.id, formData })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'user', params: { id: this.id }})
      } catch (error) {
        console.log('error', error)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新資料，請稍後再試'
        })
      }
    }
  }
}
</script>