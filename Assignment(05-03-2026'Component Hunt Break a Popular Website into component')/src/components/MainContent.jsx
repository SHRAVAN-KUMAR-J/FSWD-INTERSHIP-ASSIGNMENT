import React from "react";
import VideoCard from "./VideoCard";

function MainContent() {
  return (
    <div>
      <h2>Main Content Section</h2>

      <VideoCard title="React Tutorial" />
      <VideoCard title="JavaScript Basics" />
      <VideoCard title="Machine Learning Intro" />
    </div>
  );
}

export default MainContent;