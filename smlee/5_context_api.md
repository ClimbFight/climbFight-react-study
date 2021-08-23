# Context API
- context api는 데이터를 전역적으로 관리하고 사용할 수 있도록 하는 기능
    -  ex) theme를 앱 전체에서 사용할 수 있게 하는 것  


### 전역 상태 관리가 필요한 이유
- 일반적으로 데이터는 부모 컴포넌트 -> 자식 컴포넌트로 전달됨
- 데이터를 사용하는 컴포넌트가 많다면 최상위 컴포넌트 App 컴포넌트에서 상태를 관리해 하위 컴포넌트에 전달할 수 있어야 함
    - props를 통해 전달하게 되면 많은 뎁스를 통해 데이터를 전달하게 됨
    - 값이 업데이트 되면 해당 데이터를 사용하는 컴포넌트 모두 재 랜더링이 되어야 함
    - **`Context API`를 사용하면 이러한 문제를 해결 가능!!!**

## Context API
- context API는 Consumer 컴포넌트와 Provider 컴포넌트를 갖고 있음

### Consumer
- context 오브젝트가 가지고 있는 컴포넌트
- 상위 컴포넌트 중 가장 가까운 곳에 있는 `Provider` 컴포넌트가 제공하는 데이터를 이용
- 상위 컴포넌트 중 Provider가 없으면 `createContext` 함수의 전달된 기본값을 사용
- Consumer 컴포넌트의 자식은 반드시 **리액트 컴포넌트를 반환**해야 함

```javascript

const UserContext == createContext({ name : 'Beomjun Kim'})

... (중략) ...

const User = () => {
    return(
        <UserContext.Consumer>
            {value => <StyledText>Name : {value.name}</StyledText>}
        </UserContext.Consumer>
    )
}
```

### Provider
- context 오브젝트가 가지고 있는 컴포넌트
- 하위 컴포넌트에 **Context 변화를 알리는 역할**
    - 하위 컴포넌트는 **변경된 value를 받을 때마다, 재 랜더링**됨
- Provider로 부터 value를 전달받는 하위 컴포넌트 수는 제한이 없음
```javascript
const App = () => {
    return(
        <UserContext.Provider value={{ name: 'Beomjum' }}> 
            <Container>
                <User />
            </Container>
        </UserContext.Provider>
    )
}
```

### Context 수정
```javascript
const UserProvider = ({children}) => {
    //전역적으로 관리할 상태 변수 및 함수
    const [name, setName] = useState('Beomjum Kim');
    
    const value = { user: {name}, dispatch: setName};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

```javascript
const User = () => {
    return(
        const [name, setName] = useState('');

        <UserConsumer>
            <StyledText
                value={name}
                onChangeText={text => setName(text)}
                ... (생략) ... 
            />
        </UserConsumer>
    )
}
```

## useContext
- Consumer 컴포넌트의 자식함수로 전달되던 값과 동일한 데이터를 반환
- Consumer 오브젝트를 사용하지 않고 Context를 사용할 수 있음

```javascript
    const User = () => {
        const { user } = useContext(UserContext);
        return <StyledText>Name: {user.Name}</StyledText>;
    }
```
- useContext 사용 시, 리액트 컴포넌트를 반환할 필요가 없어져 **코드가 간결해짐**