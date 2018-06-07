{
	let view = {
		el:'#songList-container',
		template:`
                <ul class="songList" >
                </ul> 
                `,
        render(data){
            let $el = $(this.el)
            let {songs} = data
            $el.html(this.template)
            let liList =songs.map((song)=>$('<li></li>').text(song.name))
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        	$(this.el).html(this.template)
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
	}
	let model = {
        data:{songs:[
            {id:1,name:'1'},{id:2,name:'2'}
            ]
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
            window.eventHub.on('create',(songdata)=>{
                console.log(songdata)
                this.model.data.push(songdata)
                this.view.render(this.model.data)
            })
		}
	}
	controller.init(view,model)
}