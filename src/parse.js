import annotations from "emoji-annotation-to-unicode"
import emoticons from "emoji-emoticon-to-unicode"
import escapeStringRegexp from "escape-string-regexp"

const getEscapedKeys = (hash) => {
  return Object.keys(hash)
    .map(x => escapeStringRegexp(x))
    .join('|');
};

const isFalsy = (o) => !o;

// Use negated lookahead for `:/`, refs: https://github.com/banyan/react-emoji/issues/1
const specialEmoticons = {':/': '1f615'};
const specialEmoticonsRegex = "\\:\\/(?!\\/)";

const emojiWithEmoticons = {
  delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):|${getEscapedKeys(emoticons)}|${specialEmoticonsRegex})`, 'g'),
  dict: Object.assign(annotations, emoticons, specialEmoticons)
};

const emojiWithoutEmoticons = {
  delimiter: new RegExp(`(:(?:${getEscapedKeys(annotations)}):)`, 'g'),
  dict: annotations
};

const getKey = (key) => {
  if (key.match(/^:.*:$/)) {
    return key.replace(/^:/, '').replace(/:$/, '');
  } else {
    return key;
  }
};

const emojifyTextToSingleEmoji = (text, options={}) => {
  let {dict} = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons;
  let hex = dict[getKey(text)];
  if (!!options.strict && !hex) throw new Error(`Could not find emoji: ${text}.`);
  if (!hex) return {type: 'text', value: text};
  return {
    type: 'emoji',
    value: getKey(text)
  };
};

const emojifyText = (text, options={}) => {
  let {delimiter, dict} = options.useEmoticon ? emojiWithEmoticons : emojiWithoutEmoticons;
  const output = text.split(delimiter).map(function (word, index) {
    let match = word.match(delimiter);
    if (!!options.strict && word !== '' && match === null) throw new Error(`Could not find emoji: ${word}.`);
    if (match) {
      let hex = dict[getKey(match[0])];
      if (hex === null) return {
        type: 'text',
        value: word
      };
      return {
        type: 'emoji',
        value: getKey(match[0])
      }
    } else {
      return {
        type: 'text',
        value: word
      }
    }
  });
  return output.filter(item => !isFalsy(item.value))
};

export {
  emojifyTextToSingleEmoji,
  emojifyText
}
