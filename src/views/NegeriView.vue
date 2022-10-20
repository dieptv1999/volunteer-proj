<script>
import ListState from "../components/ListState.vue";
import { computed, onMounted } from "vue";
import { useInfoStore } from "../stores/info";
import { mapState } from "pinia";
import capitalize from "lodash/capitalize";

const store = useInfoStore();

export default {
  components: { ListState },
  data() {
    dms: computed(() => {
      return this.store.state.dms;
    });
  },
  mounted() {
    store.fetchDms();
  },
  computed: {
    ...mapState(useInfoStore, ["dms"])
  },
  methods: {
    update(selected) {
      store.updateNegeri(selected);
      location.href = `/parlimen?negeri=${capitalize(selected) || ''}`;
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<template>
  <div>
    <ListState
      :states="dms"
      :breadcrumb="[{link: '/', text: 'Senarai Negeri'}, {link: '', text: 'Pilih Negeri'}]"
      :title="`SENARAI NEGERI`"
      :update="update"
      :back="back"
    />
  </div>
</template>

<style scoped>

</style>