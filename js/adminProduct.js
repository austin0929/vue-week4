const { createApp } = Vue
const api_path = 'david777'

import modal from './modal.js'
import removeModal from './deleteModal.js'
import pagination from './pagination.js'
const app = createApp({
    data() {
      return {
        products: [],
        tempProduct: {},
        isNew: false,
        delProductId: '',
        pagination: {}
      }
    },
    components: {
      modal,
      removeModal,
      pagination
    },
    methods: {
        getProducts(page = 1) {
        const api = `https://vue3-course-api.hexschool.io/v2/api/${api_path}/admin/products?page=${page}`
            axios.get(api).then((res) => {
              this.products = res.data.products
              this.pagination = res.data.pagination
            })
        },
        openModel (isNew, item) {
            this.$refs.pModal.openModal()
            if (isNew) {
              this.tempProduct = {}    
            } else {
              this.tempProduct = {...item}
            }
            this.isNew = isNew
          // 5 判斷this.tempProduct.imagesUrl不是陣列時 給予他陣列屬性
          // 避免新增產品無imagesUrl陣列而報錯
            if (!Array.isArray(this.tempProduct.imagesUrl)) {
               this.tempProduct.imagesUrl = []
            }
        },
        delOpenModel (product) {
            this.$refs.dModal.delOpenModal()
            this.delProductId = product.id
            this.tempProduct = product
        },
        updateProduct () {
            let httpMethods = 'post'
          let api = `https://vue3-course-api.hexschool.io/v2/api/${api_path}/admin/product`
            if (!this.isNew) {
                httpMethods = 'put'
                const editId = this.tempProduct.id
              api = `https://vue3-course-api.hexschool.io/v2/api/${api_path}/admin/product/${editId}`
            }
            axios[httpMethods](api, { data: this.tempProduct }).then((res) => {
                this.tempProduct = {}
                this.$refs.pModal.hideModal()
                this.getProducts()
            })
        },
        delProduct () {
          const api = `https://vue3-course-api.hexschool.io/v2/api/${api_path}/admin/product/${this.delProductId}`
            axios.delete(api).then((res) => {
              this.tempProduct = {}
              this.$refs.dModal.delHideModal()
              this.getProducts()
            })
        },
    },
    mounted () {
      const api = 'https://vue3-course-api.hexschool.io/v2/api/user/check'
        const myCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)vuetoken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common.Authorization = myCookie
        if (!myCookie) {
          window.location.href = 'https://austin0929.github.io/vue-week4/';
        }
        axios.post(api).then((res) => {
        }),
        this.getProducts()
    }
}).mount('#app')