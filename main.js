const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false,
      cartSize: 0
    }
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);

      this.cartSize += 1;
    },
    removeFromCart(id) {
      const index = this.cart.findIndex(currentId => currentId === id);
      
      this.cart = [...this.cart.slice(0, index), ...this.cart.slice(index + 1, this.cart.length)];
      
      this.cartSize -= 1;
    }
  }
})
