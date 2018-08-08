{
    let view = {
      el: 'section.songs',
      template:`
          <li class="everySong">
            <div class="title">
            {{song.name}}
               
            </div>
            <p>
              <img src="http://upload-images.jianshu.io/upload_images/5529438-a5c78098096d42d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
              {{song.singer}}
            </p>
            <a class="playButton" href="./song.html?id={{song.id}}">
            <svg class="play2" aria-hidden="true">
                <use xlink:href="#icon-custom-toplay-copy-copy"></use>
            </svg>
            </a>
          </li>
      `,
      init(){
        this.$el = $(this.el)
      },
      render(data){
        let {songs} = data
        songs.map((song)=>{
          let $li = $(this.template
            .replace('{{song.name}}', song.name)
            .replace('{{song.singer}}', song.singer)
            .replace('{{song.id}}', song.id)
          )
          this.$el.find('ol.list').append($li)
        })
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
        this.view.init()
        this.model = model
        this.model.find().then(()=>{
          this.view.render(this.model.data)
        })
  
      }
    }
    controller.init(view, model)
  }