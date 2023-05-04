// 반응형 구현을 위한 px -> rem 단위 변환
function pxToRem(pixelValue: number) {
  const remValue = pixelValue / 16;
  return `${remValue}rem`;
}
// 화면 사이즈
const size = {
  mobile: '',
  tablet: '',
};

// 화면 변경 지점
const breakpoints = {
  mobileMax: `screen and (max-width: ${size.mobile})`,
  tabletMax: `screen and (max-width: ${size.tablet})`,
};

// 콘텐츠 넓이 관련
const widthSize = {
  contentMax: '1250px',
};

// 색
const colors = {
  fontColor: '#181818',
  themeColor: '#AB4448',
  border: '#DEDEDE',
  bg: '#F7F7F7',
};

// 폰트 크기
const fontSizes = {
  title: pxToRem(18),
  subtitle: pxToRem(15),
  money: pxToRem(16),
  defalt: pxToRem(14),
};

const common = {
  flexCenter: `
      display: flex;
      justify-contents: center;
      align-items: center;
    `,
  flexCenterCol: `
      display: flex;
      flex-direction: column;
      justify-contents: center;
      align-items: center;
    `,
  flexCenterRow: `
      display: flex;
      flex-direction: row;
      justify-contents: center;
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
