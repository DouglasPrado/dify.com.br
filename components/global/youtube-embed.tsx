import { YouTubeEmbed as ReactYouTubeEmbed } from "@next/third-parties/google";
import { useEffect, useState } from "react";
const YouTubeEmbed = ({ id }: { id: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="youtube-placeholder">Loading...</div>;
  }

  return <ReactYouTubeEmbed videoid={id} />;
};

export default YouTubeEmbed;
