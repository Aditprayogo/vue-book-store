<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

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
      <v-text-field
        slot="extension"
        hide-details
        append-icon="mdi-microphone"
        flat
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>

      <!-- end v bar -->
    </v-app-bar>

    <v-card>
      <v-navigation-drawer app v-model="drawer" white>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-content>
      <v-container fluid>
        <v-slide-x-transition>
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-content>

    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} —
          <strong>Vueshop</strong>
        </v-card-text>
      </v-footer>
    </v-card>
    <!-- end card -->
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  data: () => ({
    //
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ],
    mini: false
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
