var VideoDetails = (props) => {
  
  $.ajax({
    //data: {part: 'snippet', key: options.key, q: options.query, maxResults: options.max, videoEmbeddable: 'true', type: 'video'},
    url: `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${props.videoID}&key=AIzaSyD5jlVmZhs2qF7JNMLPa-KeKAOzzYMccO4`,
    type: 'GET',
    success: function(data) {
      render(data);
    },
    error: function(error) {
      console.log("Error: ", error.responseText);
    }
  });

  // render: function(data) {
  //   return (
  //     <h1> data.items.statistics.viewCount </h1>
  //   );
  // }


 


};