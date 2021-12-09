import React, { useEffect, useState } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./video_comments.css";
import { useDispatch, useSelector } from "react-redux";
import { commentsSet } from "../actions";
import config from "../config";

export default function VideoComments({ video }) {
  const videoId = video.id.videoId;
  const dispatch = useDispatch();
  const [VideoTotalComments, setVideoTotalComments] = useState<any[]>([]);

  const { comments, nextPageToken, hasMore } = useSelector((state: any) => {
    return state.commentReducer;
  });

  useEffect(() => {
    videoTotalComments();
    dispatch(commentsSet({ hasMore: false, nextPageToken: "", comments: [] }));
  }, [videoId]);

  useEffect(() => {
    if (comments.length == 0) {
      getData();
    }
  }, [comments]);

  const getData = () => {
    Axios({
      method: "GET",
      url: `${config.google.API_URI}/commentThreads`,
      params: {
        key: config.google.API_KEY,
        textFormat: "plainText",
        part: "snippet",
        videoId: videoId,
        maxResults: 10,
        pageToken: nextPageToken,
      },
    }).then((response) => {
      dispatch(
        commentsSet({
          hasMore: response.data.nextPageToken ? true : false,
          nextPageToken: response.data.nextPageToken
            ? response.data.nextPageToken
            : "",
          comments: comments.concat(...response.data.items),
        })
      );
    });
  };

  const videoTotalComments = () => {
    Axios({
      method: "GET",
      url: `${config.google.API_URI}/videos`,
      params: {
        key: config.google.API_KEY,
        part: "statistics",
        id: videoId,
      },
    }).then((response) => {
      setVideoTotalComments(response.data.items[0].statistics.commentCount);
    });
  };

  return (
    <section className="content-item" id="comments">
      <div className="row">
        <div className="col-sm-8">
          <h3>{VideoTotalComments} Comments</h3>
          <InfiniteScroll
            dataLength={comments.length} //This is important field to render the next data
            next={getData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {comments.map((person: any) => {
              const snippet = person?.snippet?.topLevelComment?.snippet;
              const {
                id,
                textDisplay,
                authorChannelUrl,
                authorDisplayName,
                authorProfileImageUrl,
              } = snippet;
              return (
                <div className="media" key={person.id}>
                  <a
                    className="pull-left"
                    href={authorChannelUrl}
                    title={authorDisplayName}
                  >
                    <img
                      src={authorProfileImageUrl}
                      alt={authorDisplayName}
                      className="media-object"
                    />
                  </a>
                  {/* <a className="pull-left" href="#"><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></a> */}
                  <div className="media-body">
                    <h4 className="media-heading">
                      {" "}
                      <a
                        href={authorChannelUrl}
                        title={authorDisplayName}
                        className="ChannelCard__link"
                      >
                        {" "}
                        {authorDisplayName}
                      </a>
                    </h4>
                    <p>{textDisplay}</p>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
