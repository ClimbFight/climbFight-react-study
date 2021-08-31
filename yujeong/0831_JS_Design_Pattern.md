# Javascript Design Pattern 20

## Creational Design Patterns
### 1. Factory Method

```typescript
interface CommonPerson {
    name: string
    age: number
    parents?: CommonPerson[]
}

class Person implements CommonPerson {
    constructor(name: string, age: number, parents: CommonPerson[]) {
        this.name = name
        this.age = age
        this.parents = parents
    }
}

const createPerson = (name, age, parents = []) => new Person(name, age, parents)

const newjeong = createPerson('전유정', 28, [
    createPerson('Mother', 53),
    createPerson('Father', 54)
])
```

<hr />

### 2. Abstract Factory

```js
class Storage {
    set (key, value) {
        throw new Error('You need to define set(key, value) Method!')
    }

    get(key) {
        throw new Error('You need to define get(key) Method!')
    }

    clear() {
        throw new Error('You need to define clear() Method!')
    }

    remove(key) {
        throw new Error('You need to define remove(key) Method!')
    }
}

class LocalStorage extends Storage {
    set (key, value) {
        window.localStorage.setItem(key, value)
    }

    get(key) {
        return window.localStorage.getItem(key)
    }

    clear() {
        return window.localStorage.clear()
    }

    remove(key) {
        window.localStorage.removeItem(key)
    }
}

class SessionStorage extends Storage {}
```

<hr />

### 3. Builder

#### 기본 객체
```js
class Person {
    constructor () {
        this.streetAddress = this.nationality = this.city = ''
        this.companyName = this.position = ''
        this.annualIncome = 0
    }

    toString() {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.nationality} and work at ${this.companyName} as a ${this.position} earning ${this.annualIncome}$`
    }
}

```

#### Builder
```js
class PersonBuilder {
    constructor (person = new Person()) {
        this.person = person
    }

    get lives() {
        return new PersonAddressBuilder(this.person)
    }

    get works() {
        return new PersonJobBuilder(this.person)
    }

    build() {
        return this.person
    }
}
```

#### SubBuilder
```js
class PersonAddressBuilder extends PersonBuilder {
    constructor (person) {
        super(person)
    }

    at(streetAddress) {
        this.person.streetAddress = streetAddress
        return this
    }

    withNationality(nationality) {
        this.person.nationality = nationality
        return this
    }

    in(city) {
        this.person.city = city
        return this
    }
}
```
```js
class PersonJobBuilder extends PersonBuilder {
    constructor (person) {
        super(person)
    }

    at(companyName) {
        this.person.companyName = companyName
        return this
    }

    asA(position) {
        this.person.position = position
        return this
    }

    earning(annualIncome) {
        this.person.annualIncome = annualIncome
        return this
    }
}
```

#### Usage
```js
const personBuilder = new PersonBuilder()

let person = personBuilder.lives
.at('ABC Street')
.in('NewYork')
.withNationality('USA')
.works.at('Apple')
.asA('Engineer')
.earning(10000)
.build()
```

<hr />

### 4. Prototype
```js
class Person () {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    setName(name) {
        this.name = name
    }

    setAge(age) {
        this.age = age
    }

    clone (name, age) {
        return new Person(name, age)
    }
}

const newjeong = new Person('전유정', 28)
const hyunbin = newjeong.clone()
hyunbin.setName('전현빈')
hyunbin.setAge(27)
```

### 5. Singleton

```js
class Singleton {
    constructor () {
        const instance = this.constructor.instance
        if (instance) {
            return instance
        }

        this.constructor.instance = this
    }
}
```

<hr />

## Structural Design Patterns

### 6. Adapter
1 -> 2로 구조 변경 시 유용
```js
class Calculator1 {
    constuctor() {
        this.operations = (v1, v2, operation) => {
            switch (operation) {
                case 'add':
                    return v1 + v2
                case 'sub':
                    return v1 - v2
                default:
                    throw new Error('operation can not be undefined.')
            }
        }
    }
}

class Calculator2 {
    constructor() {}
    add(v1, v2) {
        return v1 + v2
    }
    sub(v1, v2) {
        return v1 - v2
    }
}

class CalculatorAdaptor {
    constuctor() {
        const calculator = new Calculator2()

        this.operations = (v1, v2, operation) => {
            switch (operation) {
                case 'add':
                    return calculator.add(v1, v2)
                case 'sub':
                    return calculator.sub(v1, v2)
                default:
                    throw new Error('operation can not be undefined.')
            }
        }
    }
}
```

<hr />

### 7. Bridge
하나의 큰 클래스를 관련있는 단위로 쪼개어 abstraction과 implementation을 분리
```js
class VectorRenderer {
    render(radius) {
        console.log(`Drawing a circle of radius ${radius}`)
    }
}
class RasterRenderer {
    render(radius) {
        console.log(`Drawing a pixels for circle of radius ${radius}`)
    }
}
class Circle {
    constructor(renderer, radius) {
        this.renderer = renderer
        this.radius = radius
    }

