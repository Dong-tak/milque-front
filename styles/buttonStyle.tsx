import SvgIcon from "@/components/svgIcon";
import styled from "@emotion/styled";
import colors from "./tailwindColors";

export const BarBtnSolidContainer = styled.div`
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: ${colors["basic-800"]};
  color: ${colors["basic-100"]};
  font-feature-settings: "calt" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.21px;
  cursor: pointer;
  &:hover {
    background-color: ${colors["basic-700"]};
  }
`;

export const BarBtnOutlineContainer = styled.div`
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: ${colors["basic-100"]};
  border: 2px solid ${colors["basic-800"]};
  color: ${colors["basic-800"]};
  font-feature-settings: "calt" off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.21px;
  cursor: pointer;
  &:hover {
    color: ${colors["basic-600"]};
    border-color: ${colors["basic-600"]};
    svg {
    fill: ${colors["basic-600"]};
`;

export const AccountBtnOutlineContainer = styled.div`
  display: flex;
  min-width: 210px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: ${colors["basic-100"]};
  border: 2px solid ${colors["basic-800"]};
  color: ${colors["basic-800"]};
  font-feature-settings: "calt" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.45px;
  cursor: pointer;
  &:hover {
    color: ${colors["basic-600"]};
    border-color: ${colors["basic-600"]};
    svg {
    fill: ${colors["basic-600"]};
`;

export const AccountBtnSolidContainer = styled.div`
  display: flex;
  min-width: 210px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: ${colors["basic-800"]};
  color: ${colors["basic-100"]};
  font-feature-settings: "calt" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.45px;
  cursor: pointer;
  &:hover {
    background-color: ${colors["basic-700"]};
`;

interface BtnProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export const BarBtnSolid = ({ children, width, height }: BtnProps) => {
  return <BarBtnSolidContainer>{children}</BarBtnSolidContainer>;
};

export const BarBtnOutline = ({ children, width, height }: BtnProps) => {
  return <BarBtnOutlineContainer>{children}</BarBtnOutlineContainer>;
};

export const AccountBtnOutline = ({ children, width, height }: BtnProps) => {
  return <AccountBtnOutlineContainer>{children}</AccountBtnOutlineContainer>;
};

export const AccountBtnSolid = ({ children, width, height }: BtnProps) => {
  return <AccountBtnSolidContainer>{children}</AccountBtnSolidContainer>;
};
