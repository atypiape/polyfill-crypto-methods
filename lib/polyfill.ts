import { getGlobalThis } from './global-this';
import { getRandomValues, randomBytes, randomUUID } from "./shim";
import type { CryptoMethods } from "./shim";

// 获取全局对象
const globalThat = getGlobalThis();

/**
 * 如果当前运行环境中没有 crypto 实例，则将自己实现的 crypto 实例注入到 globalThis 中。
 * 如果有 crypto 实例，但没有 crypto.randomBytes() 方法，就将函数 randomBytes() 注入。
 */
(function () {
  if ("crypto" in globalThat) {
    if (!("getRandomValues" in globalThat.crypto)) {
      (globalThat.crypto as any).getRandomValues = getRandomValues;
    }
    if (!("randomBytes" in globalThat.crypto)) {
      (globalThat.crypto as any).randomBytes = randomBytes;
    }
    if (!("randomUUID" in globalThat.crypto)) {
      (globalThat.crypto as any).randomUUID = randomUUID;
    }
  } else {
    (globalThat as any).crypto = {
      getRandomValues,
      randomBytes,
      randomUUID,
    } as CryptoMethods;
  }
})();

export const crypto: CryptoMethods = globalThat.crypto as any;
