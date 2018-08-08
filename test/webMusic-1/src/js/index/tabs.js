{
    let view = {
        el:"#tabs",

    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on("click", ".tabs-nav li" ,(e)=>{
                let $li = $(e.currentTarget)
                console.log($li)
                $li.addClass("active").siblings().removeClass("active")
                let selectTab = $li.attr("data-tab-name")
                window.eventHub.emit("tab", selectTab)
            })
        }
    }
    controller.init(view, model)
}