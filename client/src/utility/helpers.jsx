/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */

export const serialize = (obj, prefix) => {
  var str = [],
    p;
  obj = removeEmpty(obj);
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};

export const removeEmpty = (obj) => {
  if (obj) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v != null && v != "")
        .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    );
  } else {
    return obj;
  }
};
