{
    let view = {
        el: '#songList-container',
        template: `
        <ul class="songList">

        </ul>
        `,
        render(data){
            let $el = $(this.el)
            $el.html(this.template)
            console.log(data);
            let {songs} = data 
            let liList = songs.map((song)=>$('<li></li>').text(song.name))
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        }
    }
    let model = {
        data:{
            songs:[]
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}