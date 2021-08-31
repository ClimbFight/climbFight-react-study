# 7/27 React Native Study

## 1. Dimensions

```js
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width | height

// ... 중략

const Input = styled.TextInput`
 flex: 1;
 width: ${({width}) => width - 40}px;
`

return (
    {/* 어느 화면이든 동일하게 양옆 20px씩 여백 줌  */}
    <Input width={width}>
)
```

## 2. Async Storage

앱이 꺼져도 데이터 유지, 브라우저 localStorage와 동일한듯

```sh
> npm i @react-native-community/async-storage
```

```js
AsyncStorage.setItem(key: string, value: string)
AsyncStorage.getItem(key: string)
```

## 3. 스플래시 아이콘?이미지? 추가

우리는 expo안쓰는데...

따라서 app.json이 아닌 App.js 에서 navigator에서 loading 적용

```js
const AppNavigator = createSwitchNavigator(
  {
    loading: Loading,
    auth: AuthNavigator,
    home: HomeNavigator,
  },
  {
    initialRouteName: "loading",
  }
);
```

## 4. TodoList

할일 리스트 데이터를 어떤 구조로 가지고 있을까?
Array vs Object

key direct ref

key로 indexOf (loop)

Object.values(obj).map()

```js
const context = React.createContext({
  getObjectByArray(list) {
    list.reduce((obj, elem) => {
      obj[elem.key] = elem;
      return obj;
    }, {});
  },
});
```

```js
const list = [
  {
    id: "1",
    title: "Todo1",
  },
  {
    id: "2",
    title: "Todo2",
  },
];

const obj = {
  1: {
    title: "Todo1",
  },
  2: {
    title: "Todo2",
  },
};
```
