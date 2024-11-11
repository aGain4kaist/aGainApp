# How to Run

- aGainApp 폴더에서 터미널에 "cd backend"를 실행합니다.
- 이후 "npm install"을 실행합니다.
- 설치가 끝나면 "node index.js"를 실행합니다.
- API 명세서는 다음 링크를 참고하세요. https://www.notion.so/dad9df69a70548fdb1c979f11d8968df?p=9594e840c1ec4d619286b88f4cb7c1c4&pm=s

# 파일별 역할 설명

- config/firebaseAdmin.js: Firebase Admin SDK 초기화와 관련된 설정을 포함하는 파일입니다.
- controllers/: 각 기능의 로직과 데이터 처리 역할을 수행합니다. 데이터베이스와 상호작용하는 부분을 포함합니다.
- models/: 데이터 모델과 데이터베이스와 상호작용하는 메소드를 정의합니다.
- routes/: 각 기능별로 분리된 라우터 파일입니다. Express 라우팅을 정의하여 index.js에서 사용됩니다.
- utils/helpers.js: 거리 계산 함수와 같이 여러 컨트롤러에서 사용할 유틸리티 함수를 정의합니다.
