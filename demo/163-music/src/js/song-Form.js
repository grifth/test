{
	let view = {
		el:'.page>main',
        init(){
            this.$el = $(this.el)
        },
		template:`            
		<h1>新建歌曲</h1>
            <form class="form">
                <div class="row">
                    <label>
                      歌名
                    </label>
                    <input name="name" type="text" value="__key__">
                </div>
                <div class="row">
                    <label>
                      歌手
                    </label>
                    <input name="singer" type="text">
                </div>
                <div class="row">
                    <label>
                      外链
                    </label>
                    <input name="url" type="text" value="__link__">
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>                            
            </form>
            `,
            //data={} 如果梅有传形参数 或者形参为undefined
            render( data={}){
                let placeholders = ['key','link']
                let html = this.template
                placeholders.map((string)=>{
                    html=html.replace(`__${string}__`,data[string]||'')
                })
            	$(this.el).html(html)
            }
	}
	let model = {
        data:{
            name:'',singer:'',url:'',id:
''    },
        create(data){
             // 声明类型
              var Song = AV.Object.extend('Song');
              // 新建对象
              var song = new Song();
              // 设置名称
              song.set('name',data.name);
              song.set('singer',data.singer);
              song.set('url',data.url);
              // 设置优先级
              song.save().then( (newSong)=>{
                let { id , attributes} = newSong
                Object.assign(this.data,{
                    id:id,
                    name:attributes.name,
                    singer:attributes.singer,
                    url:attributes.url
                })
                console.log(this.data);
              },  (error)=>{
                console.error(error);
              });
        }
    }
	let controller = {
		init(view,model){
			this.view = view,
            this.view.init(),
			this.model = model,
			this.view.render(this.model.data),
            this.bindEvents(),
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
            })
		},
        active(){
          $(this.view.el).addClass('active')
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data ={}
                needs.map((string)=>{
                    data[string]=this.view.$el.find(`input[name="${string}"]`).val()
                })
                this.model.create(data)
            })
        }
	}
	controller.init(view,model)
}