import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: 898907316,
    title: `My wife's birthday`,
    notes: 'Buy the cake',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent,
        ],
        activeEvent: null
    },
    reducers: {
       onSetActiveEvent: ( state, { payload } ) => {
                state.activeEvent = payload;
       }, 
       onAddNewEvent: ( state, { payload }) => {
              state.events.push( payload );
              state.activeEvent = null;
       },
       onUpdateEvent: ( state, { payload }) => {
              state.events = state.events.map( event => {
                if( event._id === payload._id){
                  return payload;
                }

                return event;
              })
       },
       onDeletEvent: ( state ) => {
        if( state.activeEvent ){
          state.events = state.events.filter( event => event._id !== state.activeEvent._id );
          state.activeEvent = null;
        }
       }
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeletEvent } = calendarSlice.actions;