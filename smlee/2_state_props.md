# 2장

# 리액트 알아보기

## State

- 컴포넌트에서 데이터를 만들고 다루는 방식 중 하나
- 컴포넌트가 생성될 때 선언됨
- `setState` 를 통해서 상태를 갱신 (mutable)
    - 컴포넌트 상태가 변경되면 컴포넌트를 재 랜더링
    - 자식이 부모 것을 받아 사용하고, 부모에서 변경되면 부모&자식 컴포넌트는 재 랜더링됨

### 초기 state 지정

- 컴포넌트 생성 시, 생성자/속성 초기화를 이용해 초기화가 됨
- 초기화된 state는 컴포넌트 내에서 `this.state.` 를 통해서 사용 가능

### state 갱신

- state 갱신은 `this.setState()` 호출을 통해서 갱신
- setState 메서드는 이전 내용과 새로운 state 내용을 병합
    - 새로운 key-value로 이뤄진 객체 전달 시, 기존 state가 유지하던 다른 내용들은 그래도 유지하고 새로운 내용 추가
    - `render` 메서드는 `setState` 호출된 뒤 호출됨
- state를 직접 갱신 시, 재 랜더링 되지 않아 UI가 갱신되지 않음
    - 단, `forceUpdate` 를 사용할 경우 강제로 갱신 후, `render` 호출

---

 `Controlled Component`  < = > `Uncontrolled Component`

## Props

- 컴포넌트가 생성될 때 전달되는 매개변수
- state와 달리 컴포넌트 내에서 갱신되지 않음 (immutable)
    - 최상위에서 선언되고 전달받은 초기값을 변경해야 props 변경이 가능

예시

```jsx
...
render() {
	return(
		<BookDisplay book={"React Native in Action"} />
	)
}
...
```

### 동적 속성

- 외부를 통해서 변하는 속성
    - ex) 부모의 state 값이 props로 전달되는 경우
- 부모의 state 값이 변경되면 자식의 props도 새로운 값을 제공 받아, 부모&자식이 모두 재랜덩링이 됨

### state & props 구조 분해 할당

- 구조분해 할당
    - 자바 스크립트 특징 (ES2015 스펙에 추가)
    - 객체에서 속성을 가져와 앱의 변수로 사용하는 것

```jsx
...
render() {
	const { book } = this.state
}
...
```

위의 예시와 같이 this.state/this.props를 참조하지 않고 **변수를 가져와 변수 자체를 참조**

### stateless 컴포넌트에서의 props

- stateless 컴포넌트는 재사용 컴포넌트 만들 때 편리
- 컴포넌트에서 props 사용을 위해서는 메서드의  첫번째 인수로 전달

    ```jsx
    const BookDisplay = (pros) => {
    	const { book, updateBook } = props
    	return (
    		...
    			<Text onPress={ updateBook }>{ book }</Text>
    		...
    	)
    }
    ```

    - 메서드 인수 상에서 props를 구조 분해 할당을 통해 이용 가능

### 배열과 객체를 props로 전달

- 일반 데이터 타입과 마찬가지로 전달 가능 (intent와는 다르다. intent는 객체에 대해 Serializable/Paracelabe 과정이 필요)

## Component

- 스펙과 생명주기를 연결해 수행 동작 제어
- 스펙(specification)
    - 컴포넌트 생명주기 동안 일어나는 여러 상황에 대해 컴포넌트 대응 방식 제공
    - `render`/ `constructor` / `statics`

### render

- 컴포넌트 생성 시, 필수적으로 필요한 메서드
- 자식 / null / ~~false를~~ 반환할 수 있음

### props 초기화 & 생성자

- props 초기화
    - JS ES 7 스펙
    - 리액트 클래스 상에서 생성자를 사용해 초기 state 지정

    ```jsx
    constructor(props) {
    	super(props)
    	this.state = {
    		fullName: props.first + ' ' + props.last,
    	}
    }
    ```

    - props를 이용해 state 지정은 초기 데이터 지정할 때 추천
        - 컴포넌트 사이에서 데이터 변경 시, 값이 유지가 되지 않기 때문

## 생명주기 메서드

- 컴포넌트 생명주기 동안 특정 시점에서 실행되는 메소드를 의미
- 생성 ~ 소멸 동안 각기 다른 시점에서 동작을 수행하기 때문에 작동 방식 이해가 중요
- 생명주기의 3가지 시점
    1. 생성(Mounting)
        1. 생명주기 메서드들이 호출되기 시작
        2. UI를 렌더링하고 반환
        3. 생성 메소드 목록
            1. 생성자
            2. getDerivedStateFromProps
            3. render
            4. componentDidMount
    2. 갱신
        1. 컴포넌트 갱신관련 생명주기 호출
        2. `setState` / `forceUpdate` 메서드가 컴포넌트 내에서 호출될 때 발생
        3. 새 props가 컴포넌트 전달 시 발생
        4. 갱신 메소드 목록
            1. getDerivedStateFromProps (🤔 props 변경 시 호출)
            2. shouldComponentUpdate
            3. render
            4. getSnapshotBeforeUpdate
            5. componentDidUpdate
    3. 파기(UnMounting)
        1. 컴포넌트 언마운팅 시, 최종 생명주기 메서드 시작
        2. 파기 메소드 목록
            1. componentWillUnmount

### getDerivedStateFromProps

- 컴포넌트 생성 및 새 props 전달 시 호출
- 새로운 props와 state를 받아 새로운 객체를 반환
- 객체는 컴포넌트의 새로운 state로 갱신 ⁉️ (🤔 여기서 생성되면 무조건 state로 가나?)

### componentDidMount

- 컴포넌트 로딩 시 바로 한 번만 호출
- Ajax 호출로 가져온 데이터를 처리하거나, setTimeout, 다른 JS 프레임워크와 통합 때 많이 사용

### shouldComponentUpdate

- Boolean을 반환해 컴포넌트 랜더링 여부를 결정
- state/props의 랜더링이 필요할 경우 true 아니면 false를 반환

### componentDidUpdate

- 컴포넌트 갱신되면서 재랜더링 후 바로 호출
- 이전 state & props를 인수로 가짐

### componentWillUnmount

- 컴포넌트 파기 전에 호출
- 리스너 삭제, 타이머 삭제, 설정 정리 등의 작업 진행