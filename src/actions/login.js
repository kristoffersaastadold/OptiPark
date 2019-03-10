import {userRef, auth} from '../firebase';

export const fetchUser = () => async dispatch => {
    userRef.child(auth.currentUser.uid).on('value',snapshot=>{
        dispatch({
            type:'USER-INFO',
            payload:snapshot.val()
        })
    })
}


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

export const signInUser = (email,password, navigation) => async dispatch => {    
    auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
        dispatch({
            type:'LOGIN',
            payload:true
        })
    })
    .then(()=>{
        navigation.navigate('Main');
    })
    .catch((err) =>{
        console.log('Signin error',err);
    });
}

export const signOutUser = (navigation) => async dispatch => {
    auth.signOut()
    .then(()=>{
        navigation.navigate('Login');
        dispatch({
            type:'LOGIN',
            payload:false,
        })
        dispatch({
            type:'USER-INFO',
            payload:{},
        })
    })
    .catch(() =>{
        console.log('Signout Error');
    });
}