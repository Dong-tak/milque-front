import { PiWarningBold } from "react-icons/pi";

export default function Alarm() {
  return (
    <div className="inline-flex h-6 w-full items-center justify-between gap-2">
      <div className="jus flex items-center gap-2">
        <PiWarningBold className="flex size-4 text-que-yellow" />
        <div className="shrink grow basis-0 text-base font-normal leading-normal text-basic-800">
          예정된 업로드에 실패하였습니다.
        </div>
      </div>
      <div className="w-11 text-center text-xs font-normal leading-[18px] text-basic-600">
        3분 전
      </div>
    </div>
  );
}
