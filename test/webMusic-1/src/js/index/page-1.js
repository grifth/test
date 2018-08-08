{





    let view = {
        el:".tab-content .page-1",
        show(){
            $(this.el).addClass("active")
        },
        hide(){
            $(this.el).removeClass("active")
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            window.eventHub.on("tab", (selectTab)=>{
                if(selectTab === "page-1"){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
            this.loadModule1()
            this.loadModule2()
        },
        loadModule1(){
            let script1 = document.createElement("script")
            script1.src = "./js/index/page-1-1.js"
            document.body.appendChild(script1)
        },
        loadModule2(){
            let script2 = document.createElement("script")
            script2.src = "./js/index/page-1-2.js"
            document.body.appendChild(script2)
        },

    }
    controller.init(view, model)
}