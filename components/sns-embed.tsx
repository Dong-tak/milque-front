import InstagramFeedEmbed from "@/components/insta-feed";
import InstagramReelsEmbed from "@/components/insta-reels";
import TiktokEmbed from "@/components/tiktok-embed";
import YouTubeEmbed from "@/components/youtube-video";
import YouTubeShortsEmbed from "@/components/youtube-shorts";
import ResponsiveIframe from "./iframe-embed";
import PdfViewer from "./pdf-embed";

interface SnsEmbedProps {
  form: string;
  contentUrl: string;
}

export default function SnsEmbed({ form, contentUrl }: SnsEmbedProps) {
  switch (form) {
    case "instagrampost":
      return <InstagramFeedEmbed url={contentUrl} />;
    case "instagramshorts":
      return <InstagramReelsEmbed url={contentUrl} />;
    case "tiktokvideo":
      return <TiktokEmbed content={contentUrl} />;
    case "youtubevideo":
      return <YouTubeEmbed url={contentUrl} />;
    case "youtubeshorts":
      return <YouTubeShortsEmbed url={contentUrl} />;
    case "img":
      return <img src={contentUrl} alt="SNS content" />;
    case "pdf":
      return <PdfViewer contentUrl={contentUrl} />;
    default:
      return <ResponsiveIframe src={contentUrl} />;
  }
}
