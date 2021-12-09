import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import config from "./config";
import { useSelector } from "react-redux";

function App() {
  const [videos, setVideos] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [maxResults, setmaxResults] = useState<string>("");
  const term = useSelector((state: any) => {
    return state.videoReducer;
  });
  useEffect(() => {
    videoSearch("football");
    // setmaxResults(5);
  }, []);

  /**
   * Function that gets the search-term and returns a list of videos
   * @param {*} term
   */
  const videoSearch = (term: any, flag = 0) => {
    Axios({
      method: "GET",
      url: `${config.google.API_URI}/search`,
      params: {
        key: config.google.API_KEY,
        part: "snippet",
        q: term,
        type: "video",
        maxResults: 10,
      },
    }).then((response) => {
      let videos = response.data.items;
      if (flag == 0) {
        setSelectedVideo(videos[0]);
      }

      setVideos(videos);
      setHasMore(response.data.nextPageToken ? true : false);
      setNextPageToken(
        response.data.nextPageToken ? response.data.nextPageToken : ""
      );
    });
  };
  const videoSearchNew = (term: any) => {
    Axios({
      method: "GET",
      url: `${config.google.API_URI}/search`,
      params: {
        key: config.google.API_KEY,
        part: "snippet",
        q: term,
        type: "video",
        maxResults: 10,
        pageToken: nextPageToken,
      },
    }).then((response) => {
      setHasMore(response.data.nextPageToken ? true : false);
      setNextPageToken(
        response.data.nextPageToken ? response.data.nextPageToken : ""
      );
      setVideos(videos.concat(...response.data.items));
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <SearchBar onSearchTermChange={videoSearch} />
      </div>
      <div className="row">
        <VideoDetail video={selectedVideo} />
        <VideoList
          videoSearch={videoSearchNew}
          onVideoSelect={(selectedVideo: any) => {
            setSelectedVideo(selectedVideo);
            window.scrollTo(0, 0);
            videoSearch(term, 1);
          }}
          videos={videos}
        />
      </div>
    </div>
  );
}

export default App;
