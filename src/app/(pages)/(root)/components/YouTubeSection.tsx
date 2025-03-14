import YouTubeSectionContainer from "@/components/YouTubeSectionContainer";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import YOUTUBE from "@/data/youtube.json";

const YouTubeSection = () => {
  const { title, description } = YOUTUBE;

  return (
    <YouTubeSectionContainer title={title} description={description}>
      <YouTubeVideoCard type="latest" />
      <YouTubeVideoCard type="popular" />
    </YouTubeSectionContainer>
  );
};

export default YouTubeSection;
