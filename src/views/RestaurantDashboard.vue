<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.Comments.length }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>

const dummyData = {
    "restaurant": {
        "id": 1,
        "name": "Kaylee Pfeffer",
        "tel": "947-805-4547 x48253",
        "address": "5929 Gusikowski Manor",
        "opening_hours": "08:00",
        "description": "Aspernatur placeat inventore id ut nesciunt. Quo sunt aut ut. Eos velit voluptatem. Error eaque recusandae qui voluptatibus eaque mollitia atque enim. Voluptatem ut provident voluptatem vel ipsa sed soluta eligendi.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=78.44605766606469",
        "viewCounts": 1,
        "createdAt": "2022-08-05T07:37:02.000Z",
        "updatedAt": "2022-08-11T06:51:49.000Z",
        "CategoryId": 2,
        "Category": {
            "id": 2,
            "name": "日本料理",
            "createdAt": "2022-08-05T07:37:02.000Z",
            "updatedAt": "2022-08-05T07:37:02.000Z"
        },
        "Comments": [
            {
                "id": 1,
                "text": "Vitae voluptatem voluptatem in consequatur molestiae quos.",
                "UserId": 1,
                "RestaurantId": 1,
                "createdAt": "2022-08-05T07:37:02.000Z",
                "updatedAt": "2022-08-05T07:37:02.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$jun9aJYSq8qyzln/hR6RQuVDs.pJCTg/eJ0xULDtLVHqW85v2PS6G",
                    "isAdmin": true,
                    "image": null,
                    "createdAt": "2022-08-05T07:37:02.000Z",
                    "updatedAt": "2022-08-05T07:37:02.000Z"
                }
            },
            {
                "id": 51,
                "text": "Unde repellat et odio minima dicta sed quasi est.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-08-05T07:37:02.000Z",
                "updatedAt": "2022-08-05T07:37:02.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$crHAW94MhTrGk3FSKr5D1ugFVFhF7JaSEkxWAnN3ydVvKvyS1pVGu",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-08-05T07:37:02.000Z",
                    "updatedAt": "2022-08-05T07:37:02.000Z"
                }
            },
            {
                "id": 101,
                "text": "Sit quibusdam vel exercitationem porro et.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-08-05T07:37:02.000Z",
                "updatedAt": "2022-08-05T07:37:02.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$crHAW94MhTrGk3FSKr5D1ugFVFhF7JaSEkxWAnN3ydVvKvyS1pVGu",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-08-05T07:37:02.000Z",
                    "updatedAt": "2022-08-05T07:37:02.000Z"
                }
            }
        ]
    }
}
export default {
  data () {
    return {
      restaurant: []
    }
  },
  created () {
    this.fetchRestaurant()
  },
  methods: {
    fetchRestaurant () {
      const { restaurant } = dummyData
      this.restaurant = restaurant
    }
  }
}
</script>