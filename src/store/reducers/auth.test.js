import reducer from './auth';


describe('auth reducer', () => {
    it('should run the initial state', () =>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            error: null,
            userId: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});

