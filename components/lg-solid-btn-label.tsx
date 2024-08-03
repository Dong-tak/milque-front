import { BsArrowReturnLeft } from "react-icons/bs";

export default function LgSolidBtnLabel() {
  return (
    <div className="inline-flex h-14 w-[210px] items-center rounded-md bg-basic-800 px-6 py-4">
      <div className="ml-4 inline-flex items-center gap-4">
        <div className="text-lg font-bold leading-normal text-white">
          돌아가기
        </div>
        <BsArrowReturnLeft className="h-6 w-6 p-[3px] text-white" />
      </div>
    </div>
  );
}
