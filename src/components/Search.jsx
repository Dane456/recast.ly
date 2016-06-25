class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.options = {
      key: window.YOUTUBE_API_KEY,
      query: this.state.query,
      max: '10'
    };

  }

  setQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  searchYouTube() {
    this.props.searchYouTube(this.options);
  }
  
  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onChange={this.setQuery.bind(this)}/>
        <button className="btn hidden-sm-down" onClick={this.searchYouTube}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div> 
    );
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
