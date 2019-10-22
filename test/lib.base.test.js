import C from '../src/index';

let data = {};
beforeAll(() => {
  data.mixins = {
    mixinMethod: function () {}
  };
  data.Obj = class Obj extends C.lib.Base {
    constructor(arg) {
      super();
      this.initFired = true;
      this.initArg = arg;
    }
    toString() {
      return 'ObjToString';
    }
  };
  data.obj = new data.Obj('argValue');
  data.obj.mixIn(data.mixins);
  data.objClone = data.obj.clone();
});

describe('lib-base-test', () => {
  test('testClassInheritance', () => {
    expect(data.Obj.__proto__).toBe(C.lib.Base);
  });

  test('testObjectInheritance', () => {
    expect(data.obj.__proto__.__proto__).toBe(C.lib.Base.prototype);
  });

  test('testToString', () => {
    expect(data.obj.toString()).toBe('ObjToString');
  });

  test('testConstructor', () => {
    expect(data.obj.initFired).toBeTruthy();
    expect(data.obj.initArg).toBe('argValue');
  });

  test('testMixIn', () => {
    expect(data.obj.mixinMethod).toBe(data.mixins.mixinMethod);
  });

  test('testCloneDistinct', () => {
    expect(data.objClone).not.toBe(data.obj);
  });

  test('testCloneCopy', () => {
    expect(data.objClone.initArg).toBe(data.obj.initArg);
  });

  test('testCloneIndependent', () => {
    data.obj.initArg = 'newValue';
    expect(data.objClone.initArg).not.toBe(data.obj.initArg);
  });
});