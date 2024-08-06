"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import AlarmModal from "./alarm-modal";
import { downWrapArrow, plusWF800, shareArrow } from "@/public/svgBag";
import colors from "@/styles/tailwindColors";
import { BarBtnOutline, BarBtnSolid } from "@/styles/buttonStyle";
import SvgIcon from "./svgIcon";

export default function AlarmBar() {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const clickAlarm = () => setIsAlarmOpen(!isAlarmOpen);
  const closeModal = () => setIsAlarmOpen(false);
  return (
    <div className="z-0 inline-flex h-16 w-full items-center justify-between border-b-2 border-basic-800 bg-basic-100 px-6">
      <div
        onClick={clickAlarm}
        className="relative flex gap-2 hover:cursor-pointer"
      >
        <div className="relative size-6 items-center">
          <BellIcon className="size-6" />
          <div className="absolute left-[14px] top-0 size-2 rounded-full border-2 border-basic-100 bg-que-red" />
        </div>
        <div className="flex flex-shrink-0 gap-1">
          <span className="text-lg font-semibold text-basic-800">현재</span>
          <div>
            <span className="text-lg font-semibold text-que-red">12개</span>
            <span className="text-lg font-semibold text-basic-800">
              의 알림이 있습니다.
            </span>
          </div>
        </div>
        {isAlarmOpen && <AlarmModal onClose={closeModal} />}
      </div>
      <div className="z-10 inline-flex gap-4">
        <BarBtnOutline>
          직접추가
          <SvgIcon
            children={downWrapArrow}
            width={16}
            height={16}
            fill={colors["basic-800"]}
          />
        </BarBtnOutline>
        <BarBtnOutline>
          공유하기
          <SvgIcon
            width={16}
            height={16}
            children={shareArrow}
            fill={colors["basic-800"]}
          />
        </BarBtnOutline>
        <BarBtnSolid>
          레이아웃
          <SvgIcon
            width={16}
            height={16}
            children={downWrapArrow}
            fill={colors["basic-100"]}
          />
        </BarBtnSolid>
      </div>
    </div>
  );
}
