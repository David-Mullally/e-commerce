export const changeCategory = (
  e,
  categories,
  setAttributesFromDb,
  setCategoryChosen
) => {
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find(
    (cat) => cat.name === highLevelCategory
  );
  if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
    setAttributesFromDb(highLevelCategoryAllData.attrs);
  } else {
    setAttributesFromDb([]);
  }
  setCategoryChosen(e.target.value);
};

export const setValuesForAttrFromDbSelectForm = (
  e,
  attrVal,
  attributesFromDb
) => {
  if (e.target.value !== "Choose Attribute") {
    var selectedAttr = attributesFromDb.find(
      (item) => item.key === e.target.value
    );
    let valuesForAttrKeys = attrVal.current;
    if (selectedAttr && selectedAttr.value.length > 0) {
      while (valuesForAttrKeys.options.length) {
        valuesForAttrKeys.remove(0);
      }
      valuesForAttrKeys.options.add(new Option("Choose Attribute Value"));
      selectedAttr.value.map((item) => {
        valuesForAttrKeys.add(new Option(item));
        return "";
      });
    }
  }
};
