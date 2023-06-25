import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};

export const saveAttributeToCatDoc =
  (key, value, categoryChosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", {
      key,
      value,
      categoryChosen,
    });
    if (data.categoryUpdated) {
      dispatch({
        type: actionTypes.SAVE_ATTR,
        payload: [...data.categoryUpdated],
      });
    }
  };

export const newCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getcategories.categories;
  const { data } = axios.post("/api/categories", { category });
  if (data.categoryCreated) {
    dispatch({
      type: actionTypes.INSERT_CATEGORY,
      payload: [...cat, data.categoryCreated]
    })
  }
};
