export default {
    props: ['pages'],
    methods: {
        updatePage (page) {
          this.$emit('updatePage', page)
        }
    },
    template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled : pages.current_page === 1}">
      <a class="page-link" href="#" aria-label="Previous"
      @click="updatePage(pages.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pages.total_pages" :key="page"
      :class="{'active': page === pages.current_page}"
    ><a class="page-link" href="#"
    @click="updatePage(page)"
    >{{page}}</a></li>
    <li class="page-item"  :class="{disabled : pages.current_page === pages.total_pages}">
      <a class="page-link" href="#" aria-label="Next"
         @click="updatePage(pages.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}