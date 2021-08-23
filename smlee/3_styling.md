# 3. 스타일링

리액트 네이티브는 기존 웹 프로그래밍 css와 다르다.

## 스타일링 방식

- js를 이용해 스타일링 가능

### 인라인

- 컴포넌트의 style 속성에 적용하는 방법
- 객체 형식으로 style을 전달해야함 (html의 경우 문자열 형태로 스타일 입력)

```jsx
<Text style={{
		padding: 10,
		fontSize: 26,
		fontWeight: '600',
		color: 'black',
	}}>
	Inline Styling Text</Text>
```

- 인라인 형식은 어떤 스타일링 적용된 것인지 알 수 있음
- 다만, 동일 **코드 반복**과 명확히 이해되지 않을 수 있음

### 클래스 스타일링

- 스타일시트에 정의된 스타일을 사용하는 방법
- 웹 프로그래밍에서 CSS 클래스 사용하는 방식과 유사

```jsx
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
```

- 어떤 상황에 쓰일 스타일인지 명확히 알 수 있음
- 전체적인 스타일 관리가 인라인보다 쉬움

### 여러 스타일 적용

- 배열을 이용해 style 속성에 여러 스타일을 적용
- 뒤에 오는 스타일이 앞에 오는 스타일을 덮는 점은 주의...!

```jsx
... (중략) ...
<Text style={[styles.text, styles.error]}>Inline Styling - Error</Text>
... (중략) ...
```

## 리액트 네이티브 스타일

- flex : width/height와 달리 **비율을 통해 크기가 결정**
- 정렬
    - flexDirection : 컴포넌트가 쌓이는 방향을 결정 (column/column-reverse/row/row-reverse)
    - justifyContent: flexDirection에서 결정한 방향과 동일한 방향으로 정렬

    ```jsx
    flex-start: 시작점에서부터 정렬
    flex-end: 끝에서부터 정렬
    center: 중앙 정렬
    space-between: 컴포넌트 사이 공간을 동일하게 만들어 정렬
    space-around: 컴포넌트 각각 주변 공간을 동일하게 만들어 정렬
    space-evenly: 컴포넌트 사이와 양 끝에 동일한 공간을 만들어 정렬
    ```

    - alignItem: flexDirection에서 결정한 방향과 수직적인 방향으로 정렬하는 속성

    ```jsx
    flex-start: 시작점에서부터 정렬
    flex-end: 끝에서부터 정렬
    center: 중앙정렬
    stretch: alignItems의 방향으로 컴포넌트 확장
    baseline: 컴포넌트 내부 텍스트 베이스 라인을 기준으로 정렬
    ```

### 그림자

- 리액트 네이티브에서 플랫폼마다 다르게 적용되는 스타일 속성
- 속성 중 `shadowXXXX` 는 iOS에서만 그림자를 적용할 수 있음
- `elevation` 속성을 이용해 Android에서 그림자 적용 가능

## 스타일드 컴포넌트

- 자바스크립트 파일 안에 스타일을 작성하는 CSS-in-JS 라이브러리 (스타일이 적용된 컴포넌트)
- `styled.[컴포넌트이름]` 형태를 통해 스타일 지정 가능
- css를 이용해 재사용 가능한 코드를 관리 가능

```jsx
const WhiteText = styled.Text`
	color: #fff;
	font-size: 14px;
	font-weight:600;
`
```

```jsx
const TestView = () => {
	return(
		<>
			<WhiteText>I wanna go home</WhiteText>
		</>
	);
}
```

- 스타일 작성 벡틱 안에서 props 접근이 가능 `${props => props.title === 'Hanbit' ? '#3498db': '#9b59b6'}`

### ThemeProvider

- Context API를 활용해 앱 전체에서 스타일드 컴포넌트 이용 시 미리 정의한 값들을 사용할 수 있음

```jsx
...
<ThemeProvider theme={theme}>
...
</ThemeProvider>
```

- ThemeProvider의 자식 컴포넌트에서 스타일드 컴포넌트를 이용할 때 props로 theme을 전달받아 미리 정의된 색을 사용 가능
- darkTheme/lightTheme 등 여러 테마를 정해놓고 알맞은 테마를 설정하도록 할 수 있음