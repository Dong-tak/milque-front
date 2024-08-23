"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { OurTooltip } from "@/components/our-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { OurCheckbox, OurColorCheckbox } from "@/components/our-checkbox";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/constant";
import { useFormState } from "react-dom";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { completeUserProfile } from "./action"; // action.ts 파일에서 가져오기

interface FormState {
  fieldErrors: {
    username: string[];
    email: string[];
    password: string[];
    confirm_password: string[];
  };
  // 다른 상태 속성들...
}

const initialState: FormState = {
  fieldErrors: {
    username: [],
    email: [],
    password: [],
    confirm_password: [],
  },
  // 다른 초기 상태 값들...
};

type Action = {
  type: "SET_FIELD_ERRORS";
  payload: { field: string; errors: string[] };
};
// 다른 액션 타입들...

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_FIELD_ERRORS":
      return {
        ...state,
        fieldErrors: {
          ...state.fieldErrors,
          [action.payload.field]: action.payload.errors,
        },
      };
    // 다른 액션 처리...
    default:
      return state;
  }
};

export default function Verify() {
  const [state, dispatch] = useFormState(formReducer, initialState);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleCompleteProfile = async () => {
    if (password !== confirmPassword) {
      dispatch({
        type: "SET_FIELD_ERRORS",
        payload: {
          field: "confirm_password",
          errors: ["Passwords do not match"],
        },
      });
      return;
    }

    const result = await completeUserProfile(
      nickname,
      "Facebook", // 소셜 계정 정보는 하드코딩된 예제입니다.
      "123456789", // 소셜 클라이언트 ID는 하드코딩된 예제입니다.
      password,
    );

    if (result.success) {
      router.push("/"); // home으로 페이지 이동
    } else {
      console.error(result.error);
      // 추가적인 실패 처리 로직
    }
  };

  return (
    <Card className="max-h-[540px] max-w-[400px] grow items-center justify-center space-y-[16px] border-none bg-background shadow-none sm:w-auto sm:min-w-[343px]">
      <CardHeader className="p-0">
        <CardTitle>정보 입력하기</CardTitle>
        <CardDescription>바로 계정을 연결하세요!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="space-y-[6px]">
          <Label htmlFor="username">아이디</Label>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            minLength={3}
            maxLength={10}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            // errors={state?.fieldErrors.username}
          />
        </div>
        <div className="space-y-[6px]">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            name="password"
            type="password"
            placeholder="password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // errors={state?.fieldErrors.password}
          />
        </div>
        <div className="space-y-[6px]">
          <Label htmlFor="confirm_password">비밀번호 확인</Label>
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // errors={state?.fieldErrors.confirm_password}
          />
        </div>
        <div className="space-y-2">
          <OurColorCheckbox>모두 동의하기.</OurColorCheckbox>
          <OurCheckbox>서비스 이용 약관에 동의합니다.</OurCheckbox>
          <OurCheckbox>(선택) 마케팅 수신에 동의합니다.</OurCheckbox>
        </div>
        <Button size={"long"} onClick={handleCompleteProfile}>
          MileQue 시작하기
        </Button>
      </CardContent>
    </Card>
  );
}
