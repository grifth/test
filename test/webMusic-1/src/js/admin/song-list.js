{
    let view = {
        el:'.page #songList-container',
        template: `
        <ul class="songList">
        </ul>
        `,
        render(data){
            
            let $el = $(this.el)
            $el.html(this.template)
            let {songs, selectSongId} = data

            let liList = songs.map((song)=>{
                let li = $("<li></li>")
                li.text(song.name).attr("data-id", song.id)

                let svg = $("<svg class='icon' aria-hidden='true'></svg>")
                let use = $("<use xlink:href='#icon-custom-toplay-copy-copy'></use>")

                li.prepend(svg)
                svg.append(use)
                if(song.id === selectSongId){
                    li.addClass("active")
                }


                return li
            })

            //为什么要empty?

            liList.map((domLi)=>{
                $el.find("ul").append(domLi)
            })
        },



        clearActive(){
            $(this.el).find(".active").removeClass("active")
        },
    }

    let model = {
        data:{
            songs:[],
            selectSongId:null
        },
        find(){
            let query = new AV.Query('Song')
            //这里要加return是出现报错才加的
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    //为什么要return ??
                    //ES6 的语法不熟
                    return {id: song.id, ...song.attributes}
                })
                return songs
                /*
                为什么要写 return songs
                aaaa.then(bbbbb)
                那么aaaa必须有return
                bbbb是一个函数, 输入函数的参数是什么
                就必须return那个参数
                 */
            })
        }
    }

    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEventHub()
            this.getAllSongs()
            this.bindEvents()
        },



        bindEvents(){
            $(this.view.el).on("click", "li", (x)=>{
                // this.view.addLiItem(x)
                let songId = $(x.currentTarget).eq(0).attr("data-id")
                this.model.data.selectSongId = songId
                this.view.render(this.model.data)

                /* 
                算法
                现一个 array 有多个对象, 每个对象内有id, name, url, singer的key:value
                并且我现在知道一个id
                我想输出与id字符串相同的对象
                let array = [
                    {
                        "id": 111,
                        "name": "aaa",
                        "url": "www.aaa.com",
                        "singer":"AAA"
                    },
                    {
                        "id": 222,
                        "name": "bbb",
                        "url": "www.bbb.com",
                        "singer":"BBB"
                    },
                    {
                        "id": 333,
                        "name": "ccc",
                        "url": "www.ccc.com",
                        "singer":"CCC"
                    }
                ]
                let knowId = 222


                //方法一, 错误
                let matchObject = array.map((song)=>{
                    if(song.id === knowId){
                        return song
                        break
                    }
                })
                console.log(matchObject)

                //方法二
                let matchObject
                for(let i = 0; i < array.length; i++){
                    if(array[i]["id"] === knowId){
                        matchObject = array[i]
                    }
                }
                console.log(matchObject)
                */
                let dataObject
                let songs = this.model.data.songs
                for(let i = 0; i < songs.length; i++){
                    if(songs[i]["id"] === songId){
                        dataObject = songs[i]
                        break
                    }
                }

                let copy = JSON.stringify(dataObject)
                let copyObject = JSON.parse(copy)
                window.eventHub.emit("select", copyObject)
            })
        },



        //将所有发布订阅的代码重新封装
        bindEventHub(){
            window.eventHub.on("clickNew", ()=>{
                this.view.clearActive()
            })
            window.eventHub.on("create", (data)=>{
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
            })
            window.eventHub.on("change", (data)=>{
                let songs = this.model.data.songs
                for(let i = 0; i < songs.length; i++){
                    let song = songs[i]
                    if(song.id === data.id){
                        Object.assign(song,data)
                    }
                }
                this.view.render(this.model.data)
            })
        },
        getAllSongs(){
            //这里老师在 this.model.find 之前加了 return
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        }
    }

    controller.init(view, model)
}