{
	let view = {
		el:'#songList-container',
		template:`
                <ul class="songList" >

                </ul> 
                `,
        render(data){
        	$(this.el).html(this.template)
            let {songs} = data
            let $el = $(this.el)
            let liList = songs.map((song)=>$('<li></li>').text(song.name).attr('data-song-id',song.id))
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
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
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return {id:song.id,...song.attributes}
                })
                return songs
            })
        }
    }
	let controller ={
		init(view,model){
			this.view = view,
			this.model = model,
			this.view.render(this.model.data)
            this.bindEvents()
            this.getAllSongs()
		},
        getAllSongs(){
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })        
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId = e.currentTarget.getAttribute('data-song-id')
                let data 
                let songs = this.model.data.songs
                for(let i = 0;i<songs.length;i++){
                    if(songs[i].id===songId){
                        data = songs[i]
                    }
                }
                window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
            })
        },
        bindEventHub(){
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(songdata)=>{
                this.model.data.songs.push(songdata)
                this.view.render(this.model.data)
            })            
        }
	}
	controller.init(view,model)
}