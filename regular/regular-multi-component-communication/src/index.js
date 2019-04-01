const broadcator = require('./broadcastor')
const top = require('./top')
const Regular = require("../lib/regular")

const App = new Regular({
  template: `
    <BroadCastor emitter={ aa }>
        <Top />Test
    </BroadCastor> 
  `,
  data: {
    aa: new Regular
  }
})

App.$inject(document.body)
