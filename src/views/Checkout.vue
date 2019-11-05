<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card flat>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" required append-icon="mdi-user"></v-text-field>
            <v-textarea label="Address" v-model="address" required auto-grow rows="3"></v-textarea>

            <v-text-field label="Phone" v-model="phone" required append-icon="mdi-phone"></v-text-field>

            <v-select
              v-model="province_id"
              :items="provinces"
              item-text="province"
              item-value="id"
              label="Province"
              persistent-hint
              single-line
            ></v-select>
            <!--  -->
            <v-select
              v-model="city_id"
              v-if="province_id>0"
              :items="citiesByProvince"
              item-text="city_name"
              item-value="id"
              label="City"
              persistent-hint
              single-line
            ></v-select>
            <!--  -->
          </v-form>
          <v-card-actions>
            <v-btn color="success" dark @click="saveShipping">
              <v-icon>mdi-content-save</v-icon>&nbsp;
              Save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </div>

    <v-subheader>Your Shopping Cart</v-subheader>
    <div v-if="countCart>0">
      <v-card flat>
        <v-list three-line v-if="countCart>0">
          <template v-for="(item, index) in carts">
            <v-list-item :key="'cart'+index">
              <v-list-item-avatar>
                <v-img :src="getImage('/books/'+item.cover)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle>
                  Rp. {{ item.price.toLocaleString('id-ID') }}
                  ({{ item.weight }} kg)
                  <span
                    style="float:right"
                  >{{ item.quantity }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-container>
          <v-card-actions>
            Subtotal
            <v-spacer />
            Rp. {{ totalPrice.toLocaleString('id-ID') }}
          </v-card-actions>
        </v-container>
      </v-card>
    </div>

    <!--  -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      province_id: 0,
      city_id: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      provinces: "region/provinces",
      cities: "region/cities",

      // tambahkan ini
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
      totalWeight: "cart/totalWeight"
    }),
    citiesByProvince() {
      let province_id = this.province_id;
      return this.cities.filter(city => {
        if (city.province_id == province_id) return city;
      });
    }
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setProvinces: "region/setProvinces",
      setCities: "region/setCities"
    }),
    saveShipping() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("address", this.address);
      formData.set("phone", this.phone);
      formData.set("province_id", this.province_id);
      formData.set("city_id", this.city_id);

      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token
        }
      };
      this.axios
        .post("/shipping", formData, config)
        .then(response => {
          let { data } = response;
          this.setAuth(data.data);
          this.setAlert({
            status: true,
            text: data.message,
            color: "success"
          });
        })
        .catch(error => {
          let { data } = error;
          this.setAlert({
            status: true,
            text: data.message,
            color: "error"
          });
        });
    }
  },
  created() {
    this.name = this.user.name;
    this.address = this.user.address;
    this.phone = this.user.phone;
    this.city_id = this.user.city_id;
    this.province_id = this.user.province_id;

    if (this.provinces && this.provinces.length == 0) {
      this.axios.get("/provinces").then(response => {
        let { data } = response.data;
        this.setProvinces(data);
      });
      this.axios.get("/cities").then(response => {
        let { data } = response.data;
        this.setCities(data);
      });
    }
  }
};
</script>