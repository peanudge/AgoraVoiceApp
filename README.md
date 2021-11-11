# Agora Voice App Sample

[React Native Agora Tutorial](https://docs.agora.io/en/Voice/start_call_audio_react_native?platform=React%20Native#integrate-the-sdk)
를 알맞게 변형했습니다.

# 개발환경

Expo와 리액트 네이티브 CLI(네이티브 파일들에 접근하기위해)의 장점을 모두 얻기 위해 Expo 측에서 제공해주는 프로젝트 템플릿인
`create-react-native-app` 를 이용해서 프로젝트 생성했습니다.

해당 프로젝트를 빌드해서 실행하기 까지 사전에 준비되야할 설정들이 꽤 있습니다. (XCode와 시뮬레이터 설치에 꽤 많은 시간을 소요할 수 있습니다.)

- 리액트 네이티브 CLI 개발환경을 위한 설정(Mac + iOS) [공식 문서 확인](https://reactnative.dev/docs/environment-setup)
- XCode 최신버젼 설치. 앱스토어에서 설치하면 됩니다.(Expo로는 Voice Call이 안됨)
- XCode 에서 타겟 iOS Simulator 설치(이 코드는 iOS 14.4 Simulator에서 확인)
- `sudo npm i -g react-native-cli` React Native CLI Global 설치
- `sudo npm i -g pod-install` iOS 네이티브 라이브러리 설치시 필요함.

실행방법은 `npx react-native run-ios`로 시뮬레이터를 실행하세요.
(절대 `npm run ios` 로 실행하지마세요. Expo 로 실행시 Agora SDK가 동작하지 않습니다.)
혹은

실제 장비에서 실행하고 싶으면 XCode를 Build & Run 이용해서 실행하면됩니다.

실제 앱 서버 배포전까지는 Agora 콘솔에서 임시 토큰을 받아서 테스트 할 수 있습니다. (현재는 하드 코딩되어있습니다.)

# 참고사항

- Expo App으로 실행시 앱 빌드 실패할 것입니다. (npm start는 expo 명령임을 참고해주세요.)

React Native CLI로 실행하거나 XCode로 직접 빌드해서 실행가능합니다. 


# Tip

https://reactnative.dev/docs/environment-setup

위 환경 구성이 잘되었는지 확인해주세요.

디버깅 환경은 네트워크가 연결되어있어야한다.
