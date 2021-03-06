# 1장

# 리액트 네이티브란?

- JS와 JS 라이브러리를 사용해 모바일 앱을 만드는 프레임워크
- 리액트 네이티브의 코드는 플랫폼의 네이티브 컴포넌트로 컴파일됨

### 장점

- FB 지원
- 많은 기업들이 투자하고 개발에 사용
- 웹 개발에서 모바일 앱 개발 전환을 쉽게 만듦

### 단점

- 네이티브의 새로운 기능을 사용하는데 오래 걸림
- 유지보수 어려움(?)
- 업데이트가 잦음

## 리액트 네이티브의 동작 방식

1. 브릿지
    - JS 코드와 네이티브 계층과 통신할 수 있는 브릿지 제공
    - JS 스레드 상에서 정보를 받아 네이티브로 전달

    ![./img/flowchart.png](./img/flowchart.png)

2. 가상 DOM
    - 데이터가 변할 경우 자동으로 화면을 다시 그리는 것
    - 데이터 변환 시, 과정
        1. 데이터 변화가 존재
        2. 변화된 데이터를 이용해 가상 DOM을 그림 (🤔 이 과정은 메모리 이런게 많이 들지 않나요???)
            1. 휴리스틱하게 그림을 그림
            2. 태그를 먼저 검사
            3. 태그 변화 없으면 attr 검사
        3. 가상 DOM과 실제 DOM을 비교하여 차이점을 확인
        4. **차이점이 있는 부분만 실제 DOM 에 적용하여 그림**
3. JSX
    - 자바스크립트 확장 문법으로 XML과 유사
    - 자바 스크립트 상 UI 작업 시 가독성에 도움을 줌
    - JSX는 `Babel` 을 사용하여 추후 스크립트로 변환됨

    ```jsx
    function formatName(user) {
       return user.firstName + ' ' + user.lastName
    }

    const user = {
       firstName: 'Beomjun'
       lastName: 'Kim',
    };

    // 하단이 JSX 작성 코드
    const element = <h1>Hello, {formatName(user)}!</h1>
    ```

## 리액트의 특징

1. Component
    - 리액트/리액트 네이티브 상에서 조립 블록에 해당
    - 어플리케이션은 다양한 컴포넌트들의 결합으로 이뤄져 있음
    - 컴포넌트는 상태를 유지하는 stateful, 유지하지 않는 stateless 두 종류가 있음
        - stateless
            - 생명주기 메서드에 연결되지 않고 자신만의 고유 상태를 유지하지 않음
            - 화면에 보여지는 모든 데이터를 props로 받아야함
2.  리액트 생명주기
- 리액트 네이비트 클래스 생성 시, 메서드들이 인스턴스화되어 연결 가능
- 대표적인 생명주기 메소드 : `constructor/componentDidMount/render`

3. 단방향 데이터 흐름

- 최상위 컴포넌트에서 아래 모든 방향으로 단방향 데이터 흐름이 만들어짐
- 데이터가 계층구조 형태가 됨

4. 디핑

- 코드를 비교해 컴포넌트에 반영
- 컴포넌트를 갱신하는 스레드에 최소한의 데이터를 전달