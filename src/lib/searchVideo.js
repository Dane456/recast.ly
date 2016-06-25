window.searchVideo = function(videoId, callback) {
  $.ajax({
    //data: {part: 'snippet', key: options.key, q: options.query, maxResults: options.max, videoEmbeddable: 'true', type: 'video'},
    url: `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyD5jlVmZhs2qF7JNMLPa-KeKAOzzYMccO4`,
    type: 'GET',
    success: function(data) {
      callback(data);
    },
    error: function(error) {
      console.log("Error: ", error.responseText);
    }
  });

};