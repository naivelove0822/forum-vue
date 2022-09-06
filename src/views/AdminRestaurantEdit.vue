<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    :initial-restaurant="restaurant"
    @after-submit="handleAfterSubmit"
    :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import AdminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

// const dummyData = {
//   'restaurant': {
//     'id': 1,
//     'name': 'Laurence Reynolds',
//     'tel': '1-657-067-3756 x9782',
//     'address': '187 Kirlin Squares',
//     'opening_hours': '08:00',
//     'description': 'sit est mollitia',
//     'image': 'https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887',
//     'viewCounts': 1,
//     'createdAt': '2019-07-30T16:24:55.432Z',
//     'updatedAt': '2019-07-30T17:26:43.260Z',
//     'CategoryId': 3,
//     'Category': {
//       'id': 3,
//       'name': '義大利料理',
//       'createdAt': '2019-07-30T16:24:55.429Z',
//       'updatedAt': '2019-07-30T16:24:55.429Z'
//     }
//   }
// }


export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  created () {
    const { id:restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    // 達到網址連動效果
    // id是console.log出來裡面顯示的 params: { id: ? }
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
       const { data } = await AdminAPI.restaurants.getDetail({ restaurantId })
      
      const { id, name, CategoryId: categoryId, tel, address, description, image, opening_hours: openingHours } = data.restaurant 
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryId,
        tel,
        address,
        description,
        image,
        openingHours
      }

      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await AdminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })
      } catch(error) {
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