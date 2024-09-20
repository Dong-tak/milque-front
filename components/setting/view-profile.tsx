import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  SettingButton,
  SettingSwitch,
  SettingProfile,
  SettingArrow,
} from "@/components/setting/setting-comp";
import { PasswordDialog } from "@/components/setting/profile-dialog/password-view";
import { ChevronRight } from "lucide-react";
import { DeleteAccountDialog } from "./profile-dialog/delete-account-view";
import { LogoutDialog } from "./profile-dialog/logout-view";
import ChangeAuthMethodDialog from "./profile-dialog/auth-change";
import { ViewProfile } from "@/components/setting/setting-comp"; // 일반 버튼 컴포넌트 추가

export function ProfileView() {
  // 화살표 버튼
  const arrow = (
    <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
      <ChevronRight className="relative h-4 w-4 text-black" />
    </Button>
  );

  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 프로필
          </DialogTitle>
        </DialogHeader>
        <SettingProfile
          id="별명"
          nickname="이승철 과장"
          className=""
          src="/images/rectangle-352.png"
        />
        <SettingButton
          title="별명"
          content="이승철 과장"
          trigger={
            <ChangeAuthMethodDialog
              button={<ViewProfile buttonTitle={"인증수단 변경"} />}
            />
          }
        />
        <SettingButton
          title="한줄 소개"
          content="어쩌구 저쩌구"
          trigger={
            <ChangeAuthMethodDialog
              button={<ViewProfile buttonTitle={"인증수단 변경"} />}
            />
          }
        />
      </div>

      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            계정 보안
          </DialogTitle>
        </DialogHeader>
        <SettingButton
          title="인증수단"
          content="tmdcjf326dtmdcjf@gmail.com"
          className="h-full w-full"
          trigger={
            <ChangeAuthMethodDialog
              button={
                <ViewProfile
                  buttonTitle={"인증수단 변경"}
                  className="text-black"
                />
              }
            />
          }
        />
        <SettingArrow
          title="비밀번호 변경"
          content="계정 로그인에 사용할 비밀번호를 재설정하세요"
          className="h-full w-full"
          trigger={
            <PasswordDialog
              dialogTitle="비밀번호 재설정"
              dialogDescription="계정 로그인에 사용할 새 비밀번호를 입력하세요."
              button={arrow}
            />
          }
        />
        <SettingSwitch
          title="계정공개 여부"
          content="친구가 아닌 유저들도 내 스크랩을 볼 수 있어요"
          className="h-full w-full"
        />
        <SettingSwitch
          title="프로필 검색 가능 여부"
          content="검색으로 계정이 노출되요"
          className="h-full w-full"
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            지원
          </DialogTitle>
        </DialogHeader>

        <SettingArrow
          title="로그아웃"
          content="tmdcjf326dtmdcjf@gmail.com"
          className=""
          trigger={
            <LogoutDialog
              dialogTitle="로그아웃 하시겠습니까?"
              dialogDescription="로그아웃하면 현재 계정에서 로그아웃되어 홈 화면으로 이동합니다."
              button={arrow}
            />
          }
        />
        <SettingArrow
          title="내 계정 삭제"
          content="tmdcjf326dtmdcjf@gmail.com"
          titleClassName="text-red-700"
          trigger={
            <DeleteAccountDialog
              dialogTitle="계정을 영구적으로 삭제하시겠습니까?"
              dialogDescription="이 작업은 실행 취소할 수 없습니다. 전체 계정이 영구적으로 삭제됩니다. 모든 개인 스크랩이 삭제되고 모든 계정에 있는 데이터와 계정이 제거됩니다"
              button={arrow}
            />
          }
        />
      </div>
    </div>
  );
}
