import {geoRef} from '../firebase';

export const getGeo = () => dispatch =>{
    geoRef.on('value',snapshot =>{
        dispatch({
            type:'GET-GEO',
            payload:snapshot.val()
        })
    })
}