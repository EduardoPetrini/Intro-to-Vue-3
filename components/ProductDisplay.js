app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cartSize: {
      type: Number,
      required: true
    }
  },
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="image"/>
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ product.description }}</p>
          <p v-show="product.onSale">On Sale</p>
          <p v-if="inStock > 10">In Stock</p>
          <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
          <p v-else>Out of stock</p>
          <p> Shipping: {{shipping}} </p>
          
          <product-details :details="product.details"></product-details>

          <div v-for="(variant, index) in product.variants" :key="variant.id" @mouseover="updateImage(index)" class="color-circle" :style="{ backgroundColor: variant.color}"></div>

          <div v-for="size in product.sizes" :key="size.id" :class="{classdisabled: size.out}">{{ size.size }}</div>
          <button class="button" @click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
          <button class="button" @click="removeFromCart" :disabled="cartSize == 0" :class="{disabledButton: cartSize == 0}">Remove from Cart</button>
        </div>
      </div>
      <list-review v-if="product.reviews.length > 0" :reviews="product.reviews"></list-review>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
  data() {
    return {
      product: {
        name: 'Socks',
        brand: 'Vue Mastery',
        description: 'This is the description',
        inStock: true,
        selectedVariant: 0,
        onSale: false,
        details: ["50% cotton", "30% wool", "20% polyester"],
        variants: [
          { id: 1, color: "green", image: './assets/images/socks_green.jpg', quantity: 12 },
          { id: 2, color: "blue", image: './assets/images/socks_blue.jpg', quantity: 0 }
        ],
        sizes: [
          { id: 2, size: 38, out: true },
          { id: 1, size: 40 },
          { id: 2, size: 42 }
        ],
        reviews: []
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product.variants[this.product.selectedVariant].id);

      this.product.variants[this.product.selectedVariant].quantity -= 1;
    },
    updateImage(index) {
      this.product.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.product.variants[this.product.selectedVariant].id);
      
      this.product.variants[this.product.selectedVariant].quantity += 1;
    },
    addReview(review){
      this.product.reviews.push(review);
    }
  },
  computed: {
    title() {
      return `${this.product.brand} ${this.product.name}`
    },
    image() {
      return this.product.variants[this.product.selectedVariant].image
    },
    inStock() {
      return this.product.variants[this.product.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})
