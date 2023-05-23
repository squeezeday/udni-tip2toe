/* eslint-disable */
export default function deepCopyObj(obj: any): any {
  if (null == obj || 'object' != typeof obj) return obj;
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopyObj(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    const copy = {};
    for (const attr in obj) {
      // @ts-ignore
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopyObj(obj[attr]);
    }
    return copy;
  }
  throw new Error('Unable to copy obj this object.');
}
