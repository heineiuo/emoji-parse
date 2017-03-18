const parse = require('../src');
const fs = require('fs');

test('should parse', () => {
  const result = parse.emojifyText(':smile:你好，今天天气不错:sun_with_face:', {});
  console.log(result);
  expect(result).toContainEqual({type: 'emoji', value: 'smile'});
  expect(result).toContainEqual({type: 'text', value: '你好，今天天气不错'});
  expect(result).toContainEqual({type: 'emoji', value: 'sun_with_face'});
  expect(result[0]).toMatchObject({type: 'emoji', value: 'smile'})
});

// test('should parse unicode', () => {
//   fs.readFile(__dirname + '/emoji.txt', 'utf-8', (err, content) => {
//     console.log(content.split('').codePointAt(0).toString(16));
//     const result = parse.emojifyText(content);
//     expect(result).toContainEqual({type: 'emoji', value: 'smile'});
//   })
//
// });
