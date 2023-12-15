import useAuthorization from "@/hooks/useAuthorization";

const Students = () => {
    useAuthorization("1")
    return <p>Admin Students</p>
}
export default Students;