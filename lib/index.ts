/**
 * 填补某些运行环境 (例如微信小程序) 缺失的 Web Crypto API 的 Crypto 实例方法，包括：
 * - crypto.getRandomValues()
 * - crypto.randomUUID()
 * - Node.js crypto.randomBytes()
 */
export { crypto } from './polyfill';
export type { CryptoMethods } from './shim';
