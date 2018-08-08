{
    let view = {
      el: 'section.playlists'
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.getSongsInfomation()
        },
        getSongsInfomation(){
            let query = new AV.Query('Song');
            query.find().then(function (songs) {
                songs.forEach(function(song) {
                    let songImageUrl = song.attributes.url

                });
                return AV.Object.saveAll(songs);
            })
        }
    }
    controller.init(view, model)

  }