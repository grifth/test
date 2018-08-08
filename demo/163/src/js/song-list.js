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
            let {songs} = data 
            let liList = songs.map((song)=>$('<li></li>').text(song.name).attr('data-id',song.id))
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        activeItem(li){
            let $li = $(li)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        }
    }
    let model = {
        data:{
            songs:[]
        },
        find(){
             var query = new AV.Query('Song')
           return query.find().then((songs)=>{
               console.log(songs);
                this.data.songs = songs.map((song)=>{
                    return {id:song.id,...song.attributes}
                })
                return songs
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.getAllSongs()
            this.bindEvents()
            window.eventHub.on('create',(data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
            })
        },
        getAllSongs(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId = e.currentTarget.getAttribute('data-id')
                window.eventHub.emit('select',{
                    id:songId
                })
            })
        }
    }
    controller.init(view,model)
}