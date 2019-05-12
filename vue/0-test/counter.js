import myhead from './myhead.js'
export default {
  name: "counter",
  components: {
    myhead
  },
  template: `
      <div>
        <myhead></myhead>
        {{count}}
        <button @click="count++">increment</button>
      </div>
    `,
  data() {
    return {
      count: 0
    }
  }
};
