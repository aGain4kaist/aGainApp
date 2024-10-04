import React from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap({ info, setInfo }) {
	const positions = [
		{
			title: "카이스트 정문",
			latlng: { lat: 36.365679109284, lng: 127.36395917051 },
		},
		{
			title: "창의학습관",
			latlng: { lat: 36.370379109284, lng: 127.36265917051 },
		},
		{
			title: "KI 빌딩",
			latlng: { lat: 36.367979109284, lng: 127.36395917051 },
		},
	]
	return (
		<Map
			center={{ lat: 36.370379109284, lng: 127.36265917051 }}
			style={{ width: '600px', height: '600px' }}
			level={4}
		>
			{positions.map((position, index) => (
				<MapMarker
					key={`${position.title}-${position.latlng}`}
					position={position.latlng} // 마커를 표시할 위치
					image={{
						src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
						size: {
							width: 24,
							height: 35
						}, // 마커이미지의 크기입니다
					}}
					title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					onClick={(marker) => {
						setInfo({ name: marker.Gb })
					}}
				/>
			))}
		</Map>
	)
}

export default KakaoMap;