import InstagramFeedEmbed from "@/components/insta-feed";
import InstagramReelsEmbed from "@/components/insta-reels";
import TiktokEmbed from "@/components/tiktok-embed";
import YouTubeShortsEmbed from "@/components/youtube-shorts";
import YouTubeEmbed from "@/components/youtube-video";

export const tiktokContent = `<blockquote
  class="tiktok-embed"
  cite="https://www.tiktok.com/@tarankaaa/video/7399985738428730632"
  data-video-id="7399985738428730632"
  style="max-width: 605px; min-width: 325px;"
>
  <section>
    <a
      target="_blank"
      title="@tarankaaa"
      href="https://www.tiktok.com/@tarankaaa?refer=embed"
      >@tarankaaa</a
    >
  </section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>`;

export default function Team() {
  return (
    <div className="flex flex-col gap-4">
      <InstagramFeedEmbed url={"https://www.instagram.com/p/C-dNdiKMYfY/"} />
      <InstagramFeedEmbed
        url={
          "https://www.instagram.com/p/C-brZnAxUTV/?utm_source=ig_web_copy_link"
        }
      />
      <InstagramReelsEmbed
        url={
          "https://www.instagram.com/reel/C9mPBPSJwGt/?utm_source=ig_web_copy_link/"
        }
      />
      <InstagramFeedEmbed
        url={
          "https://www.instagram.com/p/C8333eatFmY/?utm_source=ig_web_copy_link"
        }
      />
      <TiktokEmbed content={tiktokContent} />
      <YouTubeEmbed url={"5JafqFjBnBU"} />
      <YouTubeShortsEmbed url={"q4IkcMIk70M"} />
    </div>
  );
}
