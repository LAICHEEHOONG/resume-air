import * as editId from './index';

export const getEditId = (id) => {
    return async (dispatch) => {
        dispatch(editId.getEditId(id));
    }
}

// export const homeTitle = (title) => {
//     return async (dispatch) => {
//         dispatch(page.homeTitle(title));
//     }
// }