{
    let view = {
        el:".tab-content .page-2",
        template:`
          <li class="everySong2">
            <div class="number">
                {{song.number}}            
            </div>
            <div class="title2">
                <div class="withOutPlay">
                    {{song.name}}
                    <p>
                      <img src="http://upload-images.jianshu.io/upload_images/5529438-a5c78098096d42d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
                      <span class="singer">{{song.singer}}</span>
                    </p>
                </div>
                <a class="playButton2" href="./song.html?id={{song.id}}">
                    <svg class="play2" aria-hidden="true">
                        <use xlink:href="#icon-custom-toplay-copy-copy"></use>
                    </svg>   
                </a>
            </div>
          </li>
      `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
            let {songs} = data
            let number = 0
            songs.map((song)=>{
                number = number + 1
                beatifulNum = "0"
                if(number < 10){
                    beatifulNum = beatifulNum + number
                }
                let $li = $(this.template
                    .replace('{{song.name}}', song.name)
                    .replace('{{song.singer}}', song.singer)
                    .replace('{{song.number}}', beatifulNum)
                    .replace('{{song.id}}', song.id)
                )
                this.$el.find('div.songsLi').append($li)
            })
        },
        show(){
            $(this.el).addClass("active")
        },
        hide(){
            $(this.el).removeClass("active")
        }
    }
    let model = {
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return {id: song.id, ...song.attributes}
                })
                return songs
            })
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.init()
            window.eventHub.on("tab", (selectTab)=>{
                if(selectTab === "page-2"){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
    }
    controller.init(view, model)
}


