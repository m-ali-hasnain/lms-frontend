import useAuthorization from "@/hooks/useAuthorization";

const Courses = () => {
    useAuthorization("1")
    return <p>Admin Courses</p>
}

export default Courses;