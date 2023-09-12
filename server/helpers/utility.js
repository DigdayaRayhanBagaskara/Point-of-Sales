const mappingQueryArrayReturn = async (data) => {
  let parentField = [];
  let finaldata = [];
  let child = [];
  await Promise.all(
    data.map(async (item) => {
      let final = {};
      let attrImport = [];
      let temp = {};

      for (let key in item) {
        let split = key.split(".");
        if (split.length == 1) {
          final[key] = item[key];
        } else {
          if (!parentField.includes(split[0])) {
            parentField.push(split[0]);
          }

          if (!child[split[0]]) {
            child[split[0]] = [];
          }
          child[split[0]][split[1]] = item[key];
        }
        attrImport.push(split);
      }
      if (parentField.length) {
        await Promise.all(
          parentField.map(async (childField, parentFieldIndex) => {
            let childData = Object.assign({}, child[childField]);
            if (!final[childField]) {
              final[childField] = [];
            }
            final[childField].push(childData);

            if (parentField.length == parentFieldIndex + 1)
              finaldata.push(final);
          })
        );
      } else {
        finaldata.push(final);
      }
    })
  );

  return finaldata;
};

module.exports = {
  mappingQueryArrayReturn,
};
