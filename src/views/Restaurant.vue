
<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant"/>
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments 
    :restaurant-comments="restaurantComments" @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment 
     :restaurant-id="restaurant.id"
     @after-create-comment="afterCreateComment"
    />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from './../components/RestaurantDetail.vue'
import RestaurantComments from './../components/RestaurantComments.vue'
import CreateComment from './../components/CreateComment.vue'
import restaurantAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
       restaurantComments: [],
       isLoading: true
    }
  },
  computed: {
    // 透過computed 與 mapState的Vuex方法 讓存在store內的CurrentUser以簡易的方式傳入資料
    ...mapState(['currentUser'])
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate (to, from, next) {
    // id是在to內的id要讓它等於restaurantId才能做到變數一致
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
      this.isLoading = true
      console.log('fetchRestaurant id: ', restaurantId )
      const { data } = await restaurantAPI.getRestaurant({ restaurantId })

      const { restaurant, isFavorited, isLiked } = data
      const { id, name, Category, image, opening_hours: openingHours, tel, address, description, Comments } = restaurant

      this.restaurant = {
        id,
        name,
        categoryName: Category ? Category.name : '未分類',
        image,
        openingHours,
        tel,
        address,
        description,
        isFavorited,
        isLiked,
      },
      this.restaurantComments = Comments
      this.isLoading = false

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })

      }
    },
    afterDeleteComment (commentId) {
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    afterCreateComment (payload) {
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  }
}
</script>