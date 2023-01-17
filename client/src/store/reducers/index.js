import {combineReducers} from 'redux';
import users from './users_reducer';
import page from './page_reducer';
import editId from './edit_id_reducer';

const appReducers = combineReducers({
    users,
    page,
    editId
});

export default appReducers;