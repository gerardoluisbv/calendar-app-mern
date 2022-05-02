import { types } from "../types/types";
import moment from 'moment'

const initialState = {
    events:  [{
        id: new Date().getTime(),
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
        
            case types.eventAddNew:
                return {
                    ...state,
                    events: [...state.events, action.payload]

                }

            case types.eventClearActive:
                return {
                    ...state,
                    activeEvent: null
                }  
            
            case types.eventUpdated:
                return {
                    ...state,
                    events: state.events.map(
                        e => ( e.id === action.payload.id ) ? action.payload : e
                    )
                } 
            case types.eventDeleted:
                return {
                    ...state,
                    events: state.events.filter(
                        e => ( e.id !== state.activeEvent.id )
                    ),
                    activeEvent: null
                }         
    
        default:
            return state;
    }

}