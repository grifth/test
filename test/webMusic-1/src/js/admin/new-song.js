{
    let view = {
        el:".page .newSong",
        template: `
            新建歌曲
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }

    let model = {}

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.active()
            //当 uoload 事件完成时, 执行函数, 函数传入的参数就是 emit("upload", xxx)中的 xxx 
            window.eventHub.on("clickNew", (data)=>{
                this.active()
            })
            window.eventHub.on("select", (data)=>{
                this.clearActive()
            })
            this.bindEvents()
        },
        active(){
            $(this.view.el).addClass("active")
        },
        clearActive(){
            $(this.view.el).removeClass("active")
        },
        bindEvents(){
            $(this.view.el).on("click", ()=>{
                window.eventHub.emit("clickNew", {})
            })
        }
    }

    controller.init(view, model)
}