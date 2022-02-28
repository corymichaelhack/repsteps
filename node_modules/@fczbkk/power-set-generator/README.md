# Power Set Generator

Javascript utility that creates generator which yields power set of provided values, from simplest to most complex combinations, in stable order.

For example, providing this list...

```
['a', 'b', 'c']
```

...will produce these combinations, in this order:

```
[ 'a' ]
[ 'b' ]
[ 'c' ]
[ 'a', 'b' ]
[ 'a', 'c' ]
[ 'b', 'c' ]
[ 'a', 'b', 'c' ]
```

## How to use

Install from NPM:

```
npm install @fczbkk/power-set-generator
```

Then include it in your code:

```javascript
import PowerSetGenerator from '@fczbkk/power-set-generator';
```

Then you can use it like any other generator.

In a loop:

```javascript
const generator = PowerSetGenerator(['a', 'b', 'c'])
for (const result of generator) {
    console.log(result)
}
```

Via iteration protocol:

```javascript
const generator = PowerSetGenerator(['a', 'b', 'c'])

let result = generator.next()
while (!result.done) {
  console.log(result.value)
  result = generator.next()
}
```

Or you can generate whole set at once:

```javascript
const generator = PowerSetGenerator(['a', 'b', 'c'])
const result = [...generator]
```
