import { FiTrash2 } from "react-icons/fi";

export default function LinkedAccount() {
  return (
    <div className="inline-flex h-[72px] min-w-[392px] justify-between rounded-lg border-2 border-basic-400 px-6 py-3">
      <div className="flex items-center justify-start gap-6">
        <div className="flex h-12 w-12 items-end justify-end gap-2.5 rounded-3xl border-2 border-white bg-orange-400">
          <div className="flex h-4 w-4 rounded-lg border-2 border-white bg-orange-400" />
        </div>
        <div className="inline-flex w-[164px] flex-col items-start justify-start">
          <div className="self-stretch font-['Inter'] text-base font-normal leading-normal text-[#1a202c]">
            코딩으로 세계일주
          </div>
          <div className="self-stretch font-['Inter'] text-sm font-normal leading-[21px] text-[#717d96]">
            @codeworld22
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-4">
        <FiTrash2 className="flex h-6 w-6 items-center justify-center px-0.5 py-px text-basic-600" />
      </div>
    </div>
  );
}
