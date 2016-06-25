class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [], 
      currentVideo: {id: '', snippet: {
        title: '',
        description: ''}
      }, 
      searchYouTube: window.searchYouTube
    };

    this.onVideoClick = this.onVideoClick.bind(this);
    this.reRenderOnSearch = this.reRenderOnSearch.bind(this);
  }

  onVideoClick(current) {
    this.setState({
      currentVideo: current
    }); 
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
  }
  
  render() {
    return (
      <div>
        <Nav searchYouTube={this.reRenderOnSearch} />
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-7">
          <VideoDetails videoID={this.state.currentVideo.id}/>
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


