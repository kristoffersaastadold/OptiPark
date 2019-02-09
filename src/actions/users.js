import {userRef, auth} from '../firebase';

export const selectSpot = (spotid) => dispatch=>{
    dispatch({
        type:'SET-SELECTED',
        payload:spotid,
    })
}

// ADD INFO TO RTDB
export const addCarToUser = (car) => async dispatch =>{        
    userRef.child(auth.currentUser.uid).child("cars").push().set(car)
    .then(()=>{
        userRef.child(auth.currentUser.uid).once("value")
    .then((snap)=>{
        dispatch({
            type:'USER-INFO',
            payload:snap.val(),
        })
    })
    }).catch(()=>{console.log("error adding car");})
}

export const addHistory = (history) => dispatch =>{
    userRef.child(auth.currentUser.uid).child("history").push().set(history)
    .then(()=>{
        userRef.child(auth.currentUser.uid).once("value")
    }).then((snap)=>{
        dispatch({
            type:'USER-INFO',
            payload: snap.val(),
        })
    })
}