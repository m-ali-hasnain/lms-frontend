import Table from "@/components/shared/Table";
import useAuthorization from "@/hooks/useAuthorization";
import {  Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import RegisterCourse from "@/components/student/registerCourse";
import { getRegisteredCourses, removeFromRegisteredCourses } from "@/features/courses/courseSlice";
import { useRouter } from "next/router";

const Courses = () => {
  useAuthorization(2);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.authDetails.authenticatedUser)
  const courses = useSelector((state) => state.admin.registeredCourses);
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        id: "name",
        header: "Course Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "credit_hours",
        id: "credit_hours",
        header: "Credit Hours",
        cell: (info) => info.getValue(),
      },
      {
        id: "delete",
        header: "Delete",
        cell: (info) => (
          <Button
            variant="danger"
            onClick={(e) => {
              dispatch(removeFromRegisteredCourses({id: user?.id, courseId: info.row.original.id}));
            }}
          >
            <Trash />
          </Button>
        ),
        footer: "Delete",
      },
    ];
  }, []);
  
  // Create Course Modal Handler
  const handleClose = () => {
    setShowModal(!showModal);
  };
  
//   Fetch Courses for admin
  useEffect(() => {
    dispatch(getRegisteredCourses({id: user?.id}));
  }, []);

  return (
    <div className="container my-2">
      <div>
        <Button variant="warning mb-2" onClick={handleClose}>
          Register Course
        </Button>
      </div>
      {showModal && <RegisterCourse show={showModal} handleClose={handleClose} />}

      <Table columns={columns} data={courses} />
    </div>
  );
};



export default Courses;
