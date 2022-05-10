import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./events";



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        
       // console.log(body);

        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login ({
                uid: body.uid,
                name: body.name    
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error' );
        }
    }    
}


export const startRegister =  (  name, email, password ) => {
    return async ( dispatch ) => {

       console.log( name, email, password );

       const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' );
       const body = await resp.json();

        
       
       if ( body.ok ) {
       
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login ({
                uid: body.uid,
                name: body.name    
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error' );
        }

        }
}


export const startChecking = () => {  // 372 Mantener el estado de la aplicacion
    return async ( dispatch ) => {
       
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();
         
        //console.log('start checking');
        
        if ( body.ok ) {
        
             localStorage.setItem('token', body.token);
             localStorage.setItem('token-init-date', new Date().getTime() );
 
             dispatch( login ({
                 uid: body.uid,
                 name: body.name    
             }) );
         } else {
             dispatch(checkingFinish()); // reset boolean in state auth
         }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
        dispatch( eventLogout() );

    }
}

const logout = () => {
    return {
        type:types.authLogout
    }
}
