import {ADMIN, STUDENT} from './roles'
const navigate = (router, authDetails) => {
    console.log("auth details", authDetails)
   
    if (authDetails?.role === ADMIN) {
        router.replace('/admin/courses')
    } else if (authDetails?.role === STUDENT) {
        router.replace('/student/courses')
    } else {
        router.replace('/login')
    }
}

export {navigate}