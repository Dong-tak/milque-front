import styled from "@emotion/styled";
import colors from "../lib/tailwindColors";

export const ContentsContainer = styled.div`
  display: flex;
  width: 360px;
  height: 355px;
  padding-bottom: 4px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${colors["basic-800"]};
`;

export const ContentsImg = styled.img`
  flex: 1 0 0;
  align-self: stretch;
  overflow: hidden;
  object-fit: fill;
  background: black;
`;

export const ContentsComment = styled.div`
  display: -webkit-box;
  padding: 2px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  -webkit-line-clamp: 1; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${colors["basic-800"]};
  font-feature-settings: "calt" off;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.24px;
  line-height: 48px;
  height: 48px;
`;

export const ContentsModalContainer = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${colors["basic-800"]};
  overflow: hidden;
`;

export const ContentsModalImg = styled.img`
  display: flex;
  width: 715px;
  height: 715px;
  justify-content: center;
  align-items: center;
  background: ${colors["basic-100"]};
`;

export const ContentsModalBox = styled.div`
  display: flex;
  width: 500px;
  height: 715px;
  flex-direction: column;
  align-items: flex-start;
  background: ${colors["basic-100"]};
`;

export const ContentsModalInfo = styled.div`
  display: flex;
  width: 500px;
  padding: 24px;
  align-items: flex-start;
  gap: 18px;
  border-top: 2px solid ${colors["basic-800"]};
  background: ${colors["basic-100"]};
`;

export const ContentsModalTop = styled.div`
  display: flex;
  width: 500px;
  padding: 12px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 2px solid ${colors["basic-800"]};
  background: ${colors["basic-100"]};
`;
export const ContentsModalComments = styled.div`
  display: flex;
  width: 500px;
  padding: 24px;
  align-items: flex-start;
  flex: 1 0 0;
  color: ${colors["basic-800"]};
  font-feature-settings: "calt" off;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  letter-spacing: -0.45px;
  background: ${colors["basic-100"]};
`;
export const ContentsModalBottom = styled.div`
  display: flex;
  width: 500px;
  padding: 0px 24px 18px 24px;
  align-items: center;
  gap: 12px;
  background: ${colors["basic-100"]};
  color: ${colors["basic-600"]};
  font-feature-settings: "calt" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.3px;
`;
