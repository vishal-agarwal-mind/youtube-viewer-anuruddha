import React from "react";
import VideoListItem from "./video_list_item";
import InfiniteScroll from "react-infinite-scroll-component";
const VideoList = (props: any) => {
  const videoItems = props.videos.map((video: any) => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      <InfiniteScroll
        dataLength={props.videos.length} //This is important field to render the next data
        next={props.videoSearch}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {videoItems}
      </InfiniteScroll>
    </ul>
  );
};

export default VideoList;
