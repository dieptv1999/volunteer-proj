<script>
import json from "./data.json";
import { defineComponent, reactive, ref } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import capitalize from "lodash/capitalize";
import findKey from "lodash/findKey";
import isEqual from "lodash/isEqual";
import { mapState } from "pinia";
import { useInfoStore } from "../stores/info";
import { ElNotification } from "element-plus";

const store = useInfoStore();

export default defineComponent({
  setup() {
    const form = reactive({
      time_slot1: 0,
      time_slot2: 0,
      time_slot3: 0,
      time_slot4: 0,
      time_slot5: 0
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
      timeout: 0,
      links: ref([]),
      state: ref(""),
      ID: -1,
      disableBtn: this.ID === -1
    };
  },
  mounted() {
    this.links.value = json.gkkr_dm;
  },
  computed: {
    // ...mapState(useInfoStore, ["infoUpdate"])
  },
  watch: {
    ID(newID, oldId) {
      if (newID !== -1) {
        store.fetchInfoUpdate(newID);
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.ID !== -1 && this.ID !== '-1') {
        await store.updateDm(this.ID, this.form.time_slot1, this.form.time_slot2, this.form.time_slot3, this.form.time_slot4, this.form.time_slot5);
        (() => {
          ElNotification({
            title: "Notification",
            message: "Update successful",
            type: "success"
          });
        })();
      } else {
        (() => {
          ElNotification({
            title: "Notification",
            message: "Select Pdm required",
            type: "error"
          });
        })();
      }
      store.fetchInfoUpdate(this.ID);
    },
    capitalize,
    querySearchAsync(queryString, cb) {
      const results = queryString
        ? this.links.value.filter((e) => e?.E.toLowerCase().includes(queryString.toLowerCase()))
        : this.links.value;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results.map(o => ({ ...o, label: `${o.E} - ${o.ID}` })));
      }, 300 * Math.random());
      this.ID = -1;
      this.state.value = "";
      form.time_slot1 = 0;
      form.time_slot2 = 0;
      form.time_slot3 = 0;
      form.time_slot4 = 0;
      form.time_slot5 = 0;
    },
    handleSelect(item) {
      this.state = item?.label;
      this.ID = item?.ID;
    }
  }
});
</script>

<template>
  <div class="container">
    <!--    <div-->
    <!--      class="autocomplete-v1"-->
    <!--    >-->
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Search Pdm"
      @select="handleSelect"
      fit-input-width="true"
      size="large"
      class="autocomplete-v2"
      clearable="true"
    >
      <template #default="{ item }">
        <div class="value">{{ item.label }}</div>
        <div class="link">{{ item.B }}, {{ item.C }}, {{ item.D }}</div>
      </template>
    </el-autocomplete>
    <!--    </div>-->
    <el-form :model="form" label-width="120px" class="form-v1">

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
      <!--      <el-form-item class="container-btn">-->
      <el-button @click="onSubmit" class="update-button">Update</el-button>
      <!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<style scoped>
.form-v1 {
  margin-top: 10px;
}

.value {
  font-weight: 600;
}

.link {
  font-size: 11px;
  text-transform: capitalize;
  color: #72767b;
  line-height: 1.1;
  margin-bottom: 5px;
}

.autocomplete-v1 {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.autocomplete-v2 {
  width: 100%;
  text-align: center;
}

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