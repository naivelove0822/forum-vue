<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td >{{ user.isAdmin ? 'admin' : 'user'}}</td>
          <td>
            <button
              type="button"
              class="btn btn-link"
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="toggleUserRole({userId: user.id, isAdmin: user.isAdmin})"
            >
             {{ user.isAdmin ? 'set a user' : 'set a admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav.vue'
import adminsAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'



export default {
  components: {
    AdminNav,
    Spinner
  }, 
  data () {
    return {
      users: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser () {
      try {
        const { data } = await adminsAPI.users.get()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = data.users
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        })
      }
      
    },
    async toggleUserRole({ userId, isAdmin}) {
      try {
        const willBeAdmin = !isAdmin
        const { data } = await adminsAPI.users.update({ userId, isAdmin: willBeAdmin.toString() })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          }
          return {
            ...user,
            isAdmin: willBeAdmin
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法切換，請稍後再試'
        })
      }
    }
  }
}
</script>