import useAuthorization from "@/hooks/useAuthorization";

const Courses = () => {
    useAuthorization("2")
    return <p>Student Courses</p>
}
export default Courses;