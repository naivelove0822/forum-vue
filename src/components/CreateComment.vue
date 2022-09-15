<template>
<!-- 提交表單的V-on綁在form上而不是button -->

  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>

import commentsAPI from './../apis/comments'
import { Toast } from './../utils/helpers'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      text: '',
      isProcessing: false,
      isLoading: true
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫任何評論'
          })
          return
        }
        this.isProcessing = true

        const { data } = await commentsAPI.createComment({ restaurantId: this.restaurantId, text: this.text })

        if (data.status === 'error') {
          throw new Error(data.message)
        }


        this.$emit('after-create-comment', {
        commentId: data.commentId, //尚未串接API暫時用隨機的ID
        restaurantId: this.restaurantId,
        text: this.text
      }),
        this.isProcessing = false
        this.text = '' //清空表單
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增留言，請稍後再試'
        })
      }
      // TodO: 向API發送POST請求
      // 伺服器新增Comment成功後
      
    }
  }
}
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>