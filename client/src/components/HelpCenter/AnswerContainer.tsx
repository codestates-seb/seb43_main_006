import styled from "styled-components";

const Answer = ({ text }: { text: string }) => {
  return <AnswerContainer>{text}</AnswerContainer>;
};

const AnswerContainer = styled.div`
  margin: 20px 20px;
  font-size: 18px;
  white-space: pre-wrap;
`;
export default Answer;
