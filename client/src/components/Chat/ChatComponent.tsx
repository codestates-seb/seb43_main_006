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
  const [question, setQuestion] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  async function handleSubmit() {
    await getAnswer();
  }
  const sendAxios = async () => {
    const body = {
      question: input,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/chat-gpt/question`, body, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        setIsLoading(true);
        setQuestion(input);
        const splittedText = res.data.choices[0].text.split("\n");
        setAnswer(splittedText);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  async function getAnswer() {
    sendAxios();
    setIsLoading(false);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
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
              <div className="col">
                <div className="q-container">
                  <div className="question">{question}</div>
                </div>
                <div className="answer">
                  {answer?.map((el, idx) => (
                    <p key={idx}>{el}</p>
                  ))}
                </div>
              </div>
            ) : isLoading === null ? (
              <div>편하게 질문하세요!</div>
            ) : (
              <img className="loading" src={spinner} alt="로딩중" />
            )}
          </MiddleContainer>
          <BottonContainer>
            <input onKeyDown={handleKeyDown} onChange={handleInput} className="input" />
            <IoMdSend className="sendBtn" size="25" color="gray" onClick={handleSubmit}>
              전송
            </IoMdSend>
          </BottonContainer>
        </GptContainer>
      ) : (
        <BtnContainer>
          <ButtonDark width="60px" height="60px" fontSize="18px" borderRadius="50%" onClick={() => setIsOpen(true)}>
            Chat
          </ButtonDark>
        </BtnContainer>
      )}
    </>
  );
};
const BtnContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  @media ${({ theme }) => theme.breakpoints.mobileMax} {
    button {
      width: 50px;
      height: 50px;
      font-size: 12px;
    }
  }
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
  background-color: gray;
  border: 1px solid lightgray;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    right: 5vw;
    width: 90vw;
    height: 60vh;
  }
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

  height: 70%;
  color: ${({ theme }) => theme.colors.themeColor};
  font-size: 18px;
  background-color: #f0f0f0;
  .col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .q-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .question {
    position: relative;
    background: gray;
    border-radius: 0.4em;
    padding: 5px 10px;
    color: white;
  }

  .question:after {
    content: "";
    position: absolute;
    right: 5px;
    top: 50%;
    border: 20px solid transparent;
    border-left-color: gray;
    border-right: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
  .answer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 5px 15px;
    gap: 10px;
    margin: 5px;
    position: relative;
    background: white;
    border-radius: 0.4em;
  }
  .answer:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
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
    padding: 15px;
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
