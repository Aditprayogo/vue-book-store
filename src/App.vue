<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      fade-img-on-scroll
      v-if="isHome"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <!-- bar nav icon -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>BookStore</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>3</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

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

    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      fade-img-on-scroll
      v-else
    >
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>3</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Drawer side -->
    <v-card>
      <v-navigation-drawer app v-model="drawer" white>
        <v-list dense>
          <!-- jika user suda login -->
          <v-list-item v-if="!guest">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
            <!--  -->
          </v-list-item>

          <!-- Jika user belum login -->
          <div class="pa-2" v-if="guest">
            <v-btn block color="primary" class="mb-1">
              <v-icon left>mdi-lock</v-icon>Login
            </v-btn>
            <v-btn block color="success">
              <v-icon left>mdi-account</v-icon>Register
            </v-btn>
          </div>

          <v-divider></v-divider>

          <v-list-item v-for="(item, index) in menus" :key="`menu-`+index" :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <!--  -->
          </v-list-item>
        </v-list>

        <!-- btn logout -->
        <template v-slot:append v-if="!guest">
          <div class="pa-2">
            <v-btn block color="red" dark>
              <v-icon left>mdi-lock</v-icon>Logout
            </v-btn>
          </div>
        </template>
        <!--  -->
      </v-navigation-drawer>
    </v-card>
    <!-- end side drawer -->

    <!-- Content BOdy -->
    <v-content>
      <v-container fluid>
        <v-slide-x-transition>
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-content>
    <!-- COntent Body -->

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
    menus: [
      { title: "Home", icon: "mdi-home-city", route: "/" },
      { title: "My Account", icon: "mdi-account", route: "/about" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ],
    mini: false,
    guest: false
  }),
  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  }
};
</script>
