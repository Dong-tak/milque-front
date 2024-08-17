import {
  ChevronLeft,
  CloudDownload,
  Copy,
  Dot,
  Ellipsis,
  Eye,
  Share2,
  SquarePen,
} from "lucide-react";
import { DetailTopNav } from "./detail-top-nav";
import DetailBtmNav from "./detail-btm-nav";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DetailComment() {
  return (
    <div className="relative flex h-screen min-h-[310px] justify-between py-6 md:max-h-[729px] md:min-w-[310px] md:max-w-[500px]">
      <div className="flex bg-card">
        {/* top nav */}
        <div className="absolute top-0 flex w-full items-center justify-between border-b bg-background md:top-6 md:h-[48px] md:min-w-[310px] md:max-w-[500px] md:px-4">
          <div className="flex items-center">
            <div className="p-3 md:hidden">
              <ChevronLeft className="size-6" />
            </div>
            <span className="accordhead others-medium-title">
              프리랜서의 성공 비결:시간 관리와 wkrlrhk
            </span>
          </div>
          <div className="flex">
            <div className="flex md:gap-2">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hidden p-1 md:block"
              >
                <CloudDownload className="size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="rounded-none md:rounded-md md:p-1"
              >
                <Share2 className="size-6 md:size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hidden p-1 md:block"
              >
                <Ellipsis className="size-4" />
              </Button>
            </div>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-none md:hidden"
            >
              <Eye className="size-6" />
            </Button>
          </div>
        </div>
        {/* comment nav */}
        <div className="flex flex-grow flex-col gap-[2px] overflow-y-auto py-[48px]">
          <div className="flex flex-col gap-2 border-b-2 border-card bg-background p-4">
            <div className="flex justify-between">
              <div className="flex items-center text-muted-foreground others-medium-tag">
                <div>@velory</div>
                <Dot className="size-3" />
                <div>5분전</div>
              </div>
              <div className="flex gap-2 text-secondary-foreground">
                <Copy className="size-4 hover:text-muted-foreground" />
                <SquarePen className="size-4 hover:text-muted-foreground" />
                <Ellipsis className="size-4 hover:text-muted-foreground" />
              </div>
            </div>
            <div className="body-normal-body-long-01">
              첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적
              성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-card bg-background p-4">
            <div className="flex justify-between">
              <div className="flex items-center text-muted-foreground others-medium-tag">
                <div>@velory</div>
                <Dot className="size-3" />
                <div>5분전</div>
              </div>
              <div className="flex gap-2 text-secondary-foreground">
                <Copy className="size-4 hover:text-muted-foreground" />
                <SquarePen className="size-4 hover:text-muted-foreground" />
                <Ellipsis className="size-4 hover:text-muted-foreground" />
              </div>
            </div>
            <div className="body-normal-body-long-01">
              식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는
              지속적인 학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을
              높이고 삶의 질을 향상시킵니다. 마지막으로 다섯 번째 습관은 일상
              속에서의 작은 목표 달성을 통해 성취감을 느끼는 것입니다.
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-card bg-background p-4">
            <div className="flex justify-between">
              <div className="flex items-center text-muted-foreground others-medium-tag">
                <div>@velory</div>
                <Dot className="size-3" />
                <div>5분전</div>
              </div>
              <div className="flex gap-2 text-secondary-foreground">
                <Copy className="size-4 hover:text-muted-foreground" />
                <SquarePen className="size-4 hover:text-muted-foreground" />
                <Ellipsis className="size-4 hover:text-muted-foreground" />
              </div>
            </div>
            <div className="body-normal-body-long-01">
              첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적
              성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한
              자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데
              중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌
              식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는
              지속적인 학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을
              높이고 삶의 질을 향상시킵니다. 마지막으로 다섯 번째 습관은 일상
              속에서의 작은 목표 달성을 통해 성취감을 느끼는 것입니다.
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-card bg-background p-4">
            <div className="flex justify-between">
              <div className="flex items-center text-muted-foreground others-medium-tag">
                <div>@velory</div>
                <Dot className="size-3" />
                <div>5분전</div>
              </div>
              <div className="flex gap-2 text-secondary-foreground">
                <Copy className="size-4 hover:text-muted-foreground" />
                <SquarePen className="size-4 hover:text-muted-foreground" />
                <Ellipsis className="size-4 hover:text-muted-foreground" />
              </div>
            </div>
            <div className="body-normal-body-long-01">
              첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적
              성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한
              자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데
              중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌
              식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는
              지속적인 학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을
              높이고 삶의 질을 향상시킵니다. 마지막으로 다섯 번째 습관은 일상
              속에서의 작은 목표 달성을 통해 성취감을 느끼는 것입니다.
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-card bg-background p-4">
            <div className="flex justify-between">
              <div className="flex items-center text-muted-foreground others-medium-tag">
                <div>@velory</div>
                <Dot className="size-3" />
                <div>5분전</div>
              </div>
              <div className="flex gap-2 text-secondary-foreground">
                <Copy className="size-4 hover:text-muted-foreground" />
                <SquarePen className="size-4 hover:text-muted-foreground" />
                <Ellipsis className="size-4 hover:text-muted-foreground" />
              </div>
            </div>
            <div className="body-normal-body-long-01">
              첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적
              성장을 위한 기초를 마련합니다. 두 번째 습관은 긍정적 사고를 통한
              자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데
              중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌
              식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는
              지속적인 학습과 자기 계발입니다. 새로운 기술과 지식은 경쟁력을
              높이고 삶의 질을 향상시킵니다. 마지막으로 다섯 번째 습관은 일상
              속에서의 작은 목표 달성을 통해 성취감을 느끼는 것입니다.
            </div>
          </div>
        </div>
        {/* btm nav */}
        <div className="absolute bottom-0 flex h-[48px] w-full items-center justify-between bg-background md:bottom-6 md:min-w-[310px] md:max-w-[500px]">
          <div className="flex w-full gap-4 px-4">
            <Input
              placeholder="새로운 커멘트 남기기"
              className="w-full border-none"
            />
            <Button variant="ghost" className="text-primary">
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
