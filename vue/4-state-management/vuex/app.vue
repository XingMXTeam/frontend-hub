<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }}</p>
    <p v-show="!totalTvCount">I can't buy any</p>
    <button :disabled="!totalTvCount" @click="buyTv">Buy TV</button>
  </div>
</template>

<script>
export default {
  name: "Customer",
  computed: {
    totalTvCount() {
      return this.$store.state.totalTvCount;
    },
    happyStaff() {
      return this.$store.state.happyStaff;
    }
  },
  methods: {
    buyTv() {
      this.$store.dispatch("removeTv");
    }
  }
};
</script>
<style lang="" scoped>
</style>