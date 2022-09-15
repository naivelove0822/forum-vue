<template>
  <div class="container py-5">
      <!-- 使用NavTabs -->
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
    <h1 class="mt-5">
      最新動態
    </h1>
     <hr>
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import NewestRestaurants from './../components/NewestRestaurants.vue'
import NewestComments from './../components/NewestComments.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from '../utils/helpers'
import Spinner from './../components/Spinner.vue'



export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data () {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  created () {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds () {
      try {
        this.isLoading = true
        const response = await restaurantsAPI.getFeeds()
        console.log('response', response)
        const { comments, restaurants } = response.data
        // 如果沒指定data，會在全部資料內找不會進到裡面那一層因此不能用filter。
        this.comments = comments.filter(comment => comment.Restaurant)
        this.restaurants = restaurants
        this.isLoading = false   
        } catch(error) {
          this.isLoading = false
            console.log('error', error)
            Toast.fire({
                icon: error,
                title: '資料傳輸錯誤，請稍後再試'
            })
        }
    }
  }
}
</script>