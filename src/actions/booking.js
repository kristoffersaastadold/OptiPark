import {userRef, auth, geoRef} from '../firebase';

export const changeSpotStatus = () => async dispatch => {
    userRef.child(auth.currentUser.uid).child("booked").on("value",snap=>{
        if (snap.val()!=null) {
            let bookings = Object.keys(snap.val());        
            bookings.forEach((key,index) => {
                let date = snap.val()[key].date.split(" ")[0].split(".");
                let temp = date[0];
                date[0] = date[1];
                date[1] = temp;            
                let string = "";
                date.forEach((key,index)=>{
                    string+=date[index]+"/";
                })
                string+=snap.val()[key].date.split(" ")[1] + "";
                        
                if (new Date(string).getTime()<new Date().getTime()) {
                    console.log();
                    
                    geoRef.child("sensors").child(snap.val()[key].spot).child("properties").child("status").set(1)
                }
            });
        }
    })
}

export const bookSpotToUser = (booking) => async dispatch=>{
    
    userRef.child(auth.currentUser.uid).child("booked").push().set(booking)
    .then(()=>{
        userRef.child(auth.currentUser.uid).once("value")
        .then((snap)=>{
            dispatch({
                type:'USER-INFO',
                payload:snap.val(),
            })
        })
    })
    .catch(()=>{console.log("booked spot error");})
}

export const releaseSpotFromUser = (bookedId,spotId) => async dispatch =>{
    userRef.child(auth.currentUser.uid).child("booked").child(bookedId).remove()
    .then(()=>{
        geoRef.child("sensors").child(spotId).child("properties").child("status").set(0)
    })
    .then(()=>{
        userRef.child(auth.currentUser.uid).once("value")
        .then((snap)=>{
            dispatch({
                type:'USER-INFO',
                payload:snap.val(),
            })
        })
    })
    .catch(()=>{console.log("release spot error");})
}