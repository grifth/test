
window.eventHub = {
    events: {
        //key 是事件名
        //key1:[fn1, fn2...]
        //key2:[fn1, fn2...]
        //key3:[fn1, fn2...]
    },
    //发布事件, 执行事件对应的函数
    emit(eventName, data){
        for(let key in this.events){
            if(key === eventName){
                let fnList = this.events[key]
                fnList.map((fn)=>{
                    fn.call(undefined, data)
                })
            }
        }
    }, 
    //订阅事件, 将事件和事件对应函数放到 event 上等待执行
    on(eventName, fn){
        if(this.events[eventName] === undefined){
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    },

}