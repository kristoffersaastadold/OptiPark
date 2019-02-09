import {userRef, auth, geoRef} from '../firebase';

export const bookSpotToUser = (spot, index) => async dispatch=>{
    userRef.child(auth.currentUser.uid).child("booked").push().set(spot)
    .then(()=>{
        geoRef.child("features").child(index).child(index).child("properties").child("status").set(1)
    }).catch(()=>{console.log("booked spot error");})
}

export const releaseSpotFromUser = (index) => async dispatch =>{
    userRef.child(auth.currentUser.uid).child("booked").child(index).remove()
    .then(()=>{
        geoRef.child("features").child(index).child("properties").child("status").set(0)
    }).catch(()=>{console.log("release spot error");})
}