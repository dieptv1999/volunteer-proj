<script>
import { ElButton, ElNotification } from "element-plus";
import axios from "axios";
import { useInfoStore } from "@/stores/info";
import { useRoute } from "vue-router";
import { computed } from "vue";


export default {
  setup() {
    const store = useInfoStore();

    const currentRoute = computed(() => {
      return useRoute().path;
    });
    if (window.localStorage && currentRoute && (currentRoute !== "/")) {
      if (window.localStorage.getItem("token")) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage.getItem("token")}`;
      } else {
        // window.location.href = "";
      }

      store.$subscribe((mutation, state) => {
        if (state.notification) {
          ElNotification({
            title: "Notification",
            message: state.notification?.message,
            type: state.notification?.type
          });
        }
      });
    }
    return {
      store,
      currentRoute
    };
  },
  async mounted() {
  }
};
</script>

<template>
  <!--  <header>-->
  <!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />&ndash;&gt;-->

  <!--    <div class="wrapper">-->
  <!--      <HelloWorld msg="GERAK KERJA KESELAMATAN RELA (GKKR)" />-->
  <!--&lt;!&ndash;      <el-button type="primary">Login</el-button>&ndash;&gt;-->

  <!--      <nav>-->
  <!--        <RouterLink to="/">Home</RouterLink>-->
  <!--        <RouterLink to="/login">Login</RouterLink>-->
  <!--        <RouterLink to="/list-states">List States</RouterLink>-->
  <!--        <RouterLink to="/update">Update Form</RouterLink>-->
  <!--      </nav>-->
  <!--    </div>-->
  <!--  </header>-->

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
