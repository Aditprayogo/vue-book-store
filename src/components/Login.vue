<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Login and start shooping</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-container fluid>
        <!-- lazy validation untuk mentrigger validate -->
        <!-- jadi tidak bikin manual -->
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- text email -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            append-icon="mdi-email"
          ></v-text-field>
          <!-- text password -->
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="text-xs-center">
            <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
              Login
              <v-icon right dark>mdi-lock-open</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      email: "talia56@example.net",
      //   rules for email
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(
            v
          ) || "E-mail must be valid"
      ],
      showPassword: false,
      password: "",
      //   password rules
      passwordRules: [
        v => !!v || "Password required.",
        v => (v && v.length >= 6) || "Min 6 characters"
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set"
    }),
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          email: this.email,
          password: this.password
        };
        this.axios
          .post("/login", formData)
          .then(response => {
            let { data } = response.data;
            this.setAuth(data);
            if (this.user.id > 0) {
              this.setAlert({
                status: true,
                color: "success",
                text: "Login berhasil"
              });
              this.close();
            } else {
              this.setAlert({
                status: true,
                color: "error",
                text: "Login failed"
              });
            }
          })
          .catch(error => {
            let responses = error.response;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.data.message
            });
          });
      }
    },
    close() {
      this.$emit("closed", false);
    }
  }
};
</script>