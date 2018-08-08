
{
    let view = {
        el:"#app",
        render(data){
            $(this.el).find(".pagebefore").css("background", `transparent url(${data.song.image}) no-repeat center`)
            $(this.el).find("img.cover").attr("src", data.song.image)
            $(this.el).find("audio").attr("src", data.song.url) 
            $(this.el).find("h1")[0].innerText = data.song.name



        },
        playOrPause(data){
            console.log(data)
            if(data.status === "playing"){
                $(this.el).find("audio")[0].play()
                //切换播放暂停
                $(this.el).find(".play1-copy").addClass("change")
                $(this.el).find(".pause1-copy").addClass("change")
                //转盘转动
                $(this.el).find(".disc-container").addClass("playing")
            } else {
                $(this.el).find("audio")[0].pause()
                //切换播放暂停
                $(this.el).find(".play1-copy").removeClass("change")
                $(this.el).find(".pause1-copy").removeClass("change")
                //转盘转动
                $(this.el).find(".disc-container").removeClass("playing")
            }
        },
        showlyrics(data){
            let putLyric = $(this.el).find(".lines")
            let lyrics = data.song.lyrics
            let temp = lyrics.split("\n")
            let tempWithouSpace = []
            for(let i = 0 ; i < temp.length;i++){
                if(temp[i].length === 10){
                    //空格, 不做任何事情    
                }else{
                    tempWithouSpace.push(temp[i])
                }
            }

            let pure = []
            tempWithouSpace.map((string)=>{
                let reg = /\[([\d:.]+)\](.+)/
                let lyric = string.match(reg)
                let p = document.createElement("p")
                p.innerText = lyric[2]
                putLyric.append(p)
                let secondAndminue = lyric[1].split(":")
                let second = secondAndminue[1]
                let minue = secondAndminue[0]
                let pureSecond = +minue * 60 + parseFloat(second)
                p.setAttribute("data-time", pureSecond)
            })
        },
        showSomeLyrics(timeArr, time){
            for(let i=0;i<timeArr.length;i++){
                if(timeArr[i]<time && timeArr[i+1]>time){
                    this.showWhichP(i)
2
                }
            }
        },
        showWhichP(i){
            let $allP = $(this.el).find("div.lines > p")
            let pHeight = $allP[i].getBoundingClientRect().top
            let linesHeight = $(this.el).find(".lyric>.lines")[0].getBoundingClientRect().top
            let height = pHeight - linesHeight
            $allP.eq(i).addClass("active").siblings(".active").removeClass("active")
            $(this.el).find(".lines").css({
                transform:`translateY(${-(height - 25)}px)`
            })
        }

    }
    let model = {
        data:{
            song:{
                name:"",
                id:"",
                url:"",
                singer:"",
                image:""
            },
            status:"paused",
            songTime:[]
        },
        setId(id){
            this.data.id = id
        },
        getSonInformation(id){
            var query = new AV.Query('Song');
            //写这个return是为了后面可以继续then
            return query.get(this.data.id).then((songs)=>{
                let {attributes} = songs
                let {name, singer, url, image, lyrics} = attributes
                this.data.song.name = name
                this.data.song.url = url
                this.data.song.singer = singer
                this.data.song.image = image
                this.data.song.lyrics = lyrics
            });

        }
    }
    let controller = {

        init(view, model){
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.setId(id)
            this.model.getSonInformation(id).then(()=>{
                this.view.render(this.model.data)
                this.view.showlyrics(this.model.data)
                this.getLyricsTime()

            })
            this.bindEvents()

        },
        bindEvents(){
            $(this.view.el).on("click", ".play1-copy", ()=>{
                this.model.data.status = "playing"
                this.view.playOrPause(this.model.data)
            })


            $(this.view.el).on("click", ".pause1-copy", ()=>{
                this.model.data.status = "paused"
                this.view.playOrPause(this.model.data)
            })

            let $audio = $(this.view.el).find("audio")
            $audio.find("audio").on("ended", ()=>{
                this.model.data.status = "paused"
                this.view.render(this.model.data)
            })

            $audio.on("timeupdate", (x)=>{
                this.view.showSomeLyrics(this.model.data.songTime, $audio[0].currentTime)
            })
        },
        getSongId(){
            let search = window.location.search
            if(search.indexOf("?") === 0){
                search = search.substring(1)
            }

            let array = search.split("&").filter((v => v))
            let id = ""

            for(let i = 0; i < array.length;i++){
                let kv = array[i].split("=")
                let key = kv[0]
                let value = kv[1]
                if(key === "id"){
                    id = value
                    break
                }
            }
            return id
        },
        getLyricsTime(){
            let allP = $(this.view.el).find("div.lines > p")
            let songTime = []
            for(let i = 0;i < allP.length;i++){
                let time = allP[i].getAttribute("data-time")
                songTime.push(time)
            }
            this.model.data.songTime = songTime
        }
    }
    controller.init(view, model)

}