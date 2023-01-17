import { EDIT_ID } from "../type";

export default function editIdReducer(state = {}, action) {
    switch (action.type) {
        case EDIT_ID:
            return { ...state, _id: action.payload }
        default:
            return state
    }
}

// let DEFAULT_USER_STATE = {
//     data: {
//         _id: null,
//         email: null,
//         family_name: null,
//         given_name: null,
//         name: null,
//         picture: null,
//         image: null
//     },
//     auth: null
// };

// export default function userReducer(state = DEFAULT_USER_STATE, action) {
//     switch (action.type) {
//         case AUTH_USER:
//             return {
//                 data: {
//                     ...state.data,
//                     ...action.payload.data
//                 },
//                 auth: action.payload.auth
//             }
//         case SIGN_OUT:
//             return {
//                 data: {
//                     _id: null,
//                     email: null,
//                     family_name: null,
//                     given_name: null,
//                     name: null,
//                     picture: null,
//                     image: null
//                 },
//                 auth: null
//             }
//         case IMAGE: {
//             return {
//                 data: {
//                     ...state.data,
//                     image: action.payload
//                 },
//                 auth: state.auth
//             }
//         }
//         default:
//             return state;
//     }
// }

