# 4. Hooks

# Hooks 란?

- 함수형 컴포넌트에서 상태를 관리할 수 있는 수단
- 컴포넌트의 생명주기에 맞춰 특정 작업을 수행할 수 있게 해줌

## useState

- 호출 시, 변수와 setter 함수를 배열로 반환
- 관리해야하는 state의 수만큼 여러번 사용이 가능
- 상태 관리 변수는 **반드시 세터함수를 이용해 값을 변경**
- 상태가 변경되면 컴포넌트가 변경 내용 반영을 위해 다시 랜더링됨

```jsx
const [state, setState] = useState(initialState);
```

**세터함수**

- 사용 방법

  1. 세터 함수에 변경될 상태 값 전달
  2. 세터함수 파리미터에 함수 전달

  ```jsx
  setState((prevState) => {});
  ```

- **비동기**로 동작

  - 상태가 바로 변경되지 않는 문제 발생 가능 ⇒ 세터 함수를 함수 인자로 전달해 이전 상태 값 이용

  ```jsx
  const Counter = () => {
  	const [count, setCount] = useState(0);
    ...(중략)...
  	setCount(prevCount => prevCount + 1);
    ...(생략)...
  }
  ```

### useEffect

- 컴포넌트가 렌더링될 때마다 원하는 작업이 실행되도록 설정할 수 있는 기능

```jsx
useEffect(() => {
  함수;
}, [조건]);
```

- 두번째 파라미터가 없다면, 첫번째 파라미터로 전달된 함수는 컴포넌트가 랜더링 될 때마다 호출
- 특정 조건 실행

  - 두번째 파라미터에 상태를 관리하는 변수를 배열로 전달
  - 상태 값이 변경되면 실행할 함수를 useEffect를 이용해 실행할 수 있음

  ```jsx
  useEffect(() => {
    console.log(`name: ${name}, email: ${email}\n`);
  }, [email]);
  ```

  - 마운트 될 때
    - `useEffect(() => { console.log('test'); }, []);`
    - 조건이 [] 일 시, 재랜더링 되어도 실행되지 않음
  - 언마운트 될 떄
    - `useEffect(() => { return() => console.log('test'); }, []);`
    - return( `cleanup` ) 함수가 존재하고 조건이 [] 일 시, 언마운트 될 때 실행

### useRef

- 특정 컴포넌트를 선택해야할 때 사용하는 Hook 함수

```jsx
const ref = useRef(initialValue);
```

- useRef의 내용이 변경되어도 컴포넌트는 다시 랜더링 되지 않음
- ref된 값 변경 시, 변수에 값이 저장되는 것이 아닌 변수.current 프로퍼티에 해당 값 저장 🤔

### useMemo

- 동일한 연산의 반복 수행을 제거해 성능을 최적화하는데 사용

```jsx
useMemo(() => {
  함수;
}, [조건]);
```

- 조건의 지정된 값에 변화가 있는 경우에만 함수 호출 (useEffect랑 비슷!?)
- 값이 변하지 않으면 이전에 연산했던 결과를 이용해 중복 연산을 방지
