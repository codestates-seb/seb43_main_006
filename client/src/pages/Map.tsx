// 지도 컴포넌트

import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapComponent: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "700px", height: "50vh" }}></div>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}"
      ></script>
    </div>
  );
};

export default MapComponent;

//0513 23:35pm
