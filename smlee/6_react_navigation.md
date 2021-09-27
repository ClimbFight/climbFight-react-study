# 내비게이션
- 다양한 화면을 상황에 맞게 전환 시켜주기 위한 기능
- 리액트 네이티브에서는 내비게이션 기능을 지원해주지 않아 외부 라이브러리를 사용



### 설치

```
npm install @react-navigation/native
```



## 리액트 내비게이션

### 지원 종류

- 스택
- 탭
- 드로어



### 내비게이션 구조

- Screen
  - 화면으로 사용되는 컴포넌트
  - name(화면 **이름**)과 component 속성(**화면으로 사용될 컴포넌트**)을 지정해야 함
  - 화면으로 사용되는 컴포넌트는 항상 **navigation과 route**가 props로 전달됨
- Navigator
  - 화면을 관리하는 중간 관리자
  - 여러 개의 Screen 컴포넌트를 자식 컴포넌트로 갖고 있음
- NavigationContainer
  - 내비게이션의 계층 구조와 상태를 관리하는 컨테이너
  - 모든 네비게이션 구성요소를 감싼 최상위 컴포넌트



**우선 순위 설정** (화면 컴포넌트 > Screen 컴포넌트 > Navigator 컴포넌트)

1. Navigator 컴포넌트의 속성 수정
   - 자식 컴포넌트로 존재하는 모든 컴포넌트에 적용됨
   - 공통으로 적용시키고 싶을 경우 사용
2. Screen 컴포넌트의 속성 수정
   - 속성 적용 시, 해당 화면에만 적용
3. 화면으로 사용되는 컴포넌트의 props로 전달되는 navigation을 이용
   - 속성 적용 시, 해당 화면에만 적용

- 작은 범위가 우선 순위가 더 높음 (화면 컴포넌트 > Screen 컴포넌트)



## 스택 네비게이션

```
npm install @react-navigation/stack
```

- 일반적으로 많이 사용되는 네비게이션
- 현재 화면 위에 다른 화면을 쌓으면서 이동하는 것이 특징



```react
const StackNavigation = () => {
  return(
    	<Stack.Navigator initialRouteName="Home">
      	<Stack.Screen name="Home" component={Home} />
      	<Stack.Screen name="List" component={List} />
       	<Stack.Screen name="Item" component={Item} />
      </Stack.Navigator>
  );
};
```



```react
const App = () => {
	return(
		<NavigationContainer>
      <StackNavigation />
		</NavigationContainer>
	);
};
```



### **화면 이동**

```react
navigation.navigate('List')

navigation.navigate('Item', {id: item._id, name: item.name}); // props 정보도 함께 전달. route로 전달 받음
```



### **헤더 수정**

**타이틀 수정**

- 헤더의 타이틀은 Screen 컴포넌트의 **name 속성을 기본값**으로 사용하기 때문에, name 속성 변경으로 수정 가능

- `headerTitle`  속성을 이용한 변경

  ```react
  <Stack.Screen
  	name="List"
  	component={List}
  	options={{ headerTitle: 'List Screen'}} />
  ```

- Navigator 컴포넌트 > screen Options 속성 > header 타이틀 지정하면 모든 화면에 같은 타이틀 나타나도록 수정 가능



**타이틀 컴포넌트 변경**

- headerTitle 속성에 컴포넌트 반환 시, 원하는 컴포넌트로 변경 가능

```react
<Stack.Navigator
  ...(중략)...
  screenOptions={{
     headerTitle: ({style}) => (<MaterialCommunityIcons name="react" style={style} />),
     ...(생략)... 
  	}}
  >
</Stack.Navigator>
```



## 탭 내비게이션

```
npm install @react-navigation/bottom-tabs
```

- 탭 내비게이션은 화면 위/아래에 위치하며 탭 버튼을 통해 연결된 화면으로 이동하는 방식



```react
const TabNavigation = () => {
  return(
    <Tab.Navigator initialRouteName="Settings">
      <Tab.Screen name="Mail" component={Mail} />
      <Tab.Screen name="Meet" component={Meet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
```



### 탭 바 수정

- 버튼 아이콘 수정

  ```react
  <Tab.Screen 
    name="Settings" 
    component={Settings}
    options={{
      tabBarIcon: props => TabIcon({ ...props, name: 'settings'}),
    }}
   />
  ```

- 모든 버튼의 아이콘을 관리하고 싶은 경우, `Navigator` 컴포넌트의 `screenOptions` 속성을 사용해 관리

```react
<Tab.Navigator initialRouteName="Settings"
  screenOptions={({route}) => ({
    tabBarIcon: props => {
      let name = '';
      if(route.name === 'Mail') name = 'email';
      else if(route.name === 'Meet') name = 'video';
      ...(생략)...
    },
  })}
  >
  ...(생략)...
</Tab.Navigator>
```











