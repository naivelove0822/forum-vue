(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d338e"],{"5c9c":function(e,s,a){"use strict";a.r(s);var t=function(){var e=this,s=e._self._c;return s("div",{staticClass:"container py-5"},[s("form",{staticClass:"w-100",on:{submit:function(s){return s.preventDefault(),s.stopPropagation(),e.handleSubmit.apply(null,arguments)}}},[e._m(0),s("div",{staticClass:"form-label-group mb-2"},[s("label",{attrs:{for:"name"}},[e._v("Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"name",autocomplete:"username",required:"",autofocus:""},domProps:{value:e.name},on:{input:function(s){s.target.composing||(e.name=s.target.value)}}})]),s("div",{staticClass:"form-label-group mb-2"},[s("label",{attrs:{for:"email"}},[e._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"email",autocomplete:"email",required:""},domProps:{value:e.email},on:{input:function(s){s.target.composing||(e.email=s.target.value)}}})]),s("div",{staticClass:"form-label-group mb-3"},[s("label",{attrs:{for:"password"}},[e._v("Password")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"Password",autocomplete:"new-password",required:""},domProps:{value:e.password},on:{input:function(s){s.target.composing||(e.password=s.target.value)}}})]),s("div",{staticClass:"form-label-group mb-3"},[s("label",{attrs:{for:"password-check"}},[e._v("Password Check")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordCheck,expression:"passwordCheck"}],staticClass:"form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",placeholder:"Password",autocomplete:"new-password",required:""},domProps:{value:e.passwordCheck},on:{input:function(s){s.target.composing||(e.passwordCheck=s.target.value)}}})]),s("button",{staticClass:"btn btn-lg btn-primary btn-block mb-3",attrs:{type:"submit",disabled:e.isProcessing}},[e._v(" "+e._s(e.isProcessing?"處理中":"Submit")+" ")]),s("div",{staticClass:"text-center mb-3"},[s("p",[s("router-link",{attrs:{to:"/signin"}},[e._v(" Sign In ")])],1)]),s("p",{staticClass:"mt-5 mb-3 text-muted text-center"},[e._v(" © 2017-2018 ")])])])},r=[function(){var e=this,s=e._self._c;return s("div",{staticClass:"text-center mb-4"},[s("h1",{staticClass:"h3 mb-3 font-weight-normal"},[e._v(" Sign Up ")])])}],o=(a("d9e2"),a("7696")),i=a("2fa3"),n={data(){return{name:"",email:"",password:"",passwordCheck:"",isProcessing:!1}},methods:{async handleSubmit(){try{this.email&&this.password||i["a"].fire({icon:"warning",title:"請填寫email或密碼"}),this.password!==this.passwordCheck&&i["a"].fire({icon:"warning",title:"密碼與確認密碼不相符"}),this.isProcessing=!0;const{data:e}=await o["a"].signUp({name:this.name,email:this.email,password:this.password,passwordCheck:this.passwordCheck});if("error"===e.status)throw new Error(e.message);this.$roter.push({name:"sign-in"})}catch(e){console.log("error",e),this.isProcessing=!1,i["a"].fire({icon:"error",title:e})}}}},l=n,m=a("2877"),c=Object(m["a"])(l,t,r,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0d338e.50ffd40c.js.map