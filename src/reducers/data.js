
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
    case 'CURRENT-USER':
      return {
        ...state,
        currUser:action.payload[0],
        login:action.payload[1]
      };
    case 'GET-GEO':
      return{
        ...state,
        geometry:action.payload.geometry,
        help_nodes:action.payload.help_nodes,
        sensors:action.payload.sensors,

      }
    default:
      return state;
  }
};