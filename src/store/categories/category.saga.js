import {takeLatest, all, call, put} from 'redux-saga/effects'

import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailed, fetchCategoriesSuccess} from "./category.action";
import CATEGORIES_ACTION_TYPES from "./category.types";


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray))
/*        dispatch(fetchCategoriesSuccess(categoriesArray));*/
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
/*        dispatch(fetchCategoriesFailed(error));*/
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // this runs everything inside runs the whole array
    yield all([call(onFetchCategories)])
}