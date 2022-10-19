<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <div class="container">
    <h1 class="greetings">Login</h1>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="Email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" placeholder="Password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-button">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 0.08rem;
}
.container {
  display: flex;
  flex-direction: column;
}
.login-button {
  font-size: 18px;
  height: auto;
}
</style>