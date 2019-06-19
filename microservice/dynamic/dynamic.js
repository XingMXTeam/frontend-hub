import React from 'react'
import Loadable from 'react-loadable'

export default function(dynamicOptions, options) {
    let loadableFn = Loadable
    let loadableOptions = {
        loading: ({error, isLoading}) => {
            if(process.evn.NODE_ENV === 'development') {
                if(isLoading) {
                    return <p>loading...</p>
                }
                if(error) {
                    return (
                        <p>
                            {error.message}
                            <br />
                            {error.stack}
                        </p>
                    )
                }
            }
            return <p>loading...</p>
        }
    }

    // dynamic(import('./a.js'))
    if(typeof dynamicOptions.then === 'function') {
        loadableOptions.loader = () => dynamicOptions
    } 
    // dynamic({loader: import('./a.js')})
    else if( typeof dynamicOptions === 'object') {
        loadableOptions = { ...loadableOptions, ...dynamicOptions }
    }
    // dynamic(import('./a.js'), { loading: ()=> <p>Loading something</p> })
    loadableOptions = { ...loadableOptions, ...options }

    // dynamic({ modules: () => { return { HelloWorld: import('./hello') },  render(props, loaded) {} } })
    if(dynamicOptions.render) {
      loadableOptions.render = (loaded, props) =>  dynamicOptions.render(props, loaded)
    }

    if(dynamicOptions.modules) {
        loadableFn = Loadable.Map
        const loadModules = {}
        const modules = dynamicOptions.modules()
        Object.keys(modules).forEach(key => {
            const value = modules[key]
            if(typeof value.then === 'function') {
                loadModules[key] = () => value.then(mod => mod.default || mod)
                return
            }
            loadModules[key] = value
        })
        loadableOptions.loader = loadModules
    }

    return loadableFn(loadableOptions)
}