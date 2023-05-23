import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import axios from "axios";
//assets & icons
import spinner from "@assets/gif/spinner.gif";
import { IoMdSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
//components
import { ButtonDark } from "@components/Common/Button";

const ChatComponent = () => {
  const [input, setInput] = useState("null");
  const [answer, setAnswer] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  async function handleSubmit() {
    await getAnswer(input);
  }

  async function getAnswer(input: string) {
    const body = {
      question: input,
    };
    setIsLoading(false);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/chat-gpt/question`, body, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        const splittedText = res.data.choices[0].text.split("\n");
        setAnswer(splittedText);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(true);
  }

  return (
    <>
      {isOpen ? (
        <GptContainer>
          <TopContainer>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="cancel"
            >
              <MdOutlineCancel color="white" size={20} />
            </button>
            <div className="title">무엇이든 물어보세요!</div>
          </TopContainer>
          <MiddleContainer>
            {isLoading ? (
              <div className="answer">
                {answer?.map((el, idx) => (
                  <p key={idx}>{el}</p>
                ))}
              </div>
            ) : isLoading === null ? (
              <div>편하게 질문하세요!</div>
            ) : (
              <img className="loading" src={spinner} alt="로딩중" />
            )}
          </MiddleContainer>
          <BottonContainer>
            <input onChange={handleInput} className="input" />
            <IoMdSend className="sendBtn" size="30" color="#222" onClick={handleSubmit}>
              전송
            </IoMdSend>
          </BottonContainer>
        </GptContainer>
      ) : (
        <BtnContainer>
          <ButtonDark width="70px" height="70px" fontSize="18px" borderRadious="50%" onClick={() => setIsOpen(true)}>
            Chat
          </ButtonDark>
        </BtnContainer>
      )}
    </>
  );
};
const BtnContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 85vh;
`;

const GptContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 30vh;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  color: white;
  background-color: ${({ theme }) => theme.colors.themeColor};
  border: 1px solid lightgray;
  border-radius: 2px;
`;
const TopContainer = styled.div`
  position: relative;
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .title {
    font-size: 22px;
    font-weight: 500;
  }
  .cancel {
    position: absolute;
    right: 0;
    top: 10px;
    border: none;
    cursor: pointer;
    background-color: inherit;
  }
`;
const MiddleContainer = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
  height: 70%;
  color: ${({ theme }) => theme.colors.themeColor};
  font-size: 18px;
  background-color: #f0f0f0;
  .answer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
  }
  .loading {
    position: absolute;
    top: 30%;
    right: 36%;
    width: 100px;
  }
  overflow-y: scroll;
`;
const BottonContainer = styled.div`
  position: relative;
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  gap: 8%;
  align-items: center;
  .input {
    padding: 10px;
    padding-right: 50px;
    font-size: 16px;
    width: 100%;
    height: 90%;
    border-radius: 2px;
  }
  .sendBtn {
    position: absolute;
    right: 8%;
    cursor: pointer;
  }
`;

export default ChatComponent;
