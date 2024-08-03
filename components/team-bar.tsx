"use client";

import {
  ArrowTopRightOnSquareIcon,
  BellIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaArrowUpRightFromSquare, FaPlus } from "react-icons/fa6";

import { IoIosArrowDown } from "react-icons/io";
import AlarmModal from "./alarm-modal";

export default function TeamBar() {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const clickAlarm = () => setIsAlarmOpen(!isAlarmOpen);
  const closeModal = () => setIsAlarmOpen(false);
  return (
    <div className="inline-flex h-16 w-full items-center justify-between border-b-2 border-basic-800 bg-basic-100 px-6">
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
        <button className="sm-outline-btn gap-2">
          Button
          <FaPlus className="size-4" />
        </button>
        <button className="sm-outline-btn gap-2">
          Button
          <FaArrowUpRightFromSquare className="size-4" />
        </button>
        <button className="sm-solid-btn gap-2">
          Button
          <IoIosArrowDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
