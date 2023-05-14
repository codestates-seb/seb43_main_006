// 지도 컴포넌트

import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
interface SearchProps {
  Place: string;
}
const MapComponent: React.FC<SearchProps> = ({ Place }) => {
  useEffect(() => {
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(Place, placesSearchCB);

    function placesSearchCB(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }

    function displayMarker(place: any) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
        infowindow.open(map, marker);
      });
    }
  }, [Place]);

  return (
    <div>
      <div id="map" style={{ width: "700px", height: "50vh" }}></div>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services"
      ></script>
    </div>
  );
};

export default MapComponent;
