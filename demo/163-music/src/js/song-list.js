{
  let view = {
    el: '#songList-container',
    template: `
      <ul class="songList">
      </ul>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs} = data
      let liList = songs.map((song)=>{
        let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
        if(song.id===selectSongId){
          $li.addClass('active')
        }
      })
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    activeItem(li){
      let $li = $(li)
      $li.addClass('active')
        .siblings('.active').removeClass('active')
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {
    data: {
      songs: [ ],
      selectSongId:undefined,
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
      this.view.render(this.model.data)
      this.bindEvents()
      this.getAllSongs()
      this.bindEventHub()
    },
    getAllSongs(){
      return this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      $(this.view.el).on('click', 'li', (e)=>{
        let songId = e.currentTarget.getAttribute('data-song-id')
        this.model.data.selectSongId = songId
        this.view.render(this.model.data)
        let data
        let songs = this.model.data.songs
        for(let i = 0;i<songs.length;i++){
          if(songs[i].id===songId){
            data = songs[i]
            break
          }
        }
        let obj = JSON.parse(JSON.stringify(data))
        window.eventHub.emit('select',obj )
      })
    },
    bindEventHub(){
      window.eventHub.on('new', ()=>{
        this.view.clearActive()
      })
      window.eventHub.on('create', (songData)=>{
        // songs = ['ADDR 108']
        this.model.data.songs.push(songData)
        this.view.render(this.model.data)
      })
      window.eventHub.on('update',(data)=>{
        let songs = this.model.data.songs
        for(let i=0;i<songs.length;i++){
          if(songs[i].id===data.id){
            Object.assign(songs[i],data)
          }
        }
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(view, model)
}
