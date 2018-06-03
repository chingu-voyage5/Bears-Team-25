import * as actionTypes from './actions';
import initialState from "../store/initialStore";

const reducer=(state=initialState,action)=>{

	switch(action.type){
		case actionTypes.CREATE_APPLET:
			return{

			}
		case actionTypes.OFF_APPLET:
			return{

			}
		case actionTypes.ON_APPLET:
			return{

			}
		case actionTypes.SHOW_APPLET:
			return{
				
			}
	}

};

export default reducer;