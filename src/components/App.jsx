class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: window.exampleVideoData, 
      currentVideo: window.exampleVideoData[0]
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
  
  }

  reRenderOnSearch(options) {

    this.props.searchYouTube(options, 
      function(data) {
        //console.log('App Data: ' + data);
        this.setState({
          //videos: data;
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
