import './style.css';
import '../lib';
import * as myCrypto from '../lib/shim';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Polyfill Crypto Methods</h1>
    <p class="text">
      crypto is ${myCrypto ? 'defined' : 'undefined'} !
    </p>
  </div>
`;

(async function() {
  console.log("my getRandomValuesI8:", myCrypto.getRandomValues(new Int8Array(4)));
  console.log("os getRandomValuesI8:", crypto.getRandomValues(new Int8Array(4)));

  console.log("my getRandomValuesI16:", myCrypto.getRandomValues(new Int16Array(4)));
  console.log("os getRandomValuesI16:", crypto.getRandomValues(new Int16Array(4)));

  console.log("my getRandomValuesI32:", myCrypto.getRandomValues(new Int32Array(4)));
  console.log("os getRandomValuesI32:", crypto.getRandomValues(new Int32Array(4)));

  console.log("my getRandomValuesU8:", myCrypto.getRandomValues(new Uint8Array(4)));
  console.log("os getRandomValuesU8:", crypto.getRandomValues(new Uint8Array(4)));

  console.log("my getRandomValuesU16:", myCrypto.getRandomValues(new Uint16Array(4)));
  console.log("os getRandomValuesU16:", crypto.getRandomValues(new Uint16Array(4)));

  console.log("my getRandomValuesU32:", myCrypto.getRandomValues(new Uint32Array(4)));
  console.log("os getRandomValuesU32:", crypto.getRandomValues(new Uint32Array(4)));

  console.log("my randomUUID:", myCrypto.randomUUID());
  console.log("os randomUUID:", crypto.randomUUID());

  console.log("my randomBytes:", myCrypto.randomBytes(4));
  console.log("os randomBytes:", (crypto as any).randomBytes(4));

  const ret = myCrypto.randomBytes<Promise<Uint8Array>>(4, (err, buf) => {
    console.log("randomBytesAsync - callback:", err, buf);
  });
  console.log('randomBytesAsync - return:', ret);
  console.log('randomBytesAsync - await:', await ret);
})();
