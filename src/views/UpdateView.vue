<script>
import { defineComponent, reactive } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import capitalize from "lodash/capitalize";
import findKey from "lodash/findKey";
import isEqual from "lodash/isEqual";
import { mapState } from "pinia";
import { useInfoStore } from "../stores/info";

const store = useInfoStore();

export default defineComponent({
  setup() {
    const form = reactive({
      time_slot1: "",
      time_slot2: "",
      time_slot3: "",
      time_slot4: "",
      time_slot5: ""
    });
    store.$subscribe((mutation, state) => {
      form.time_slot1 = state.infoUpdate.time_slot1;
      form.time_slot2 = state.infoUpdate.time_slot2;
      form.time_slot3 = state.infoUpdate.time_slot3;
      form.time_slot4 = state.infoUpdate.time_slot4;
      form.time_slot5 = state.infoUpdate.time_slot5;
    });
    return {
      form
    };
  },
  data() {
    return {
      negeri: this.$route.query.negeri,
      parlimen: this.$route.query.parlimen,
      parlimenId: this.$route.query.parlimenId,
      dun: this.$route.query.dun,
      dunId: this.$route.query.dunId,
      pdm: this.$route.query.pdm,
      pdmId: this.$route.query.pdmId,
      breadcrumb: [
        { link: "/negeri", text: capitalize(this.$route.query.negeri) || "" },
        {
          link: `/parlimen?name=${this.$route.query.parlimen}&negeri=${this.$route.query.negeri}`,
          text: capitalize(this.$route.query.parlimen) || ""
        },
        {
          link: `/dun?name=${this.$route.query.dun}&parlimen=${this.$route.query.parlimen}&negeri=${this.$route.query.negeri}&parlimenId=${this.$route.query.parlimenId}`,
          text: capitalize(this.$route.query.dun) || "" },
        {
          link: `/pdm?name=${this.$route.query.pdm}&parlimen=${this.$route.query.parlimen}&negeri=${this.$route.query.negeri}&parlimenId=${this.$route.query.parlimenId}&dun=${this.$route.query.dun}&dunId=${this.$route.query.dunId}`,
          text: capitalize(this.$route.query.pdm)
        }]
    };
  },
  mounted() {
    store.fetchInfoUpdate(this.$route.query.parlimenId, this.$route.query.dunId, this.$route.query.pdmId);
  },
  computed: {
    ...mapState(useInfoStore, ["infoUpdate"])
  },
  methods: {
    async onSubmit() {
      await store.updateDm(this.form.time_slot1, this.form.time_slot2, this.form.time_slot3, this.form.time_slot4, this.form.time_slot5);
      store.fetchInfoUpdate(this.$route.query.parlimenId, this.$route.query.dunId, this.$route.query.pdmId);
    },
    capitalize
  }
});
</script>

<template>
  <div class="container">
    <el-breadcrumb :separator-icon="DArrowRight" class="breadcrumb-v1">
      <el-breadcrumb-item v-for="item in breadcrumb" :to="item.link">{{ item.text }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" label-width="120px">
      <div class="container-v1">

        <el-form-item label="8:00 - 10:00" class="el-form-item--label-left">
          <el-input-number v-model="form.time_slot1" size="large" class="input-con" />
        </el-form-item>
        <el-form-item label="10:00 - 12:00" class="el-form-item--label-left">
          <el-input-number v-model="form.time_slot2" size="large" class="input-con" />
        </el-form-item>
        <el-form-item label="12:00 - 2:00" class="el-form-item--label-left">
          <el-input-number v-model="form.time_slot3" size="large" class="input-con" />
        </el-form-item>
        <el-form-item label="2:00 - 4:00" class="el-form-item--label-left">
          <el-input-number v-model="form.time_slot4" size="large" class="input-con" />
        </el-form-item>
        <el-form-item label="4:00 - 6:00" class="el-form-item--label-left">
          <el-input-number v-model="form.time_slot5" size="large" class="input-con" />
        </el-form-item>
      </div>
      <el-form-item class="container-btn">
        <el-button @click="onSubmit" class="update-button">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.breadcrumb-v1 {
  margin-bottom: 27px;
}

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
  width: 100%;
  padding: 50px;
  background-color: #DFDFDF;
}

.container-btn {
  font-size: 18px;
  height: auto;
  width: 100%;
}

.update-button {
  width: 100%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  padding: 17px 0px 16px 0px;
  height: auto;
  letter-spacing: 0.08rem;
}

.container-v1 {
  background-color: white;
  border-radius: 7px;
  padding: 50px;
  margin-bottom: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-con {
  width: 170px;
}

</style>