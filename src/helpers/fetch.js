const baseUrl = process.env.REACT_APP_URL;

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${baseUrl}/${endpoint}`;
   
    if ( method === 'GET' ) {
        return fetch( url );
      } else {
          return fetch( url, {
              method,
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify( data )
          } )
      }

}


const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || ' '; // String vacio si no devuelve nada
   
  
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {  
                'Content-type': 'application/json',
                'x-token': token 
            }
        });
      } else {
          return fetch( url, {
              method,
              headers: {
                'Content-type': 'application/json',
                'x-token': token // x-token asi se decidio el nombre en el Backend
              },
              body: JSON.stringify( data )
          } )
      }

}

export {
    fetchSinToken,   
    fetchConToken   
}