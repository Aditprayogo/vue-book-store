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
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <v-text-field
        slot="extension"
        hide-details
        append-icon="mdi-microphone"
        solo-inverted
        flat
        label="Search"
        prepend-inner-icon="mdi-magnify"
        @click="setDialogComponent('search')"
      ></v-text-field>

      <!-- end v bar -->
    </v-app-bar>

    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      src="https://picsum.photos/1920/1080?random"
      v-else
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,89,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- icon keranjang belanja -->
      <v-btn icon to="/about">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Drawer side -->
    <v-card>
      <v-navigation-drawer app v-model="drawer" white>
        <!--  -->
        <v-list dense>
          <!-- jika user suda login -->
          <v-list-item v-if="!guest">
            <v-list-item-avatar>
              <v-img :src="getImage('/users/'+user.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
            <!--  -->
          </v-list-item>

          <!-- Jika user belum login -->
          <div class="pa-2" v-if="guest">
            <v-btn block color="primary" class="mb-1" @click="setDialogComponent('login')">
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
            <v-btn block color="red" dark @click="logout">
              <v-icon left>mdi-lock</v-icon>Logout
            </v-btn>
          </div>
        </template>
        <!--  -->
      </v-navigation-drawer>
    </v-card>
    <!-- end side drawer -->

    <!-- alert notif -->
    <alert />

    <!-- search dialog -->
    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>

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
          <strong>Bookstore</strong>
        </v-card-text>
      </v-footer>
    </v-card>
    <!-- end card -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert.vue"),
    Search: () => import("./components/Search.vue"),
    Login: () => import("./components/Login.vue")
  },
  data: () => ({
    //
    drawer: false,
    menus: [
      { title: "Home", icon: "mdi-home-city", route: "/" },
      { title: "My Account", icon: "mdi-account", route: "/about" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ],
    mini: false
  }),
  //   end data
  methods: {
    ...mapActions({
      // menutup dialog
      setDialogStatus: "dialog/setStatus",
      //   mengganti component
      setDialogComponent: "dialog/setComponent",
      setAuth: "auth/set",
      setAlert: "alert/set"
    }),
    logout() {
      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token
        }
      };
      this.axios
        .post("/logout", {}, config)
        .then(() => {
          this.setAuth({}); // kosongkan auth ketika logout
          this.setAlert({
            status: true,
            color: "success",
            text: "Logout successfully"
          });
        })
        .catch(error => {
          let { data } = error.response;
          this.setAlert({
            status: true,
            color: "error",
            text: data.message
          });
        });
    }
  },
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
    ...mapGetters({
      countCart: "cart/count",
      guest: "auth/guest",
      user: "auth/user",
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component"
    }),
    // untuk set dialog akan tampil atau tidak
    // karena menggunakan v-dialog menggunakan v-model
    // yang harus menggunakan set dan get
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      }
    }
  }
};
</script>
