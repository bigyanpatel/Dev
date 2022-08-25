const initialState = [
    {
        id :0,
        email: 'bigyan@gmail.com',
        password: 'bigyan',
        firstName :"Bigyan",
        lastName : "Patel",
        designation : "developer",
        date : "2022-08-02",
        gender : "Male",
        phoneNumber : "07978059880",
        address : "At- JNV Campus, Tarbha",
        city : "Sonepur",
        state : "Odisha",
        zipCode : "767016",
        country : "India"
    },
    {
        id :1,
        firstName :"Bigyan",
        lastName : "Patel",
        designation : "developer",
        date : "2022-08-02",
        gender : "Male",
        phoneNumber : "07978059880",
        address : "At- JNV Campus, Tarbha",
        city : "Sonepur",
        state : "Odisha",
        zipCode : "767016",
        country : "India"
    },
    {
        id :2,
        firstName :"Bigyan",
        lastName : "Patel",
        designation : "developer",
        date : "2022-08-02",
        gender : "Male",
        phoneNumber : "07978059880",
        address : "At- JNV Campus, Tarbha",
        city : "Sonepur",
        state : "Odisha",
        zipCode : "767016",
        country : "India"
    },
    {
        id :3,
        firstName :"Bigyan",
        lastName : "Patel",
        designation : "developer",
        date : "2022-08-02",
        gender : "Male",
        phoneNumber : "07978059880",
        address : "At- JNV Campus, Tarbha",
        city : "Sonepur",
        state : "Odisha",
        zipCode : "767016",
        country : "India"
    },
    {
        id :4,
        firstName :"Bigyan",
        lastName : "Patel",
        designation : "developer",
        date : "2022-08-02",
        gender : "Male",
        phoneNumber : "07978059880",
        address : "At- JNV Campus, Tarbha",
        city : "Sonepur",
        state : "Odisha",
        zipCode : "767016",
        country : "India"
    }
];


const employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_EMPLOYEE":
            state = [...state, action.payload];
            return state;
        case "UPDATE_EMPLOYEE":
            const updateState = state.map(employee => employee.id === action.payload.id ? action.payload : employee);
            state = updateState;
            return state;
        case "DELETE_EMPLOYEE":
            const filterEmployee = state.filter(
                (employee) => employee.id !== action.payload && employee);
            state = filterEmployee;
            return state;
        default:
            return state;
    }
}

export default employeeReducer;