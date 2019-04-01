// const { broadcast, subscribe } = require('./mediator')
const Regular = require("../lib/regular")

const LeafNode = Regular.extend({
  name: 'LeafNode',
  template: `<div on-click={ this.onClick() }> click me </div>`,
  config() {
    console.log("LeafNode config");
  },
  init() {
    console.log("LeafNode init");
  },
  onClick() {
    this.$broadcast('check', { type: 'leafnode' })
  }
})

module.exports = LeafNode