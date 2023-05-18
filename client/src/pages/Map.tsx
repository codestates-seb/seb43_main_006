import React, { useEffect } from "react";
// import { useSelector } from "react-redux";

declare global {
  interface Window {
    kakao: any;
    closeOverlay: () => void;
  }
}
interface Shopitem {
  address: string;
  choice: boolean;
  comment: string;
  lat: number;
  lng: number;
  marketId: number;
  name: string;
  phone: string;
  workTime: string;
}
interface ShopProps {
  shoplist: Shopitem[];
  setSelect: React.Dispatch<React.SetStateAction<Shopitem | null>>;
}
// interface SelectProps {
//   setSelect: React.Dispatch<React.SetStateAction<string>>;
// }

const MapComponent = ({ shoplist, setSelect }: ShopProps) => {
  // const selectdata = useSelector((state) => state);
  // console.log(selectdata);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.32569664033685, 127.10734442799804),
      level: 2,
    };
    // console.log(setSelect);
    const map = new window.kakao.maps.Map(container, options);

    //사용자 현재위치 정보
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon),
          message = "<div>현재위치</div>";

        // console.log(locPosition, message); // 이게 현재위치 잡히는거다 !!!!!!!!
        displayMarker(locPosition, message);
      });
    } else {
      const locPosition = new window.kakao.maps.LatLng(37.57022168346011, 126.98314742271637), //종각역
        message = "<div>아니야</div>";

      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition: any, message: any) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      const iwContent = message,
        iwRemoveable = true;

      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });
      infowindow.open(map, marker);
      map.setCenter(locPosition);
    }

    shoplist.forEach((el: any) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.lat, el.lng),
        data: el.data,
      });

      const content =
        '<div onClick={handleChoice} className="overlayContainer" style="background-color: red;">' +
        `<div style="color: black;" >${el.name}</div>` +
        `<div className="shopPhone">${el.phone}</div>` +
        "</div>";

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: new window.kakao.maps.LatLng(el.lat, el.lng),
      });
      //마우스오버하면 커스텀어레이가 생성된다.
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        customOverlay.setMap(map);
      });

      //마우스아웃하면 커스텀어레이가 없어진다.
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        customOverlay.setMap(null);
      });
      window.kakao.maps.event.addListener(marker, "click", () => {
        setSelect(el);
        // console.log(el);
      });
    });
  }, [shoplist]);

  return <div id="map" style={{ width: "800px", height: "500px" }}></div>;
};

export default MapComponent;
