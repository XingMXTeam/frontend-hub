 <template>
  <div ref="rc">
    <slot r-if="false"/>
  </div>
</template>
<script>
let attrStringify = obj => {
  let ret = "";
  for (let i in obj) {
    if (obj[i]) {
      ret += " " + i + '="' + obj[i] + '"';
    } else {
      ret += " " + i;
    }
  }
  return ret;
};

// 拼装模版
let formatTpl = arr => {
  let tpl = "";
  arr.forEach(item => {
    if (item.text) {
      tpl += item.text;
    } else if (item.tag) {
      tpl += "<" + item.tag;

      // 组装attr
      if (item.data) {
        tpl += attrStringify(item.data.attrs) + ">";
      } else {
        tpl += ">";
      }

      // 组装子节点
      if (item.children) {
        tpl += formatTpl(item.children);
      }

      // 闭合组件标签
      tpl += "</" + item.tag + ">";
    } else if (item.children) {
      tpl += formatTpl(item.children);
    }
  });
  return tpl;
};
export default {
  data() {},
  created() {
    debugger;
    //   this.$slots 模版
    //   this.rdata 数据
    //   this.revent 业务逻辑
    //   this.rfilter 过滤器
  }
};
</script>

<style scoped>
</style>

 