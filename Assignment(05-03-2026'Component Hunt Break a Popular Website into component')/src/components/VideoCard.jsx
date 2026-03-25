import React from "react";

function VideoCard({ title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>This is a sample video card.</p>
    </div>
  );
}

export default VideoCard;