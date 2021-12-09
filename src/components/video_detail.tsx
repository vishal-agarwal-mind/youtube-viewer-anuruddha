import React from "react";
import VideoComments from "./video_comments";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={video.snippet.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>
      <div className="details">
        <div><strong>{video.snippet.title}</strong></div>
        <div>{video.snippet.description}</div>
      </div>
      {video && <VideoComments video={video} />}
    </div>
  );
};

export default VideoDetail;
