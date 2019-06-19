import dynamic from "./dynamic"

describe('my test', () => {
    test('will render after 1s', () => {
        const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
        const App = dynamic({
            loader: async function() {
                await delay(/* 1s */1000);
                console.log(`render`)
                return `<div>will render after 1s</div>`
            },
        });
    })

    test('dynamic loading with import', () => {
        const demo = dynamic(import( `./demo`), {loading: () =>  <p>loading...</p> })
        console.log(demo)
    })
})