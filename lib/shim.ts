/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 */
type TypedArray =
  | Int8Array
  | Uint8ClampedArray
  | Uint8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array;

type RandomBytesCallback = (err: Error | null, buf: Uint8Array) => void;

/**
 * Web Crypto API 中的 Crypto 实例方法 + Node.js 中的 crypto.randomBytes() 方法
 * @see https://developer.mozilla.org/docs/Web/API/Crypto
 */
export interface CryptoMethods {
  getRandomValues<T extends TypedArray>(array: T): T;
  randomUUID(): string;

  /** Node.js 中的 crypto.randomBytes() 方法 */
  randomBytes(size: number): Uint8Array;
  randomBytes(size: number, callback: RandomBytesCallback): Promise<Uint8Array>;
}

/**
 * crypto.getRandomValues() 方法实现
 * @see https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues
 */
export function getRandomValues<T extends TypedArray>(array: T): T {
  if (!ArrayBuffer.isView(array)) {
    throw new TypeError(
      "Failed to execute 'getRandomValues' on 'Crypto': parameter 1 is not of type 'ArrayBufferView'."
    );
  }

  if (array.byteLength > 65536) {
    const message =
      "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" +
      array.byteLength +
      ") exceeds the number of bytes of entropy available via this API (65536).";

    // 小程序中没有 DOMException
    if ('DOMException' in globalThis) {
      throw new globalThis.DOMException(message);
    } else {
      throw new Error(message);
    }
  }

  const maxValue = Math.pow(256, array.BYTES_PER_ELEMENT);

  for (let i = 0; i < array.byteLength; ++i) {
    array[i] = Math.floor(maxValue * Math.random());
  }

  return array;
}

/**
 * Node.js 中的 crypto.randomBytes() 方法实现
 * @see https://nodejs.cn/api/crypto.html#crypto_crypto_randombytes_size_callback
 */
export function randomBytes<T extends Uint8Array | Promise<Uint8Array> = Uint8Array>(
  size: number,
  callback?: RandomBytesCallback,
): T {
  if (typeof size !== "number") {
    throw new TypeError(
      '[ERR_INVALID_ARG_TYPE]: The "size" argument must be of type number. ' +
        `Received type ${typeof size} (${size})`
    );
  }

  if (size < 0 || size > 2147483647) {
    throw new RangeError(
      '[ERR_OUT_OF_RANGE]: The value of "size" is out of range. ' +
        `It must be >= 0 && <= 2147483647. Received ${size}`
    );
  }

  if (callback && typeof callback !== "function") {
    throw new TypeError(
      '[ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. ' +
        `Received type ${typeof callback} (${callback})`
    );
  }

  if (!callback) {
    const array = new Uint8Array(size);
    return (getRandomValues(array) as T);
  }

  return new Promise<Uint8Array>((resolve) => {
    const array = new Uint8Array(size);
    let error: Error | null = null;
    try {
      callback(null, getRandomValues(array));
    } catch (e) {
      callback(error, array);
    }
    resolve(array);
  }) as T;
}

/**
 * crypto.randomUUID() 方法实现
 * @see https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID
 */
export function randomUUID(): string {
  const array = randomBytes(16);
  const random = array.reduce((acc, byte, index) => {
    let value = acc + byte.toString(16).padStart(2, "0");
    if (index === 3 || index === 5 || index === 7 || index === 9) {
      value += "-";
    }
    return value;
  }, "");
  return random;
}
