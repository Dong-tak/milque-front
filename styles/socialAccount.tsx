import styled from "@emotion/styled";
import colors from "./tailwindColors";

export const SocialAccount = styled.div`
  display: flex;
  padding: 12px 24px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: 2px solid ${colors["basic-400"]};
`;
