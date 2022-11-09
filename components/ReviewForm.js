app.component('review-form', {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name"/>

    <label for="review">Review:</label>
    <textarea name="review" id="review" cols="30" rows="10" v-model="review"></textarea>

    <label htmlFor="rating">Rating:</label>
    <select name="rating" id="rating" v-model.number="rating"> 
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <label htmlFor="recommend">Do you recommend this product?</label>
    <select name="recommend" id="recommend" v-model="recommend">
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <input type="submit" value="Submit" class="button" :disabled="emptyForm" :class="{disabledButton: emptyForm}"/>
    </form>
  `,
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      recommend: null,
    }
  },
  methods: {
    onSubmit() {
      const productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommend: this.recommend,
      };

      this.$emit('review-submitted', productReview);

      this.name = '';
      this.review = '';
      this.rating = null;
      this.recommend = null;
    }
  },
  computed: {
    emptyForm(){
      return !this.name || !this.review || this.rating === null || this.recommend === null;
    }
  }
})
