import styled from "styled-components";

const Answer = ({ text }: { text: string }) => {
  return <AnswerContainer>{text}</AnswerContainer>;
};

const AnswerContainer = styled.div`
  margin: 20px 20px;
  font-size: 18px;
  white-space: pre-wrap;
  @media screen and (max-width: 768px) {
    font-size: 15px;
    margin: 10px;
  }
`;
export default Answer;
