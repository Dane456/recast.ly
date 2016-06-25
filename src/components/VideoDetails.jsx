var VideoDetails = (props) => {

  console.log('details props: ', props);

  return (
    <div className="row">
      <div className="col-md-3 video-list">Likes: {props.stats.currentLikeCount}</div>
      <div className="col-md-3 video-list">Dislikes: {props.stats.currentDislikeCount}</div>
      <div className="col-md-4 video-list">View Count: {props.stats.currentViewCount} </div>
    </div>
  );


};