"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        sources: [
          {
            src: src,
            type: "application/x-mpegURL",
          },
        ],
        aspectRatio: "16:9",
        response: true,

        enableSmoothSeeking: true,

        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          skipButtons: {
            forward: 5,
            backward: 10,
          },
        },
        spatialNavigation: {
          enabled: true,
          horizontalSeek: true,
        },
        userActions: {
          hotkeys: {
            muteKey: function (event: KeyboardEvent) {
              return event.key == "m";
            },
            playPauseKey: function (event: KeyboardEvent) {
              return event.key == " ";
            },
          },
        },
      });
    }
  });

  return (
    <div>
      <video controls ref={videoRef} className="video-js vjs-16-9 mx-auto"  playsInline />
    </div>
  );
}
