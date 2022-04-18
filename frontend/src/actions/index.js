export const selectHotel = (hotel) => {
    return {
        type: 'SELECT_HOTEL',
        payload: hotel
    }
}

export const selectRoom = (room) => {
    return {
        type: 'SELECT_ROOM',
        payload: room
    }
}