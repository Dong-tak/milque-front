import AlarmBar from "@/components/alarm-bar";
import ContentsPrev from "@/components/contents-prev";

export default function Home() {
  return (
    <div className="flex flex-col">
      <AlarmBar />
      <div className="flex px-[60px] py-12">
        <ContentsPrev />
      </div>
    </div>
  );
}
