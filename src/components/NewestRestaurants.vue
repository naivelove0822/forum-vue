<template>
  <div class="card">
    <div class="card-header">
      最新餐廳
    </div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <router-link
      :to="{ name: 'restaurant', params: {id: restaurant.id}}"
    >
      {{ restaurant.name }}
    </router-link>  
          <small>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>{{ restaurant.createdAt | fromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  mixins: [fromNowFilter],
  // 從父層傳遞資料使用props
  props: {
    // 根據要傳遞資料所綁定(V-bind名稱)的HTML名稱作為連接
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>
small {
  font-size: 10px;
}
</style>