<script>
export default {
  data() {
    return {
      selected: "Selangor",
      states: ["Selangor", "Perak", "Johor", "Sabah", "Sarawak", "Perlis", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Terengganu", "Pulau Pinang", "Wilayah Persekutuan"]
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
          backgroundColor: "var(--el-color-primary-light-3)",
          color: "white"
        };
      else return {
        backgroundColor: "var(--el-color-primary-light-9)",
        color: "var(--el-color-primary)"
      };
    }
  }
};
</script>

<template>
  <div class="container">
    <h2>SENARAI NEGERI</h2>
    <el-scrollbar height="400px" class="scroll-bar">
      <p
        v-for="item in states"
        :key="item"
        class="scrollbar-demo-item"
        v-bind:style="bgcolor(item)"
        @click="setSelected(item)"
      >{{ item }}</p>
    </el-scrollbar>
    <div class="container-btn">
      <el-button type="primary">Pilih</el-button>
      <el-button type="outlined">Kembali</el-button>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  width: 100%;
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
  background: var(--el-color-primary-light-3);
  color: var(--el-color-white);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.container-btn {
  display: flex;
  margin-top: 20px;
}
</style>