(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-345b9a51"],{"0e3b":function(e,t,a){},5652:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container py-5"},[t("AdminNav"),t("form",{staticClass:"my-4"},[t("div",{staticClass:"form-row"},[t("div",{staticClass:"col-auto"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.newCategoryName,expression:"newCategoryName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"新增餐廳類別..."},domProps:{value:e.newCategoryName},on:{input:function(t){t.target.composing||(e.newCategoryName=t.target.value)}}})]),t("div",{staticClass:"col-auto"},[t("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.createCategory.apply(null,arguments)}}},[e._v(" 新增 ")])])])]),e.isLoading?t("Spinner"):t("table",{staticClass:"table"},[t("thead",{staticClass:"thead-dark"},[t("tr",[t("th",{attrs:{scope:"col",width:"60"}},[e._v(" # ")]),t("th",{attrs:{scope:"col"}},[e._v(" Category Name ")]),t("th",{attrs:{scope:"col",width:"210"}},[e._v(" Action ")])])]),t("tbody",e._l(e.categories,(function(a){return t("tr",{key:a.id},[t("th",{attrs:{scope:"row"}},[e._v(" "+e._s(a.id)+" ")]),t("td",{staticClass:"position-relative"},[t("div",{directives:[{name:"show",rawName:"v-show",value:!a.isEditing,expression:"!category.isEditing"}],staticClass:"category-name"},[e._v(" "+e._s(a.name)+" ")]),t("input",{directives:[{name:"show",rawName:"v-show",value:a.isEditing,expression:"category.isEditing"},{name:"model",rawName:"v-model",value:a.name,expression:"category.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:a.name},on:{input:function(t){t.target.composing||e.$set(a,"name",t.target.value)}}}),t("span",{directives:[{name:"show",rawName:"v-show",value:a.isEditing,expression:"category.isEditing"}],staticClass:"cancel",on:{click:function(t){return e.handleCancel(a.id)}}},[e._v(" X ")])]),t("td",{staticClass:"d-flex justify-content-between"},[t("button",{directives:[{name:"show",rawName:"v-show",value:!a.isEditing,expression:"!category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.toggleIsEditing(a.id)}}},[e._v(" Edit ")]),t("button",{directives:[{name:"show",rawName:"v-show",value:a.isEditing,expression:"category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.stopPropagation(),t.preventDefault(),e.updateCategory({categoryId:a.id,name:a.name}))}}},[e._v(" Save ")]),t("button",{staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.deleteCategory(a.id)}}},[e._v(" Delete ")])])])})),0)])],1)},s=[],i=(a("d9e2"),a("e04c")),n=a("be6c"),o=a("2fa3"),c=a("2375"),d={name:"AdminCategories",components:{AdminNav:i["a"],Spinner:c["a"]},data(){return{categories:[],newCategoryName:"",isProcessing:!1,isLoading:!0}},created(){this.fetchCategories()},methods:{async fetchCategories(){try{const{data:e}=await n["a"].categories.get();if("error"===e.status)throw new Error(e.message);this.categories=e.categories.map(e=>({...e,isEditing:!1,nameCached:""})),this.isLoading=!1}catch(e){this.isLoading=!1,console.log("error",e),o["a"].fire({icon:"error",title:"無法顯示資料，請稍後再試"})}},async createCategory(){try{this.isProcessing=!0;const{data:e}=await n["a"].categories.created({name:this.newCategoryName});if("error"===e.status)throw new Error(e.message);console.log("data",e),this.categories.push({id:e.categoryId,name:this.newCategoryName,isEditing:!1}),this.isProcessing=!1,this.newCategoryName=""}catch(e){this.isProcessing=!1,console.log("error",e),o["a"].fire({icon:"error",title:"目前無法新增，請稍後再試"})}},async deleteCategory(e){try{const{data:t}=await n["a"].categories.delete({categoryId:e});if("error"===t.status)throw new Error(t.message);this.categories=this.categories.filter(t=>t.id!==e)}catch(t){console.log("error",t),o["a"].fire({icon:"error",title:"目前無法刪除，請稍後再試"})}},async updateCategory({categoryId:e,name:t}){try{const{data:a}=await n["a"].categories.update({categoryId:e,name:t});if("error"===a.status)throw new Error(a.message)}catch(a){o["a"].fire({icon:"error",title:"編輯失敗，請稍後再試"})}console.log("name",t),this.toggleIsEditing(e)},toggleIsEditing(e){this.categories=this.categories.map(t=>t.id===e?{...t,isEditing:!t.isEditing,nameCached:t.name}:t)},handleCancel(e){this.categories=this.categories.map(t=>t.id===e?{...t,name:t.nameCached}:t),this.toggleIsEditing(e)}}},u=d,g=(a("b934"),a("2877")),l=Object(g["a"])(u,r,s,!1,null,"2c376da8",null);t["default"]=l.exports},b934:function(e,t,a){"use strict";a("0e3b")},be6c:function(e,t,a){"use strict";var r=a("2fa3");const s=()=>localStorage.getItem("token");t["a"]={categories:{get(){return r["b"].get("/admin/categories",{headers:{Authorization:"Bearer "+s()}})},created({name:e}){return r["b"].post("/admin/categories",{name:e},{headers:{Authorization:"Bearer "+s()}})},delete({categoryId:e}){return r["b"].delete("/admin/categories/"+e,{headers:{Authorization:"Bearer "+s()}})},update({categoryId:e,name:t}){return r["b"].put("/admin/categories/"+e,{categoryId:e,name:t},{headers:{Authorization:"Bearer "+s()}})}},restaurants:{getDetail({restaurantId:e}){return r["b"].get("/admin/restaurants/"+e,{headers:{Authorization:"Bearer "+s()}})},create({formData:e}){return r["b"].post("/admin/restaurants",e,{headers:{Authorization:"Bearer "+s()}})},get(){return r["b"].get("/admin/restaurants",{headers:{Authorization:"Bearer "+s()}})},delete({restaurantId:e}){return r["b"].delete("/admin/restaurants/"+e,{headers:{Authorization:"Bearer "+s()}})},update({restaurantId:e,formData:t}){return r["b"].put("/admin/restaurants/"+e,t,{headers:{Authorization:"Bearer "+s()}})}},users:{get(){return r["b"].get("/admin/users",{headers:{Authorization:"Bearer "+s()}})},update({userId:e,isAdmin:t}){return r["b"].put("/admin/users/"+e,{isAdmin:t},{headers:{Authorization:"Bearer "+s()}})}}}},e04c:function(e,t,a){"use strict";var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-3"},[t("h1",[e._v("餐廳後台")]),t("router-link",{attrs:{to:"/admin/restaurants"}},[e._v("Restaurants")]),e._v(" | "),t("router-link",{attrs:{to:"/admin/categories"}},[e._v("Categories")]),e._v(" | "),t("router-link",{attrs:{to:"/admin/users"}},[e._v("Users")])],1)},s=[],i=a("2877"),n={},o=Object(i["a"])(n,r,s,!1,null,null,null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-345b9a51.e84302a0.js.map