// const { broadcast, subscribe } = require('./mediator');
const Regular = require('../lib/regular');
const leafNode = require('./leafNode');

const Top = Regular.extend({
  name: 'Top',
  template: '<LeafNode> </LeafNode>',
  config() {
    console.log("Top config");
  },
  init() {
    console.log("Top init");
    this.$subscribe('check', ev => {
      console.log(`accepted emit event:${JSON.stringify(ev)}`);
    })
  }
})

module.exports = Top