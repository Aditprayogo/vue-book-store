<template>
  <div>
    <v-card :to="'/book/'+ book.slug" shaped="shaped" elevation="20" class="rounded-card">
      <v-img :src="getImage('/books/'+book.cover)" class="white--text" height="200px">
        <v-card-title class="fill-height align-end" v-text="book.title"></v-card-title>
      </v-img>
      <v-card-actions>
        <v-icon>mdi-cash</v-icon>
        <v-spacer></v-spacer>

        <span class="orange--text">Rp {{ book.price.toLocaleString('idID') }}</span>
        <v-spacer></v-spacer>
        <v-icon>mdi-eye</v-icon>
        {{ book.views }}
      </v-card-actions>
    </v-card>
  </div>
</template>



<script>
export default {
  name: "book-item",
  props: ["book"],
  data: () => ({
    shaped: false
  })
};
</script>

<style lang="stylus" scoped>
.rounded-card {
  border-radius: 20px;
}
</style>
