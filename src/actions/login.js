import { userRef, auth } from '../firebase';

export const fetchUser = () => dispatch => {
    userRef.child(auth.currentUser.uid).on('value', snapshot => {
        console.log("FETCH USER ACTION");
        console.log(snapshot.val())
        dispatch({
            type: 'USER-INFO',
            payload: snapshot.val()
        })
    }
    )
}


export const createUser = (email, password, licencePlate,  navigation) => async dispatch => {
    console.log("TRying to create user")
    dispatch({
        type: 'START-REGISTER'
    });
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.signInWithEmailAndPassword(email, password)
        })
        .then(() => {
            let curr = auth.currentUser;
            userRef.child(curr.uid).set({
                email: email,
                username: email.split("@")[0],
                uid: curr.uid,
                licencePlate: licencePlate,
            })
        }).then(() => {
            let curr = auth.currentUser;
            dispatch({
                type: 'USER-INFO',
                payload: {
                    email: email,
                    username: email.split("@")[0],
                    uid: curr.uid,
                    licencePlate: licencePlate,
                }
            })
            dispatch({
                type: 'START-REGISTER',
                payload: false,
            });
            navigation.navigate('Home')
        })
        .then(() => {
            dispatch({
                type: 'LOGIN',
                payload: true,
            })
        })
        .catch((err) => {
            dispatch({ type: 'REGISTER_ERROR', err });
            dispatch({ type: 'REGISTER_ERROR_STOP' });
            
        });
}

export const signInUser = (email, password, navigation) => async dispatch => {
    dispatch({
        type: 'START-LOGIN',
        payload: true,
    });
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({
                type: 'LOGIN',
                payload: true
            })
            dispatch({
                type: 'START-LOGIN',
                payload: false
            })
        }).then(() => {
            navigation.navigate('Home')
        })
        .catch((err) => {
            console.log('Signin error');
            dispatch({ type: 'LOGIN_ERROR', err });
        });
}

export const signOutUser = () => async dispatch => {
    auth.signOut().then(() => {
        dispatch({
            type: 'LOGIN',
            payload: false,
        })
        dispatch({
            type: 'USER-IFNO',
            payload: {},
        })
    })
        .catch(() => {
            console.log('Signout Error');
        });
}

