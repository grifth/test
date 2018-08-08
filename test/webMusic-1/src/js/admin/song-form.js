{
    let view = {
        el:".page > main",
        //value="$name$" 的作用将最新的数据放到页面上
        template:`
        <form class="form">
            <div class="row">
                <label>
                    歌名
                    <input type="text" value="$name$" name="name">
                </label>
            </div>

            <div class="row">
                <label>
                    歌手
                    <input type="text" name="singer" value="$singer$">
                </label>
            </div>

            <div class="row">
                <label>
                    外链
                    <input type="text"  value="$url$" name="url">
                </label>
            </div>

            <div class="row">
                <label>
                    封面
                    <input type="text"  value="$image$" name="image">
                </label>
            </div>





            <div class="row">
                <label>
                    歌词
                    <textarea cols=50 rows=10 name="lyrics"> $lyrics$ </textarea>
                </label>
            </div>

            <div class="row">
                <button type="submit">保存</button>
            </div>                
        </form>
        `,
        //data = {} 是什么意思??换成 data 也能运行啊
        render(data = {}){
            let placeholders = ["name", "url", "singer", "id", "image" ,"lyrics"]
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`$${string}$`, data[string] || "")
                let a = $(this.el).find(`[name="${string}"]`)
            })
            $(this.el).html(html)
            if(data.id){
                $(this.el).prepend("<h1>编辑歌曲</h1>")
            } else{
                $(this.el).prepend("<h1>新建歌曲</h1>")
            }
        },
        //点击保存按钮后, 将 input 的内容清空
        reset(){this.render({})}
    }
    
    let model = {
        data:{
            name:"",
            singer:"",
            url:"",
            id:"",
            image:"",
            lyrics:""
        },
        //将歌名, 歌手, 链接往 leanCloud 存储, 并且让本模块的 model 保存相应数据
        create(data){
            let Song = AV.Object.extend("Song")
            let song = new Song()
            song.set("name", data.name)
            song.set("singer", data.singer)
            song.set("url", data.url)
            song.set("image", data.image)
            song.set("lyrics", data.lyrics)
            //newSong是谁传的?是 song.save() 函数执行完之后
            //then 方法是 promise 对象的一个方法, 
            return song.save().then((newSong)=>{
                //这是 ES6 语法, 执行这句话之后, 会拿出 newSong 对象的 key: value, 原则是根据左边的拿出 key 和相应的 value
                let {id, attributes} = newSong
                //用 ES6 的语法
                //Object.assign(this.data, {id, ...attributes})
                this.data.id = id
                this.data.name = attributes.name
                this.data.singer = attributes.singer
                this.data.url = attributes.url  
                this.data.image = attributes.image 
                this.data.lyrics = attributes.lyrics 
            })
            
        },
        change(data){
            var song = AV.Object.createWithoutData('Song', this.data.id);
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            song.set("image", data.image)
            song.set("lyrics", data.lyrics)
            return song.save().then((data)=>{
                let {id, attributes} = data
                this.data.id = id
                this.data.name = attributes.name
                this.data.singer = attributes.singer
                this.data.url = attributes.url 
                this.data.image = attributes.image 
                this.data.lyrics = attributes.lyrics 
            });
        }
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on("select", (song)=>{
                
                this.model.data = song
                this.view.render(this.model.data)
            })
            window.eventHub.on("upload", (song)=>{
                this.model.data = song
                this.view.render(this.model.data)
            })
            window.eventHub.on("clickNew", (song)=>{
                
                this.model.data = song
                this.view.render(this.model.data)
            })
            this.bindEvents()

        },
        bindEvents(){
            //bindEvents 的作用是将表单的内容用一个对象 data 来保存
            $(this.view.el).on("submit", "form", (e)=>{
                e.preventDefault()

                if(this.model.data.id){
                    //修改歌曲信息
                    let needs = "name url singer image lyrics".split(" ")
                    let data = {}
                    needs.map((need)=>{
                        data[need] = $(this.view.el).find(`[name="${need}"]`).val()
                    })
                    this.model.change(data).then(()=>{
                        this.view.render(this.model.data)
                        let string = JSON.stringify(this.model.data)
                        let object = JSON.parse(string)
                        window.eventHub.emit("change", object)
                        alert("更新成功")
                    })
                } else {
                    //新建歌曲
                    let needs = "name url singer image lyrics".split(" ")
                    let data = {}
                    needs.map((need)=>{
                        data[need] = $(this.view.el).find(`[name="${need}"]`).val()
                    })
                    this.model.create(data).then(()=>{
                        this.view.render(this.model.data)
                        this.view.reset()
                        let string = JSON.stringify(this.model.data)
                        let object = JSON.parse(string)
                        window.eventHub.emit("create", object)
                    })
                }

            })
        },
    }

    controller.init(view, model)
}