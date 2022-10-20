<script>
import ListState from "../components/ListState.vue";
import { computed, onMounted } from "vue";
import { useInfoStore } from "../stores/info";
import { mapState } from "pinia";
import capitalize from "lodash/capitalize";
import find from "lodash/find"
import map from 'lodash/map'

const store = useInfoStore()

export default {
  components: { ListState },
  data() {
    return {
      negeri: this.$route.query.negeri,
      parlimen: this.$route.query.parlimen,
      parlimenId: this.$route.query.parlimenId,
    }
  },
  mounted() {
    store.fetchDuns(this.$route.query.parlimenId);
  },
  computed:{
    ...mapState(useInfoStore, ['duns'])
  },
  methods: {
    update(selected) {
      store.updateDun(selected);
      location.href = `/pdm?dun=${capitalize(selected) || ''}&dunId=${find(this.duns, o => o.nama_dun === selected)?.kod_dun}&parlimen=${capitalize(this.parlimen) || ''}&parlimenId=${this.parlimenId}&negeri=${capitalize(this.negeri) || ''}`;
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
      :states="map(duns , o => o.nama_dun) || []"
      :breadcrumb="[{link: '/negeri', text: capitalize(negeri) || ''}, {link: `/parlimen?name=${this.$route.query.parlimen}&negeri=${this.negeri}`, text: capitalize(parlimen) || ''}, {link: '', text: 'Pilih DUN'}]"
      :title="`SENARAI DUN`"
      :update="update"
      :back="back"
    />
  </div>
</template>

<style scoped>

</style>