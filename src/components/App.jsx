class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [], 
      currentVideo: {id: '', snippet: {
        title: '',
        description: ''}
      }, 
      stats: {
        currentViewCount: 0,
        currentLikeCount: 0, 
        currentDislikeCount: 0,
      },
      searchYouTube: window.searchYouTube, 
      searchVideo: window.searchVideo
    };

    this.onVideoClick = this.onVideoClick.bind(this);
    this.reRenderOnSearch = this.reRenderOnSearch.bind(this);
  }

  onVideoClick(current) {
    this.setState({
      currentVideo: current
    });

    this.getStats();
  }

  componentDidMount() {

    this.state.searchYouTube({
      key: window.YOUTUBE_API_KEY,
      query: '', 
      max: 10
    }, 
      function(data) {
        
        this.setState({
          videos: data, 
          currentVideo: data[0]
        });

        this.getStats();

      }.bind(this));



    //Need to wait for first ajax call to finish
  }

  getStats() {

    this.state.searchVideo(this.state.currentVideo.id.videoId, function(data) {
      console.log('stats Data ', data);
      this.setState({
        stats: {
          currentViewCount: data.items[0].statistics.viewCount,
          currentLikeCount: data.items[0].statistics.likeCount, 
          currentDislikeCount: data.items[0].statistics.dislikeCount 
        }
      });
    }.bind(this));
  }

  reRenderOnSearch(options) {

    this.state.searchYouTube(options, 
      function(data) {
        this.setState({
          videos: data,
          currentVideo: data[0]
        });

      }.bind(this));

    this.getStats().bind(this);
  }
  
  render() {
    return (
      <div>
        <Nav searchYouTube={this.reRenderOnSearch} />
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-7">
          <VideoDetails stats={this.state.stats}/>
        </div>
        <div className="col-md-5">
          <VideoList setCurrentVideo={this.onVideoClick} videos={this.state.videos}/>
        </div>
      </div>  
    );
  }


}
  
//TEST
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

window.searchYouTube = (options, callback) => {
  // TODO
  // $.get('https://www.googleapis.com/youtube/v3/search', function(data) {
  //   console.log(data);
  //   callback(data);
  // });

  $.ajax({
    data: {part: 'snippet', key: options.key, q: options.query, maxResults: options.max, videoEmbeddable: 'true', type: 'video'},
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    success: function(data) {
      console.log(data);
      callback(data.items);
    },
    error: function(error) {
      console.log("Error: ", error.responseText);
    }
  });
};

window.searchVideo = function(videoId, callback) {
  console.log('videoId: ', videoId);
  $.ajax({
    //data: {part: 'snippet', key: options.key, q: options.query, maxResults: options.max, videoEmbeddable: 'true', type: 'video'},
    url: `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyD5jlVmZhs2qF7JNMLPa-KeKAOzzYMccO4`,
    type: 'GET',
    success: function(data) {
      console.log('returnfromSearchVideo: ',data);
      callback(data);
    },
    error: function(error) {
      console.log("Error: ", error.responseText);
    }
  });

};

