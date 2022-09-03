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
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid"

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit () {
      // TodO: 向API發送POST請求
      // 伺服器新增Comment成功後
      this.$emit('after-create-comment', {
        commentId: uuidv4(), //尚未串接API暫時用隨機的ID
        restaurantId: this.restaurantId,
        text: this.text
      }),
      this.text = '' //清空表單
    }
  }
}
</script>