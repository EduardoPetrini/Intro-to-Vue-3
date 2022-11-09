app.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
      default(rawProps) {
        return [];
      }
    }
  },
  template: 
  /*html*/
  `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
  `,
});
