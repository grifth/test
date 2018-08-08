{
    let model = {}
    let view = {
        el:".site-loading-ct",
        showLoading(){
            $(this.el).addClass("active")
        },
        hideLoading(){
            $(this.el).removeClass("active")
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            window.eventHub.on("uploading", ()=>{
                if(window.x = "close"){
                    this.view.showLoading()
                }
            })
            window.eventHub.on("upload", ()=>{
                this.view.hideLoading()
            })
        }
    }
    controller.init(view, model)
}