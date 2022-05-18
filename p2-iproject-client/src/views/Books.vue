<template>
  <!--START CATALOG LIST  -->
  <section id="catalog">
    <br>
    <br>
    <br>
    <br>
    <div v-if="isLoading" class="container">
      <img class="loadingGif" src="@/assets/loading.gif" alt="loadingGif">
    </div>
    <div v-if="!isLoading" class="container">
      <div class="row">
        <div class="col-9 mb-2">
          <a class="btn btn-link text-dark fs-5" style="display: inline-block">Search By Title:</a>
          <input v-model = "searchByTitle" type="text" class="form-control fs-5" aria-describedby="inputGroup-sizing-sm" placeholder="type the title....." style="display: inline-block; width:25vw">
        </div>
        <div class="col-3 mb-2 text-end">
          <a class="btn btn-success text-white fs-5" @click="$router.push({name : 'Home'})" >Search By Category</a>
        </div>
      </div>
      <div class="row mt-3" id="catalogCard">
        <!-- awal loop -->
        <BookCard
        v-for="book in books"
        :key=book.id
        :book="book"
        />
        <!-- akhir loop -->
      </div>
    </div>
  </section>
  <!-- END CATALOG LIST -->
</template>

<script>
import BookCard from '../components/BookCard'
export default {
  data () {
    return {
      searchByTitle: ''
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    books () {
      const wishlists = this.$store.state.wishlists
      const books = this.$store.state.books
      const filtered = []
      for (let i = 0; i < books.length; i++) {
        let count = 0
        for (let j = 0; j < wishlists.length; j++) {
          if (books[i].isbn !== wishlists[j].isbn) {
            count++
          }
        }
        if (count === wishlists.length) {
          filtered.push(books[i])
        }
      }
      return filtered.filter(e => {
        return e.title.toLowerCase().includes(this.searchByTitle.toLowerCase())
      })
    }
  },
  components: { BookCard },
  created () {
    this.$store.dispatch('fetchBooks', this.$route.params.category)
  }
}
</script>

<style>
.loadingGif {
  width: 100%;
  height: auto;
}
</style>
