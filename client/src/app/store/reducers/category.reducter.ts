import {
  CategoryAction,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAIL,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUB_CATEGORY
} from '../actions/category.action';
import { Category } from 'src/app/models/category';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  currentCategory: Category;
  currentSubCategory: Category;
  error?: any;
}

export const initialState: CategoryState = {
  categories: null,
  currentCategory: null,
  currentSubCategory: null,
  loading: false
};

export function reducer(
  state = initialState,
  action: CategoryAction
): CategoryState {
  state.error = null;
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    }
    case LOAD_CATEGORIES_FAIL: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload
      };
    }
    case SET_CURRENT_SUB_CATEGORY: {
      return {
        ...state,
        currentSubCategory: action.payload
      };
    }

    default:
      return state;
  }
}

export const getCategories = (state: CategoryState) => state.categories;
