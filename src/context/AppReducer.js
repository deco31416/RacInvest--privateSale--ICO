export const AppReducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_ACCOUNT':
            return {
                ...state,
                account: null
            }
        case 'ADD_ACCOUNT':
            return {
                ...state,
                account: action.payload
            }

        case 'UPDATE_BNB_BALANCE':
            return {
                ...state,
                bnbBalance: action.payload
            }
        
        case 'UPDATE_TOKEN_BALANCE':
            return {
                ...state,
                tokenBalance: action.payload
            }

        case 'UPDATE_ICO_RATE':
            return {
                ...state,
                rate: action.payload
            }

        case 'UPDATE_PROVIDER':
            return {
                ...state,
                provider: action.payload
            }
        default:
            return state;
    };
}