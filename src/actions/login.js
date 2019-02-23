import {userRef, auth} from '../firebase';

export const createUser = (email,password) => async dispatch => { 
                   
    auth.createUserWithEmailAndPassword(email,password)
    .then(()=>{
        auth.signInWithEmailAndPassword(email,password)
    })
    .then(()=>{
        let curr = auth.currentUser;
        userRef.child(curr.uid).set({
            email:email,
            username:email.split("@")[0],
            uid:curr.uid,
        })        
    }).then(()=>{
        let curr = auth.currentUser;
        dispatch({
            type:'USER-INFO',
            payload:{
                email:email,
                username:email.split("@")[0],
                uid:curr.uid,
            }
        })        
    })
    .then(()=>{
        dispatch({            
            type:'LOGIN',
            payload:true,
        })
    })
    .catch(() =>{
        console.log('create error');
    });
}

export const signInUser = (email,password) => async dispatch => {    
    auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
        userRef.child(auth.currentUser.uid).once("value")
    .then((snap)=>{
        dispatch({            
            type:'USER-INFO',
            payload:snap.val()
        })    
        
    })
    .then(()=>{
        dispatch({
            type:'LOGIN',
            payload:true
        })
    }) 
    }).catch(() =>{
        console.log('Signin error');
    });
}

export const signOutUser = () => async dispatch => {
    auth.signOut().then(()=>{
        dispatch({
            type:'LOGIN',
            payload:false,
        })
        dispatch({
            type:'USER-IFNO',
            payload:{},
        })
    })
    .catch(() =>{
        console.log('Signout Error');
    });
}