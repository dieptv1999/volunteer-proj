<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
//import users store
import { useUserStore } from "@/stores/user";
// declare store variable
import type { FormInstance, FormRules } from "element-plus";

const store = useUserStore();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  email: "",
  password: ""
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.login(form.email, form.password);
    } else {
      // console.log("error submit!", fields);
    }
  });
};

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "Please input email", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (
          !value.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        ) {
          callback(new Error("Email invalid."));
        } else callback();
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "Please select password",
      trigger: "change"
    },
    { min: 4, max: 20, message: "Length should be 4 to 20", trigger: "blur" }
  ]
});

onMounted(() => {
  if (localStorage.getItem("token")) {

  }
})

</script>

<template>
  <div class="container-1">
    <div class="title-v1">GERAK KERJA KESELAMATAN RELA (GKKR)</div>
    <div class="container">
      <h1 class="greetings">Login</h1>
      <el-form :model="form" label-width="0px" :rules="rules" ref="ruleFormRef" status-icon>
        <el-form-item label="" prop="email" class="input-email">
          <el-input v-model="form.email" placeholder="Email" type="email" size="large" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="form.password" placeholder="Password" show-password type="password" size="large" />
        </el-form-item>
        <el-form-item class="container-btn">
          <el-button @click="onSubmit(ruleFormRef)" class="login-button">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.container-1 {
  display: flex;
  padding-top: 100px;
  flex-direction: column;
}

.title-v1 {
  text-transform: uppercase;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 47px;
  margin-left: -187px;
}

.greetings {
  text-align: center;
  text-transform: uppercase;
  /*font-family: 'Inter';*/
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 49px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 890px;
  padding: 50px 150px;
  background-color: #DFDFDF;
}

.login-button {
  font-size: 20px;
  height: auto;
  letter-spacing: 0.08rem;
  padding: 17px 76px 16px 77px;
  margin-top: 84px;
}

.container-btn {
  display: flex;
  justify-content: flex-end;
}

.input-email {
  margin-bottom: 55px;
}

@media (max-width: 900px) {
  .container {
    width: 100%;
    padding: 20px 20px;
  }
}

@media (max-width: 1000px) {
  .title-v1 {
    margin-left: 0px;
    font-size: 20px;
  }
}
</style>