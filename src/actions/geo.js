import {geoRef} from '../firebase'

export const getGeo = (name, navigate) => async dispatch =>{
    geoRef.child(name).on('value',snapshot =>{

        dispatch({
            type:'GET-GEO',
            payload:snapshot.val()
        })
        console.log("navigating")
        navigate('LoginScreen')


    }).then(() => {
        navigate('Home')
    }).catch(err => {
        console.log("get geo fail", err);
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