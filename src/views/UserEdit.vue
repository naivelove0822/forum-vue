<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="user.name"
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
        v-if="user.image"
        :src="user.image" class="d-block img-thumbail mb-3" width="200" height="200"
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
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>

const dummyData = {
    "profile": {
        "id": 1,
        "name": "root",
        "email": "root@example.com",
        "password": "$2a$10$jun9aJYSq8qyzln/hR6RQuVDs.pJCTg/eJ0xULDtLVHqW85v2PS6G",
        "isAdmin": true,
        "image": null,
        "createdAt": "2022-08-05T07:37:02.000Z",
        "updatedAt": "2022-08-05T07:37:02.000Z",

 }
}

export default {
  data () {
    return {
      user: {
        id: '-1',
        image: '',
        name: ''
      }
    }
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  methods: {
    fetchUser (userId) {
      console.log('userId: ', userId)
      const { id, name, image } = dummyData.profile
      this.user = {
        id,
        name,
        image
      }
    },
    handleChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.user.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.image = imageURL
      }
    },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
}
</script>