<script>
import { DArrowRight } from "@element-plus/icons-vue";
import { useInfoStore } from "../stores/info";
import findIndex from "lodash/findIndex";

const store = useInfoStore();

export default {
  props: {
    states: String,
    breadcrumb: Array,
    title: String,
    update: Function,
    back: Function,
  },
  data() {
    return {
      selected: this.states.length > 0 ? this.states[0] : ""
    };
  },
  // actions
  methods: {
    setSelected(selected) {
      this.selected = selected;
    },
    bgcolor(selected) {
      if (this.selected === selected)
        return {
          backgroundColor: "#7367F0",
          color: "white",
          border: "none"
        };
      else return {
        backgroundColor: "white",
        color: "black",
        border: "1px solid #000000"
      };
    },
    accept() {
      if (findIndex(this.states, o => o.toLowerCase() === this.selected.toLowerCase()) !== -1) {
        this.update(this.selected);
      }
    }
  }
};
</script>

<template>
  <div class="container-1">
    <div class="title-v1">{{ title }}</div>
    <el-breadcrumb :separator-icon="DArrowRight" class="breadcrumb-v1">
      <el-breadcrumb-item v-for="item in breadcrumb" :to="item.link">{{ item.text }}</el-breadcrumb-item>
      <!--      <el-breadcrumb-item :to="{ path: '/' }">Senarai Negeri</el-breadcrumb-item>-->
      <!--      <el-breadcrumb-item>Pilih Negeri</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div class="container">
      <div>
        <p
          v-for="item in states"
          :key="item"
          class="scrollbar-demo-item"
          v-bind:style="bgcolor(item)"
          @click="setSelected(item)"
        >{{ item }}</p>
      </div>
    </div>
    <div class="container-btn">
      <el-button class="button-end" @click="accept" :disabled="!selected">Pilih</el-button>
      <el-button class="button-end" @click="back">Kembali</el-button>
    </div>
  </div>
</template>

<style scoped>
.container-1 {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
}

.title-v1 {
  text-transform: uppercase;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 29px;
  margin-left: -187px;
}

.breadcrumb-v1 {
  margin-left: -187px;
  margin-bottom: 5px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
}

.scrollbar-demo-item:hover {
  background: #7367F0;
  color: var(--el-color-white);
}

.container {
  display: flex;
  flex-direction: column;
  width: 890px;
  padding: 50px 150px;
  background-color: #DFDFDF;
  border-radius: 7px;
}

.container-btn {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}

.button-end {
  font-size: 20px;
  height: auto;
  letter-spacing: 0.08rem;
  padding: 17px 76px 16px 77px;
  margin-top: 22px;
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