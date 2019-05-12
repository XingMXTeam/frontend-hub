<template>
  <div class="hello">{{ msg }}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "One"
    };
  },
  mounted() {
    this.msg = "Two";

    this.$nextTick(() => {
      this.msg = "Three";
    });
  }
};
</script>