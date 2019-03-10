
let defaultState = {
  login:false,
}

export default (state = {defaultState}, action) => {

  switch(action.type) {
    
    case 'USER-INFO':   
      return {
        ...state,
        userInfo:action.payload
      };
    case 'LOGIN':            
      return {
        ...state,
        login:action.payload
      };
    case 'GET-GEO':
      return{
        ...state,
        json:action.payload,
        entrance:action.payload.entrance,
        corners:action.payload.corners,
        support:action.payload.support,
        sensors:action.payload.sensors,

      }
    default:
      return defaultState;
  }
};