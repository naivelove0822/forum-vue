<template>
  <div class="container py-5">
      <!-- 使用NavTabs -->
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
    <h1 class="mt-5">
      人氣餐廳
    </h1>
    <hr>
    <!-- 放入餐廳面板 -->
    <div
      v-for="restaurant in restaurants" :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link :to="{ name: 'restaurant' , params: { id: restaurant.id }}">
            <img
              class="card-img"
              :src="restaurant.image"
            >
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.favoriteCount }}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link :to="{ name: 'restaurant' , params: { id: restaurant.id }}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger mr-2"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
            >
              移除最愛
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFavorite(restaurant.id)"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import usersAPI from './../apis/users'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner.vue'




export default {
  components: {
    NavTabs,
    Spinner
  },
  data () {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  created () {
    this.fetchRestaurantTop()
  },
  methods: {
    async fetchRestaurantTop () {
      try {
        this.isLoading = true
        const { data } = await restaurantsAPI.getTopRestaurants ()
        this.restaurants = data.restaurants.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          isFavorited: item.isFavorited,
          favoriteCount: item.FavoriteCount,
          description: item.description
        }))
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '資料錯誤，請稍後再嘗試'
        })
      }
    },
  async addFavorite(restaurantId) {
    try {
      const { data } = await usersAPI.addFavorite({ restaurantId })

      if (data.status === 'error') {
        throw new Error (data.message)
      }
      this.restaurants = this.restaurants.map(restaurant => {
        if (restaurant.id !== restaurantId) {
          return restaurant
        } else {
          return {
            ...restaurant,
            isFavorited: true,
            favoriteCount: restaurant.favoriteCount + 1
          }
        }
      })
    } catch(error) {
      console.log('error', error)
      Toast.fire({
        icon: 'error',
        title: '目前無法新增最愛,請稍後再試'
      })
    }
   },
  async deleteFavorite(restaurantId) {
    try {
      // 用解構附值把本來的 response.data => data 直接把data 拿出來
      const { data } = await usersAPI.deleteFavorite({ restaurantId })

      if ( data.status === 'error' ) {
        throw new Error(data.message)
      }
      
      this.restaurants = this.restaurants.map(restaurant => {
        if (restaurant.id !== restaurantId) {
          return restaurant
        } else {
          return {
            ...restaurant,
            isFavorited: false,
            favoriteCount: restaurant.favoriteCount - 1
          }
        }
      })
    } catch(error) {
      console.log('error', error)
      Toast.fire({
        icon: 'error',
        title: '目前無法移除最愛,請稍後再試'
      })
    }
  }
  }
}
</script>