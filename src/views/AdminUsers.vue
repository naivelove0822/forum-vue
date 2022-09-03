<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
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
          <td v-if="user.isAdmin">admin</td>
          <td v-else>User</td>
          <td>
            <button
              type="button"
              class="btn btn-link"
              v-show="user.isAdmin"
              v-if="currentUser.id !== user.id"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as user
            </button>
            <button
              type="button"
              class="btn btn-link"
              v-show="!user.isAdmin"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav.vue'



const dummyData = {
    "users": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$jun9aJYSq8qyzln/hR6RQuVDs.pJCTg/eJ0xULDtLVHqW85v2PS6G",
            "isAdmin": true,
            "image": null,
            "createdAt": "2022-08-05T07:37:02.000Z",
            "updatedAt": "2022-08-05T07:37:02.000Z"
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$crHAW94MhTrGk3FSKr5D1ugFVFhF7JaSEkxWAnN3ydVvKvyS1pVGu",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-08-05T07:37:02.000Z",
            "updatedAt": "2022-08-05T07:37:02.000Z"
        },
        {
            "id": 3,
            "name": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$D/F3ZfMlK0oTMTZQStWpOOEIvZeWUyApAeaZoBpj3s6HrYA9a/RMa",
            "isAdmin": false,
            "image": null,
            "createdAt": "2022-08-05T07:37:02.000Z",
            "updatedAt": "2022-08-05T07:37:02.000Z"
        }
    ]
}

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  components: {
    AdminNav
  }, 
  data () {
    return {
      users: [],
      currentUser: dummyUser.currentUser
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      const { users } = dummyData
      this.users = users
    },
    toggleUserRole(userId) {
      const user = this.users.find(user => user.id === userId)
      user.isAdmin = !user.isAdmin
    }
  }
}
</script>