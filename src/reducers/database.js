
let defaultState = {
  //from auth
  currUser:{},
  //from rtdb
  userInfo:{
    username:"krisaa",
    email:"k@123.no",
    uid:"123455"
  },
  geometry:{},
  sensors:{},
  help_nodes:{},
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
        geometry:action.payload.geometry,
        help_nodes:action.payload.help_nodes,
        sensors:action.payload.sensors,

      }
    default:
      return defaultState;
  }
};