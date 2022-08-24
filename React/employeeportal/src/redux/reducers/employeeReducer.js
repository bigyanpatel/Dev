const initialState = [
    {
        id: 0,
        name:"Raman Sharma",
        number:"665123132"
    },
    {
        id: 1,
        name:"test Sharma",
        number:"666563132"
    }
];


const employeeReducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default employeeReducer;