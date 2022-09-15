<template>
  <div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
        <img :src="user.image" width="300px" height="300px">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ user.name }}</h5>
        <p class="card-text">
          {{ user.email }}
        </p>
        <ul class="list-unstyled list-inline">
          <li><strong>{{ user.commentsLength }}</strong> 已評論餐廳</li>
          <li><strong>{{ user.favoriteResaturantsLength }}</strong> 收藏的餐廳</li>
          <li><strong>{{ user.followingsLength }}</strong> followings (追蹤者)</li>
          <li><strong>{{user.followersLength}}</strong> followers (追隨者)</li>
        </ul>
        <template v-if="isCurrentUser">
        <p>
            <router-link :to="{ name: 'user-edit', params: { id: user.id }}"><button type="submit" class="btn btn-primary">edit</button></router-link>
        </p>
        </template>
        <template v-else>
        <button
              v-if="isFollowed"             
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="deleteFollow(user.id)"            
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollow(user.id)"
            >
              追蹤
            </button>
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'


export default {
  props: {
    user: {
      type: Object,
      require: true
    },
    initialIsFollowed: {
      type: Boolean,
      require: true
    },
    isCurrentUser: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      isFollowed: this.initialIsFollowed
    }
  },
  watch: {
    initialIsFollowed (isFollowed) {
      this.isFollowed = {
        ...this.isFollowed,
        ...isFollowed
      }
    }
  },
  methods: {
    async addFollow (userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.isFollowed = true 
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '追蹤失敗，請稍後再試'
        })
      } 
    },
    async deleteFollow (userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.isFollowed = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除，請稍後再試'
        })
      }
    }
  }
}
</script>