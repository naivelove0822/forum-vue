(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c50f41a"],{"12b2":function(t,e,a){"use strict";var r=function(){var t=this,e=t._self._c;return t.isLoading?e("Spinner"):e("form",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.name,expression:"restaurant.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:t.restaurant.name},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"name",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"categoryId"}},[t._v("Category")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.categoryId,expression:"restaurant.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.restaurant,"categoryId",e.target.multiple?a:a[0])}}},[e("option",{attrs:{value:"",selected:"",disabled:""}},[t._v(" --請選擇-- ")]),t._l(t.categories,(function(a){return e("option",{key:a.id,domProps:{value:a.id}},[t._v(t._s(a.name))])}))],2)]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"tel"}},[t._v("Tel")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.tel,expression:"restaurant.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text",name:"tel",placeholder:"Enter telephone number"},domProps:{value:t.restaurant.tel},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"tel",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"address"}},[t._v("Address")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.address,expression:"restaurant.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",placeholder:"Enter address",name:"address"},domProps:{value:t.restaurant.address},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"address",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"opening-hours"}},[t._v("Opening Hours")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.openingHours,expression:"restaurant.openingHours"}],staticClass:"form-control",attrs:{id:"opening-hours",type:"time",name:"opening_hours"},domProps:{value:t.restaurant.openingHours},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"openingHours",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.description,expression:"restaurant.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:t.restaurant.description},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"description",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"image"}},[t._v("Image")]),t.restaurant.image?e("img",{staticClass:"d-block img-thumbail mb-3",attrs:{src:t.restaurant.image,width:"200",height:"200"}}):t._e(),e("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*"},on:{change:t.handleFileChange}})]),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(" "+t._s(t.isProcessing?"處理中...":"送出")+" ")])])},s=[],n=a("be6c"),i=a("2fa3"),o=a("2375"),u={components:{Spinner:o["a"]},props:{initialRestaurant:{type:Object,default:()=>({name:"",categoryId:"",tel:"",address:"",openingHours:"",description:"",image:""})},isProcessing:{type:Boolean,default:!1}},data(){return{restaurant:{name:"",categoryId:"",tel:"",address:"",openingHours:"",description:"",image:""},categories:[],isLoading:!0}},watch:{initialRestaurant(t){this.restaurant={...this.restaurant,...t}}},created(){this.fetchCategories(),this.restaurant={...this.restaurant,...this.initialRestaurant}},methods:{async fetchCategories(){try{const{data:t}=await n["a"].categories.get();this.categories=t.categories,this.isLoading=!1}catch(t){this.isLoading=!1,i["a"].fire({icon:"error",title:"無法取得餐廳類別，請稍後再試"})}},handleFileChange(t){const{files:e}=t.target;if(0===e.length)this.restaurant.image="";else{const t=window.URL.createObjectURL(e[0]);this.restaurant.image=t}},handleSubmit(t){if(!this.restaurant.name)return void i["a"].fire({icon:"warning",title:"請填寫餐廳名稱"});if(!this.restaurant.categoryId)return void i["a"].fire({icon:"warning",title:"請選擇餐廳類別"});const e=t.target,a=new FormData(e);this.$emit("after-submit",a)}}},d=u,c=a("2877"),l=Object(c["a"])(d,r,s,!1,null,null,null);e["a"]=l.exports},6945:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container py-5"},[e("AdminRestaurantForm",{attrs:{"initial-restaurant":t.restaurant,"is-processing":t.isProcessing},on:{"after-submit":t.handleAfterSubmit}})],1)},s=[],n=(a("d9e2"),a("12b2")),i=a("be6c"),o=a("2fa3"),u={components:{AdminRestaurantForm:n["a"]},data(){return{restaurant:{id:-1,name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""},isProcessing:!1}},created(){const{id:t}=this.$route.params;this.fetchRestaurant(t)},beforeRouteUpdate(t,e,a){const{id:r}=t.params;this.fetchRestaurant(r),a()},methods:{async fetchRestaurant(t){try{const{data:e}=await i["a"].restaurants.getDetail({restaurantId:t}),{id:a,name:r,CategoryId:s,tel:n,address:o,description:u,image:d,opening_hours:c}=e.restaurant;this.restaurant={...this.restaurant,id:a,name:r,categoryId:s,tel:n,address:o,description:u,image:d,openingHours:c}}catch(e){o["a"].fire({icon:"error",title:"無法取得資料，請稍後再試"})}},async handleAfterSubmit(t){try{this.isProcessing=!0;const{data:e}=await i["a"].restaurants.update({restaurantId:this.restaurant.id,formData:t});if("error"===e.status)throw new Error(e.message);this.$router.push({name:"admin-restaurants"})}catch(e){this.isProcessing=!1,o["a"].fire({icon:"error",title:"無法更新資料，請稍後再試"})}}}},d=u,c=a("2877"),l=Object(c["a"])(d,r,s,!1,null,null,null);e["default"]=l.exports},be6c:function(t,e,a){"use strict";var r=a("2fa3");const s=()=>localStorage.getItem("token");e["a"]={categories:{get(){return r["b"].get("/admin/categories",{headers:{Authorization:"Bearer "+s()}})},created({name:t}){return r["b"].post("/admin/categories",{name:t},{headers:{Authorization:"Bearer "+s()}})},delete({categoryId:t}){return r["b"].delete("/admin/categories/"+t,{headers:{Authorization:"Bearer "+s()}})},update({categoryId:t,name:e}){return r["b"].put("/admin/categories/"+t,{categoryId:t,name:e},{headers:{Authorization:"Bearer "+s()}})}},restaurants:{getDetail({restaurantId:t}){return r["b"].get("/admin/restaurants/"+t,{headers:{Authorization:"Bearer "+s()}})},create({formData:t}){return r["b"].post("/admin/restaurants",t,{headers:{Authorization:"Bearer "+s()}})},get(){return r["b"].get("/admin/restaurants",{headers:{Authorization:"Bearer "+s()}})},delete({restaurantId:t}){return r["b"].delete("/admin/restaurants/"+t,{headers:{Authorization:"Bearer "+s()}})},update({restaurantId:t,formData:e}){return r["b"].put("/admin/restaurants/"+t,e,{headers:{Authorization:"Bearer "+s()}})}},users:{get(){return r["b"].get("/admin/users",{headers:{Authorization:"Bearer "+s()}})},update({userId:t,isAdmin:e}){return r["b"].put("/admin/users/"+t,{isAdmin:e},{headers:{Authorization:"Bearer "+s()}})}}}}}]);
//# sourceMappingURL=chunk-3c50f41a.0706ae3c.js.map