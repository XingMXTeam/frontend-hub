import React from "React";
//websocket as an epic
const socket = WebSocketSubject.create('ws://stock/endpoint');
const stockTickerEpic = (action$, store) => {
  action$.ofType('START_TICKER_STREAM')
        .mergeMap(action => socket.muliplex(
          ()=>({sub: action.ticker}),
          () => ({unsub: action.ticker}),
          msg=>msg.ticker === action.ticker
        ).retryWhen(
          err=>window.navigator.onLine ? 
          Observable.timer(1000) : 
          Observable.fromEvent(window, 'online')
        ).takeUtil(action$.ofType('CLOSE_TICKER_STREAM').filter(closeAction=>closeAction.ticker === action.ticker)
        ).map(tick => ({
          type: 'TICKER_TICK', tick
        }))
};


// redux-observable的写法
const autoCompleteEpic = (actions$, store) => {
  actions$.ofType('QUERY')
  .debounceTime(500)
  .swtichMap(action => 
  ajax('https://api.github.com/search/users?q=' + value).map(payload => ({
    type: 'QUERY_FULLFILLED',
    payload
  }))
  .takeUtil(actions$.ofType('CANCEL_QUERY'))
  .catch(payload=>{
   type: 'QUERY_REJECTED',
   error: true,
   payload
  })
};


class AutoComplete extends React.Component {
  onKeyup(e) {
    const { store } = this.props;
    const { value } = e.target.value;

    if (this.queryId) {
      clearTimeout(this.queryId);
    }

    // 延迟500ms发出去请求
    this.queryId = setTimeout(() => {
      // 已经有发出去的请求了，则取消
      if (this.xhr) {
        this.xhr.abort();
      }
      const xhr = (this.xhr = new XMLHttpRequest());
      xhr.open("GET", "https://api.github.com/search/users?q=" + value);
      xhr.onload = () => {
        if (xhr.status === 200) {
          store.dispatch({
            type: "QUERY_FULLFILED",
            payload: JSON.parse(xhr.response).items
          });
        } else {
          store.dispatch({
            type: "QUERY_REJECTED",
            error: true,
            payload: {
              message: xhr.response,
              status: xhr.status
            }
          });
        }
        xhr.send();
      };
    }, 500);
  }
}
