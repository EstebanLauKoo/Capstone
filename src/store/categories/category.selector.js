import {createSelector} from "reselect";

// reselect allows us to use memoization or cache

const selectCategoryReducer = (state) => state.categories;

//checks if the categories is equal then it won't run
export const selectCategories = createSelector(
    // selectors is the one being cached
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items;
        return acc
    }, {})
);
