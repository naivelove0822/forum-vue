import { apiHelper } from './../utils/helpers'
// 留下來示範如果沒在helper內預先處理getToken的話要怎麼做
const getToken = () => localStorage.getItem('token')

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    created({ name }) {
      return apiHelper.post('/admin/categories', { name }, { headers: { Authorization: `Bearer ${getToken()}` } })
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { categoryId, name }, { headers: { Authorization: `Bearer ${getToken()}` } })
    }
  },
  restaurants: {
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    }
    ,
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, { headers: { Authorization: `Bearer ${getToken()}` } })
    },
    get() {
      return apiHelper.get('/admin/restaurants', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, { headers: { Authorization: `Bearer ${getToken()}` } })
    },
  },
  users: {
    get() {
      return apiHelper.get('/admin/users', { headers: { Authorization: `Bearer ${getToken()}`}})
    },
    update({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin }, { headers: { Authorization: `Bearer ${getToken()}` }})
    }
  }
}