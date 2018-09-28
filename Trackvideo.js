
    
    
      function onClickVideo(id){
        console.log("videoClick"+id);
        var video = document.getElementById("video_"+id);
        var timeStarted = -1;
    var timePlayed = 0;
    var duration = 0;
    // If video metadata is laoded get duration
    if(video.readyState > 0)
      getDuration.call(video);
    //If metadata not loaded, use event to get it
    else
    {
      video.addEventListener('loadedmetadata', getDuration);
    }
    // remember time user started the video
    function videoStartedPlaying() {
      timeStarted = new Date().getTime()/1000;
    }
    function videoStoppedPlaying(event) {
      // Start time less then zero means stop event was fired vidout start event
      if(timeStarted>0) {
        var playedFor = new Date().getTime()/1000 - timeStarted;
        timeStarted = -1;
        // add the new ammount of seconds played
        timePlayed+=playedFor;
      }
      $("#played_"+id).html(Math.round(timePlayed)); 
    }
    
    function getDuration() {
      duration = video.duration;
      $("#duration_"+id).html(new Text(Math.round(duration)+""));
      console.log("Duration: ", duration);
    }
    function onTrackedVideoFrame(event, currentTime, duration){
      var videoId = event.currentTarget.id;
      videoId = videoId.split("_")[1];
    $(".current_"+videoId).text("Current Time: "+currentTime); //Change #current to currentTime
    $(".duration_"+videoId).text("Video Length: "+ duration)
    }
    $(".activeState").bind("timeupdate", function(event){


      
      onTrackedVideoFrame(event, this.currentTime, this.duration);
    });
    
    video.addEventListener("play", videoStartedPlaying);
    video.addEventListener("playing", videoStartedPlaying);
    
    video.addEventListener("ended", videoStoppedPlaying);
    video.addEventListener("pause", videoStoppedPlaying);
      }


    

    
    
    