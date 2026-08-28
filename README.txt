OSDI PWA 사용법

1) 이 폴더를 웹서버(HTTPS)에 올립니다.
2) iPhone에서 Safari로 해당 주소에 접속합니다.
3) Safari 공유 버튼 → '홈 화면에 추가'를 선택합니다.
4) 이후 OSDI 아이콘을 눌러 일반 앱처럼 실행합니다.

중요:
- iPhone은 로컬 HTML 파일을 홈 화면 PWA로 안정적으로 설치하기 어렵습니다.
- 따라서 GitHub Pages, Netlify, Cloudflare Pages 같은 무료 HTTPS 호스팅에 올리는 방식을 권장합니다.
- service worker가 있어 한 번 로드한 뒤에는 오프라인에서도 사용할 수 있습니다.
