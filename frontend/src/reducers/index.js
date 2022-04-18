const initialState = {
    hotelID: '',
    startDate: null,
    endDate: null,
    numGuests: 0,
    room: {
        name: '',
        price: 0
    }
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SELECT_HOTEL':
            return {
                ...state,
                hotelID: action.payload.hotelID,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                numGuests: action.payload.numGuests
            }
        case 'SELECT_ROOM':
            return {
                ...state,
                room: action.payload
            }
        default:
            return state
    }
}

export default rootReducer