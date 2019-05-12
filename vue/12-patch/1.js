//
const addVnodes = function (parentElm, refElm, vnodes, startIdx, endIdx) {

}
const patch = function (olds, news, parentElm) {
    // 旧节点不在了，需要重新创建所有节点
    if (!olds) {
        addVnodes(parentElm, null, news, 0, news.length - 1)
    }
}