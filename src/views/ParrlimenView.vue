<script>
import ListState from "../components/ListState.vue";
import { computed, onMounted } from "vue";
import { useInfoStore } from "../stores/info";
import { mapState } from "pinia";
import capitalize from "lodash/capitalize";
import find from "lodash/find"
import map from 'lodash/map'

const store = useInfoStore();

export default {
  components: { ListState },
  data() {
    return {
      negeri: this.$route.query.negeri
    };
  },
  mounted() {
    store.fetchParlimens();
  },
  computed: {
    ...mapState(useInfoStore, ["parlimens"])
  },
  methods: {
    update(selected) {
      store.updateParlimen(selected);
      location.href = `/dun?parlimen=${capitalize(selected) || ""}&parlimenId=${find(this.parlimens, o => o.nama_parlimen?.toLowerCase() === selected?.toLowerCase())?.kod_parlimen}&negeri=${capitalize(this.negeri) || ""}`;
    },
    capitalize,
    map,
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<template>
  <div>
    <ListState
      :states="map(parlimens , o => o.nama_parlimen) || []"
      :breadcrumb="[{link: '/negeri', text: negeri || ''}, {link: '', text: 'Pilih Parlimen'}]"
      :title="`SENARAI PARLIMEN`"
      :update="update"
      :back="back"
    />
  </div>
</template>

<style scoped>

</style>