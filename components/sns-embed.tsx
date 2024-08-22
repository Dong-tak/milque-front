import InstagramFeedEmbed from "@/components/insta-feed";
import InstagramReelsEmbed from "@/components/insta-reels";
import TiktokEmbed from "@/components/tiktok-embed";
import YouTubeEmbed from "@/components/youtube-video";
import YouTubeShortsEmbed from "@/components/youtube-shorts";

interface SnsEmbedProps {
  form: string;
  contentUrl: string;
}

export default function SnsEmbed({ form, contentUrl }: SnsEmbedProps) {
  switch (form) {
    case "instagrampost":
      return <InstagramFeedEmbed url={contentUrl} />;
    case "instagramreels":
      return <InstagramReelsEmbed url={contentUrl} />;
    case "tiktokshorts":
      return <TiktokEmbed content={contentUrl} />;
    case "youtubevideo":
      return <YouTubeEmbed url={contentUrl} />;
    case "youtubeshorts":
      return <YouTubeShortsEmbed url={contentUrl} />;
    default:
      return <div>Unsupported content type</div>;
  }
}
