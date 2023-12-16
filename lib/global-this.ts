type GlobalType<T extends any> = T extends Window
 ? Window
  : T extends typeof globalThis
 ? typeof globalThis
  : never;

declare const window: Window & typeof globalThis;
declare const self: typeof globalThis;
declare const global: typeof globalThis;

/**
 * 尽可能获取各种运行环境下的全局对象
 */

let theGlobalThis: GlobalType<typeof globalThis> | undefined;

// ECMAScript2020(ES11) 新增的
if (typeof globalThis !== "undefined") {
  theGlobalThis = globalThis;
}

// web 和 React Native 有 self
if (typeof self !== "undefined") {
  theGlobalThis = self;
}
// web 有 window
else if (typeof window !== "undefined") {
  theGlobalThis = window;
}
// node 有 global
else if (typeof global !== "undefined") {
  theGlobalThis = global;
}
// web 中的全局 this
else {
  try {
    theGlobalThis = Function("return this")();
  } catch (_) {
    if (this !== undefined) {
      theGlobalThis = this;
    }
  }
}

export function getGlobalThis(): GlobalType<typeof globalThis> {
  return theGlobalThis!;
}
