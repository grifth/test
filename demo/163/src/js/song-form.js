{
    let view = {
        el: '.page > main',
        init(){
            this.$el = $(this.el)
        },
        template: `
        <form class="form">
        <div class="row">
            <label for="">歌名
            </label>
            <input name="name" type="text" value="__name__">
        </div>
        <div class="row">
            <label for="">歌手
            </label>
            <input name="singer" type="text" value="__singer__">
        </div>
        <div class="row">
            <label for="">链接
            </label>
            <input name="url" type="text" value="__url__">
        </div>
        <div class="row actions">
            <button type="submit">保存</button>
        </div>    
        </form>
        `,
        render(data={}){
            let placeholders = ['name','url','singer','id']
            let html = this.template
            $(this.el).html(html)
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`,data[string]|| '') 
            })
            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
    }
    let model = {
        data:{name:'',url:'',id:'',singer:''},
        create(data){
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name',data.name);
            song.set('url',data.url);
            song.set('singer',data.singer);
           return  song.save().then( (song)=>{
                let {id,attributes} = song
                Object.assign(this.data,{
                    id,
                    ...attributes
                })
        },  (error)=>{
              console.error(error);
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.view.render(this.model.data)
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
                
            })
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data  = {}
                needs.map((string)=>{
                    data[string] =  this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                    .then(()=>{
                      this.view.reset()
                      let string = JSON.stringify(this.model.data)
                      let object = JSON.parse(string)
                      window.eventHub.emit('create',object)
                    })
            })
            
        }
    }
    controller.init(view,model)
}