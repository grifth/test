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
            let liList = songs.map((song)=>$('<li></li>').text(song.name))
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }

	}

	let model = {
        data:{
            songs:[]
        }
    }
	let controller ={
		init(view,model){
			this.view = view,
			this.model = model,
			this.view.render(this.model.data)
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            console.log('songlist');
            window.eventHub.on('create',(songdata)=>{
                this.model.data.songs.push(songdata)
                this.view.render(this.model.data)
            })
		}
	}
	controller.init(view,model)
}