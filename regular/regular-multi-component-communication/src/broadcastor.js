const Regular = require("../lib/regular")

const BroadCastor = Regular.extend({
  name: 'BroadCastor',
  template: `{#include this.$body}`,
  config( data ) {
    console.log("BroadCastor config");
    const emitter = data.emitter;
    this._broadcast = emitter.$emit.bind(emitter)
    this._subscribe = emitter.$on.bind(emitter)
  },
  init() {
    console.log("BroadCastor init");
  },
  modifyBodyComponent( component, next ) {
    console.log("BroadCastor modifyBodyComponent");
    component.$broadcast = this._broadcast;
    component.$subscribe = this._subscribe;

    next(component);
  }
})

module.exports = BroadCastor