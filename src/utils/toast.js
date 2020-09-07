
function green( message ) {
    return window.iziToast.show({
      message: '<div class="alert"><div class="alert__icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 26 26"><defs><path id="alert" d="M13 3C7.486 3 3 7.486 3 13s4.486 10 10 10 10-4.486 10-10S18.514 3 13 3m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m2.293-10.707L12 13.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414l2 2a.997.997 0 0 0 1.414 0l4-4a.999.999 0 1 0-1.414-1.414"/></defs><g fill="none" fill-rule="evenodd"><circle cx="13" cy="13" r="13" fill="#BBE5B3"/><circle cx="13" cy="13" r="9" fill="#FFF"/><use fill="#108043" xlink:href="#alert"/></g></svg></div><div class="alert__text">' 
        + message + 
        '</div></div>',
      position: 'topRight',
      color: 'green',
      progressBar: false,
    });
  }
  
  function red( message ) {
    return window.iziToast.show({
      message: '<div class="alert"><div class="alert__icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><g fill="none" fill-rule="evenodd"><circle cx="13" cy="13" r="13" fill="#FDAC9A"/><g transform="translate(3 3)"><circle cx="10" cy="10" r="9" fill="#FFF"/><path fill="#BF0711" d="M2 10c0-1.846.635-3.543 1.688-4.897l11.209 11.209A7.954 7.954 0 0 1 10 18c-4.411 0-8-3.589-8-8m14.312 4.897L5.103 3.688A7.954 7.954 0 0 1 10 2c4.411 0 8 3.589 8 8a7.952 7.952 0 0 1-1.688 4.897M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10S15.514 0 10 0 0 4.486 0 10"/></g></g></svg></div><div class="alert__text">' 
        + message + 
        '</div></div>',
      position: 'topRight',
      color: 'red',
      progressBar: false,
    });
  }
  
  const toast = {
    green,
    red,
  }
  
  export default toast;