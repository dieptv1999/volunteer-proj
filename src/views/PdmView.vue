<script>
import ListState from "../components/ListState.vue";
import { computed, onMounted } from "vue";
import { useInfoStore } from "../stores/info";
import { mapState } from "pinia";
import capitalize from "lodash/capitalize";
import find from "lodash/find";
import map from "lodash/map";

const store = useInfoStore();

export default {
  components: { ListState },
  data() {
    return {
      negeri: this.$route.query.negeri,
      parlimen: this.$route.query.parlimen,
      parlimenId: this.$route.query.parlimenId,
      dun: this.$route.query.dun,
      dunId: this.$route.query.dunId,
      breadcrumb: [
        { link: "/negeri", text: capitalize(this.$route.query.negeri) || "" },
        {
          link: `/parlimen?name=${this.$route.query.parlimen}&negeri=${this.negeri}`,
          text: capitalize(this.$route.query.parlimen) || ""
        },
        {
          link: `/dun?name=${this.$route.query.dun}&parlimen=${this.$route.query.parlimen}&negeri=${this.$route.query.negeri}&parlimenId=${this.$route.query.parlimenId}`,
          text: capitalize(this.$route.query.dun) || ""
        },
        { link: "", text: "Pilih PDM" }]
    };
  },
  mounted() {
    store.fetchPdms(this.$route.query.parlimenId, this.$route.query.dunId);
  },
  computed: {
    ...mapState(useInfoStore, ["pdms"])
  },
  methods: {
    update(selected) {
      store.updatePdm(selected);
      location.href = `/update?pdm=${capitalize(selected) || ""}&pdmId=${find(this.pdms, o => o.nama_ddm === selected)?.kod_ddm}&dun=${capitalize(this.dun) || ""}&dunId=${this.dunId}&parlimen=${capitalize(this.parlimen) || ""}&parlimenId=${this.parlimenId}&negeri=${capitalize(this.negeri) || ""}`;
    },
    capitalize,
    map,
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <div>
    <ListState
      :states="map(pdms , o => o.nama_ddm) || []"
      :breadcrumb="breadcrumb"
      :title="`SENARAI PDM`"
      :update="update"
      :back="back"
    />
  </div>
</template>

<style scoped>

</style>