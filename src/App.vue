<template>
  <v-app>
    <v-app-bar app color="teal lighten-3" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Vueshop</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>3</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <!--end vbar  -->
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({
    //
  }),
  created() {
    console.log(process.env);
  },
  mounted() {
    this.axios
      .get("https://api.jsonbin.io/b/5b42acd44d5ea95c8ba22392")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