    draw() {
        this.renderer.render(this.radius)
    }

    resize(factor) {
        this.radius *= factor
    }
}

const circle1 = new Circle(new VectorRenderer(), 5)
circle1.draw()
```

<hr />

### 8. Composite
```js
class Employee {
    constructor(name, job) {
        this.name = name
        this.job = job
    }

    print() {
        console.log(`name: ${this.name} job: ${this.job}`)
    }
}
class EmployeeGroup {
    constructor(groupName, employees = []) {
        this.groupName = groupName
        this.employees = employees
    }

    print() {
        console.log(this.groupName)
        this.employees.forEach((employee) => {
            employee.print()
        })
    }
}

const kim = new Employee('kim', 'developer')
const lee = new Employee('lee', 'developer')
const developerGroup = new EmployeeGroup('Developer', [kim, lee])
```

<hr />

### 9. Decorator
method를 동적으로 추가, 오버라이드
```js
class Charactor {
    constructor(name, position, hp) {
        this.name = name
        this.position = position
        this.maxHp = hp
        this.hp = hp
    }

    addHp(amount) {
        if (this.maxHp < this.hp + amount) {
            this.hp = this.maxHp
            return
        }
        this.hp += amount
    }

    loseHp(amount) {
        if (0 > this.hp - amount) {
            this.hp = 0
            return
        }
        this.hp -= amount
    }
}

class Worrier extends Charactor {
    constructor(name) {
        super(name, 'worrier', 3500)
    }

    getCured(amount) {
        this.addHp(amount)
    }
}

class Healer extends Charactor {
    constructor(name) {
        super(name, 'healer', 2000)
    }

    cure(target, amount) {
        target.getCured(this.hp * 0.2)
    }
}

```

<hr />

### 10. Facade
복잡한 서브시스템을 인터페이스로 감싸 간단하게 만듬
```js
class CPU {
    freeze() {console.log("Freezed....") }
    jump() { console.log("Go....") }
    execute() { console.log("Run....") }
}

class Memory {
    load() { 
        console.log("Load....") 
    }
}

class HardDrive {
  read() { console.log("Read....") }
}

class Computer {
  constructor() {
    this.processor = new CPU()
    this.ram = new Memory()
    this.hd = new HardDrive()
  }

  start() {
    this.processor.freeze()
    this.ram.load()
    this.hd.read()
    this.processor.jump()
    this.processor.execute()
  }
}
```

<hr />

### 11. FlyWeight
메모리를 줄이는 연산

예) 사용자 1000명을 저장. 비슷한 성과 이름을 가진 사람들이 많음

```js
// simple implementation
class User {
    constructor(fullName) {
        this.fullName = fullName
    }
}

// flyweight implementation
class UserLight {
    constructor(fullName) {
        const checkIndex = (str) => {
            const index = UserLight.list.indexOf(str)
            if (index> -1) {
                return index
            }

            UserLight.list.push(str)
            return UserLight.list.length - 1
        }

        this.indexesOfName = fullName.split(' ').map(checkIndex)
    }
}
UserLight.list = []
```

#### Usage
```js
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const randomString = () => {
    let result = [];
    for (let x = 0; x < 10; ++x)
        result.push(String.fromCharCode(65 + getRandomInt(26)))
    return result.join('')
}

let users = [];
let users2 = [];
let firstNames = [];
let lastNames = [];

for (let i = 0; i < 100; ++i)
{
    firstNames.push(randomString());
    lastNames.push(randomString());
}

// make 10k users
for (let first of firstNames) {
    for (let last of lastNames) {
        users.push(new User(`${first} ${last}`));
        users2.push(new UserLight(`${first} ${last}`));
    }
}

// users: ['VJNSTYYOVZ XCLQMZBQPT', 'VJNSTYYOVZ VXDWYMEAXK', 'VJNSTYYOVZ TSBDHDQIZX', ...]

// users2: [[0, 1], [0, 2], [0, 3], ...]
// UserLight = ['VJNSTYYOVZ', 'XCLQMZBQPT', 'VXDWYMEAXK']
```

<hr />

### 12. Proxy
예) Object 클래스의 proxy
```js
class Percentage {
    constructor(percent) {
        this.percent = percent
    }

    toString() {
        return `${this.percent}&`
    }

    valueOf() {
        return this.percent / 100
    }
}
```

<hr />

## Behavioral Design Patterns
객체간의 관계, 커뮤니케이션을 표현하는데 집중

### 13. Chain of Responsibility
(참고) https://www.nextree.co.kr/p2533/

```js

```