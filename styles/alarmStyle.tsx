import styled from "@emotion/styled";

export const AlarmModalContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 6px;
  border: 2px solid var(--WF-Base-800, #2d3648);
  background: white;
`;

export const AlarmTriangle = styled.div`
  width: 22px;
  height: 22px;
  transform: rotate(45deg);
  background: white;
  border-left: 2px solid var(--WF-Base-800, #2d3648);
  border-top: 2px solid var(--WF-Base-800, #2d3648);
  position: absolute;
  left: 340px;
  top: 44.44px;
  z-index: 11;
`;
