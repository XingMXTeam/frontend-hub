<template>
  <div>
    {{test}}
    <rc ref="rc" :revent="REvent" :rdata="RData" :rfilter="RFilter">
      <div v-pre>
        <ux-button value="{name}" on-click="{this.clickBtn($event)}"></ux-button>
      </div>
    </rc>
  </div>
</template>
<script>
import button from "../button/component.js";
export default {
  components: { button },
  data() {
    return {
      test: "hello world"
    };
  }
};
</script>
