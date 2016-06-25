window.searchYouTube = (options, callback) => {
  // TODO
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

