let common = {
  getArrayObject(keyval, keyname, list) {
    let result = {};
    list.forEach((element, index) => {
      if (element[keyname] == keyval) {
        result = element;
      }
    });
    return result;
  }
};
export default common;
