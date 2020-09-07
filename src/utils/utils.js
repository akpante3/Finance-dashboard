import jwtDecode from 'jwt-decode'

export function generateRequestId(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
        return generateRequestId(max) + generateRequestId(n - max);
    }

    max = Math.pow(10, n+add);
    var min = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add); 
}

export function authenticateUser () {
    const token = localStorage.getItem('token')
    return {
      isValid: !!token && Date.now() / 1000 < jwtDecode(token).exp,
      token
    }
}

export function getUserDetails () {
     return {
        firstName: window.localStorage.getItem('first_name') || '',
        lastName: window.localStorage.getItem('last_name') || '',
        role: window.localStorage.getItem('role') || '',
        dept: window.localStorage.getItem('dept') || '',
        id: window.localStorage.getItem('user_id') || '',
        acn: window.localStorage.getItem('acn') || '',
     }
}

export function queryList(routeObject, pageObject){ 
    let query = {};
    if(typeof pageObject.pageLimit !== 'undefined'){ 
        query.limit = pageObject.pageLimit
    }
    if(typeof pageObject.paginationNumber !== 'undefined'){
        query.page = pageObject.paginationNumber
     }
     if(typeof pageObject.from !== 'undefined'){ 
        query.from = pageObject.from
    }
    if(typeof pageObject.to !== 'undefined'){
        query.to = pageObject.to
     }
    if(typeof pageObject.status !== 'undefined'){
        query.status = pageObject.status
    }
    if(typeof pageObject.expense_code !== 'undefined'){
        query.expense_code = pageObject.expense_code
    }
    return query
}

export function serialize(obj) {
    let str = [];
    for (let p in obj)
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}