import { types } from "../types/types";
import moment from 'moment'

const initialState = {
    events:  [{
        title: 'cumpleaños del jefe ',
        start: moment().add( 5, 'hours').toDate(),// new Date en moment
        end: moment().add( 6, 'hours').toDate(),
        bgcolor:'#fafafa',
        user : {
          _id: '123',
          name: 'Gerardo'
        }
      }],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
         
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
    
        default:
            return state;
    }

}