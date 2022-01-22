import * as actionTypes from './../actions/playlistActionTypes';

 const currentMiddleware = (store) => (next) => (action) => {
    const acType = action.type;
    if(acType == actionTypes.SHUFFLE || acType == actionTypes.TOTOP) {
        const current = store.getStore().mixer.current;
        action.payload.current = current;
        next(action);
    }
}

// const playNow = (next, ajaxAction) => {
//     next({
//         type: `${ajaxAction.type}_START`
//     })
//     return fetch(ajaxAction.url, { method: ajaxAction.method })
//         .then((response) => {
//             return response.json()
//         }).then((data) => {
//             next({
//                 type: `${ajaxAction.type}_SUCCESS`,
//                 data: data
//             })
//         })
// }

export default currentMiddleware;