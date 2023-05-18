// 화면 사이즈
const size = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1025px",
};

// 화면 변경 지점
const breakpoints = {
  mobileMax: `screen and (max-width: ${size.mobile})`,
  tabletMax: `screen and (max-width: ${size.tablet})`,
  desktopMin: `screen and (max-width: ${size.desktop})`,
};

// 콘텐츠 넓이 관련
const widthSize = {
  contentMax: "1250px",
};

// 색
const colors = {
  fontColor: "#181818",
  themeColor: "#222222",
  border: "#DEDEDE",
  bg: "#F7F7F7",
};

// 폰트 크기
const fontSizes = {
  title: "18px",
  subtitle: "15px",
  money: "16px",
  defalt: "14px",
};

const common = {
  flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  flexCenterCol: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  flexCenterRow: `
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `,
  flexCol: `
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
};

const theme = {
  breakpoints,
  colors,
  fontSizes,
  widthSize,
  size,
  common,
};

export default theme;
