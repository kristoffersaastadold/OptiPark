import {geoRef} from '../firebase';

export const getGeo = (name) => async dispatch =>{
    geoRef.child(name).on('value',snapshot =>{
        dispatch({
            type:'GET-GEO',
            payload:snapshot.val()
        })
    })
}

export const writeGeo = (json,name) =>{
    geoRef.child(name).set(json);
}

export const assignSpot = (path, spot) => dispatch => {
    dispatch({
        type:'ASSIGN-SPOT',
        payload: {
            spot:spot,
            path:path,
        }
    })
}