<script lang="ts" setup>
import { reactive } from "vue";
import { ArrowRight } from '@element-plus/icons-vue'

// do not use same name with ref
const form = reactive({
  date1: "",
  date2: "",
  date3: "",
  date4: "",
  date5: "",
  date6: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <div class="container">
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Selangor</el-breadcrumb-item>
      <el-breadcrumb-item>Hulu Selangor</el-breadcrumb-item>
      <el-breadcrumb-item>Hulu Bernam</el-breadcrumb-item>
      <el-breadcrumb-item>Ladang Escot</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" label-width="120px">
      <el-form-item label="8:00 - 10:00" class="el-form-item--label-left">
        <el-input v-model="form.date1"/>
      </el-form-item>
      <el-form-item label="10:00 - 12:00" class="el-form-item--label-left">
        <el-input v-model="form.date2"/>
      </el-form-item>
      <el-form-item label="8:00 - 10:00" class="el-form-item--label-left">
        <el-input v-model="form.date3"/>
      </el-form-item>
      <el-form-item label="10:00 - 12:00" class="el-form-item--label-left">
        <el-input v-model="form.date4"/>
      </el-form-item>
      <el-form-item label="8:00 - 10:00" class="el-form-item--label-left">
        <el-input v-model="form.date5"/>
      </el-form-item>
      <el-form-item label="10:00 - 12:00" class="el-form-item--label-left">
        <el-input v-model="form.date6"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-button">Update</el-button>
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
  width: 100%;
}

.el-form-item__label {
  justify-content: flex-start;
}

.breadcrumb {
  margin-bottom: 20px;
  margin-top: 20px;
}

</style>