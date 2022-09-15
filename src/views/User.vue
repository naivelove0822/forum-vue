<template>
  <div class="container py-5">
    <!-- UserProfileCard -->
    <UserProfileCard :user="user" 
    :is-current-user="currentUser.id === user.id"
    :initial-is-followed="isFollowed"
    />
   

    <div class="row">
      <div class="col-md-4">
        <!-- UserFollowingsCard -->
        <UserFollowingsCard :followings="followings"/>

        <!-- UserFollowersCard -->
        <UserFollowersCard :followers="followers" />
      </div>
      <div class="col-md-8">
        <!-- UserCommentsCard -->
       <UserCommentsCard :comments="comments"/>

        <!-- UserFavoritedRestaurantsCard -->
       <UserFavoritedRestaurantsCard :favoritedRestaurants="favoritedRestaurants" />

      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from './../components/UserProfileCard.vue'
import UserFollowingsCard from './../components/UserFollowingsCard.vue'
import UserFollowersCard from './../components/UserFollowersCard.vue'
import UserCommentsCard from './../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from './../components/UserFavoritedRestaurantsCard.vue'

import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data () {
    return {
      user: {
        id: 0,
        name: '',
        email: '',
        image: '',
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoriteResaturantsLength: 0
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
    }
  },
  computed: {
    ...mapState(['currentUser'])

  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  // 更新網址時重新取得使用者資料
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await usersAPI.get({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      console.log('fetchUser id: ', userId)
      const { id, name, email, image, Followings, Followers, Comments, FavoritedRestaurants } = data.profile
      const { isFollowed } = data

      this.user = {
        id,
        name,
        email,
        image,
        followersLength: Followers.length,
        followingsLength: Followings.length,
        commentsLength: Comments.length,
        favoriteResaturantsLength: FavoritedRestaurants.length
      }
      this.isFollowed = isFollowed
      this.followings = Followings
      this.followers = Followers
      this.favoritedRestaurants = FavoritedRestaurants
      // 處理 comment.Restaurant 可能有空值的情況
      this.comments = Comments.filter(comment => comment.Restaurant)

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '資料無法顯示，請稍後再試'
        })
      }
    }
  }
}
</script>