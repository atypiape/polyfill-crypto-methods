# Polyfill-Crypto-Methods

This is a polyfill for the [Crypto](https://developer.mozilla.org/docs/Web/API/Crypto) **instance methods** of the [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) (just import this library at the top of your code entry):

* [`crypto.getRandomValues()`](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues)
* [`crypto.randomUUID()`](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID)
* [`crypto.randomBytes()`](https://nodejs.cn/api/crypto.html#crypto_crypto_randombytes_size_callback) (from `Node.js`)

This library was originally made for `WeChat Miniprogram`, because they do not support [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API), which prevents the use of some third-party encryption libraries, such as  [crypto-js](https://www.npmjs.com/package/crypto-js), [jsencrypt](https://www.npmjs.com/package/jsencrypt), [@noble/curves](https://www.npmjs.com/package/@noble/curves) etc.

----

向不支持 [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) 的运行环境，全局注入 [Crypto](https://developer.mozilla.org/docs/Web/API/Crypto) **实例方法**（只需在代码入口的顶部导入这个库）：

* [`crypto.getRandomValues()`](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues)
* [`crypto.randomUUID()`](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID)
* [`crypto.randomBytes()`](https://nodejs.cn/api/crypto.html#crypto_crypto_randombytes_size_callback) (来自 `Node.js`)

这是库最初，是给微信小程序做的，由于不支持 [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API)，导致无法使用一些第三方加密库，比如 [crypto-js](https://www.npmjs.com/package/crypto-js)、[jsencrypt](https://www.npmjs.com/package/jsencrypt)、[@noble/curves](https://www.npmjs.com/package/@noble/curves) 等。



## Usage

**NPM**

```bash
npm i polyfill-crypto-methods
```

**YARN**

```bash
yarn add polyfill-crypto-methods
```

### Examples

```javascript
import 'polyfill-crypto-methods';

// Ouptut: true
console.log(globalThis.crypto === crypto);

const int8 = crypto.getRandomValues(new Int8Array(4));
const int16 = crypto.getRandomValues(new Int16Array(4));
const int32 = crypto.getRandomValues(new Int32Array(4));
const uint8 = crypto.getRandomValues(new Uint8Array(4));
const uint16 = crypto.getRandomValues(new Uint16Array(4));
const uint32 = crypto.getRandomValues(new Uint32Array(4));

// Output: [-69, 52, -69, 8]
console.log(int8);
// Ouput: [-12857, 11870, 1874, -30545]
console.log(int16);
// Output: [740598374, 1682174651, -440338757, -391071704]
console.log(int32);
// Output: [133, 69, 14, 216]
console.log(uint8);
// Output: [45360, 53346, 43256, 34054]
console.log(uint16);
// Output: [1771376779, 3593883952, 3543639388, 2288005852]
console.log(uint32);

const uuid = crypto.randomUUID();
// Output: "e6c5350a-b7f3-9b9c-3a3c-d0eab9e63122"
console.log(uuid);

// Sync
const bytes = crypto.randomBytes(4);
// Ouput: [123, 56, 189, 201]
consologe.log(bytes);

// Async
const ret = crypto.randomBytes(4, (err, arr) => {
	// Ouput: null, [92, 112, 228, 144]
  console.log(err, arr);
});
```

```javascript
import { crypto as myCrypto } 'polyfill-crypto-methods';

// Ouptut: true
console.log(globalThis.crypto === myCrypto);

// Sync
const bytes = myCrypto.randomBytes(4);
// Ouput: [123, 56, 189, 201]
consologe.log(bytes);

// Async
const ret = myCrypto.randomBytes(4, (err, arr) => {
	// Ouput: null, [92, 112, 228, 144]
  console.log(err, arr);
});
```
