# emoji-parse
😁Parse emoji plain text to syntax tree
---

*Important*: Most of code come from [banyan/react-emoji](https://github.com/banyan/react-emoji).
Instead parse to create react element, this repo return an ast-like tree for more common usage.

## usage

* commonjs: `yarn add emoji-parse`

```javascript
import { emojifyTextToSingleEmoji, emojifyText} from 'react'

const result = emojifyText(':smile:你好，今天天气不错:sun_with_face:')
console.log(result)
//[ { type: 'emoji', value: 'smile' },
//  { type: 'text', value: '你好，今天天气不错' },
//  { type: 'emoji', value: 'sun_with_face' } ]

```

* amd(browser):

```html
<script src="//unpkg.com/emoji-parse"/>
```


## options

Properties | Description | Default | Type
---|---|---|---
useEmoticon | Use emoticon or not| true | Boolean
strict | Throw an error if annotation is not in dict, it's handy if emoji input is not from end user | false | Boolean

### Test

```
$ npm test
```

## License
MIT