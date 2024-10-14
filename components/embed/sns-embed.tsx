import InstagramFeedEmbed from "@/components/embed/insta-feed";
import InstagramReelsEmbed from "@/components/embed/insta-reels";
import TiktokEmbed from "@/components/embed/tiktok-embed";
import YouTubeEmbed from "@/components/embed/youtube-video";
import YouTubeShortsEmbed from "@/components/embed/youtube-shorts";
import ResponsiveIframe from "./iframe-embed";
import PdfViewer from "./pdf-embed";
import Index from "./pdf-embed";
import Image from "next/image";

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
      return (
        <Image src={contentUrl} alt="SNS content" width={100} height={100} />
      );
    case "pdf":
      return <Index />;
    default:
      return <ResponsiveIframe src={contentUrl} />;
  }
}
