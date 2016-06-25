class Search extends React.Component {

  constructor(props) {
    super(props);
    this.debounceYouTube = _.debounce(this.props.searchYouTube, 500);
    this.state = {
      key: window.YOUTUBE_API_KEY,
      query: '', 
      max: 10
    };

  }

  setQuery(event) {
    this.setState({
      query: event.target.value
    });
    this.searchYouTube();

  }

  searchYouTube() {
    this.debounceYouTube(this.state);
  }
  
  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onChange={this.setQuery.bind(this)}/>
        <button className="btn hidden-sm-down" onClick={this.searchYouTube.bind(this)}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div> 
    );
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;

window.YOUTUBE_API_KEY = 'AIzaSyD5jlVmZhs2qF7JNMLPa-KeKAOzzYMccO4';