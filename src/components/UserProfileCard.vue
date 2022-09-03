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
              @click.stop.prevent="deleteFollow"            
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollow"
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
export default {
  props: {
    user: {
      type: Object,
      require: true
    },
    initialIsFollower: {
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
      isFollowed: this.initialIsFollower
    }
  },
  methods: {
    addFollow () {
      this.isFollowed = true  
    },
    deleteFollow () {
      this.isFollowed = false
    }
  }
}
</script>