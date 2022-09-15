<template>
  <div class="container py-5">
     <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
            v-show="category.isEditing"
            v-model="category.name"
            type="text"
            class="form-control"
            >
            <span
            v-show="category.isEditing"
            class="cancel"
            @click="handleCancel(category.id)"
            > X </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >
              Edit
            </button>
            <button
            v-show="category.isEditing"
            type="button"
            class="btn btn-link mr-2"
            @click.enter.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
          >
            Save
          </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner.vue'
//  2. 定義暫時使用的資料


export default {
  name: 'AdminCategories',
  components: {
    AdminNav,
    Spinner
  },
  // 3. 定義 Vue 中使用的 data 資料
  data () {
    return {
      categories: [],
      newCategoryName: '',
      isProcessing: false,
      isLoading: true
    }
  },
  // 5. 調用 `fetchCategories` 方法
  created () {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.categories = data.categories.map(category => {
        return {
          ...category,
          isEditing: false,
          nameCached: ''
         }
       })
       this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法顯示資料，請稍後再試'
        })
      }
      // 每個category中都添加isEditing屬性
    },
    async createCategory () {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.created({ name: this.newCategoryName })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log('data', data)
        // 讓畫面可以不用重整就會出現物件
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false
      })
      this.isProcessing = false
      this.newCategoryName = ''
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法新增，請稍後再試'
        })
      }
      // 將新的類別添加到陣列中
    },
    async deleteCategory (categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.categories = this.categories.filter(category=> category.id !== categoryId)
      } catch(error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除，請稍後再試'
        })
      }
    },
    async updateCategory ({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({ categoryId, name })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '編輯失敗，請稍後再試'
        })
      }
      console.log('name', name)
      this.toggleIsEditing(categoryId)
    },
    toggleIsEditing (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        }
        return category
      })
    },
    handleCancel (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached
          }
        }
        return category
      })
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>