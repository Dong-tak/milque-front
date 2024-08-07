import { SocialAccount } from "@/styles/socialAccount";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import SvgIcon from "./svgIcon";
import { resetSvg, reWriteSvg, trashSvg } from "@/public/svgBag";
import colors from "@/lib/tailwindColors";

export default function LinkedAccount() {
  return (
    <SocialAccount>
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative flex h-12 w-12 gap-2.5 rounded-3xl border-2 border-white">
            <Image
              src={"/netflex.jpg"}
              alt="profile"
              width={60}
              height={60}
              className="rounded-3xl"
            ></Image>
            <Image
              src={"/insta.jpg"}
              alt="logo"
              width={20}
              height={20}
              className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-orange-400"
            />
          </div>
          <div className="inline-flex flex-col items-start justify-start">
            <div className="self-stretch text-base font-normal leading-normal text-[#1a202c]">
              코딩으로 세계일주
            </div>
            <div className="self-stretch text-sm font-normal leading-[21px] text-[#717d96]">
              @codeworld22
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-start">
            <SvgIcon
              width={24}
              height={24}
              children={reWriteSvg}
              fill={colors["basic-600"]}
            />
          </div>
          <div className="flex items-center justify-start">
            <SvgIcon
              width={24}
              height={24}
              children={resetSvg}
              fill={colors["basic-600"]}
            />
          </div>
          <div className="flex items-center justify-start">
            <SvgIcon
              width={24}
              height={24}
              children={trashSvg}
              fill={colors["basic-600"]}
            />
          </div>
        </div>
      </div>
    </SocialAccount>
  );
}
