"use client"; // 이 지시어를 사용하여 Client Component로 선언합니다.

import store from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function OurProviders({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
