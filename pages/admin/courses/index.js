import Table from "@/components/shared/Table";
import useAuthorization from "@/hooks/useAuthorization";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import AddCourse from "@/components/admin/addCourse";
import { deleteCourse, getCourses } from "@/features/courses/courseSlice";
import { useRouter } from "next/router";

const Courses = () => {
  useAuthorization(1);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.admin.courses);
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
        id: "edit",
        header: "Edit",
        cell: (info) => (
          <Button variant="warning" onClick={()=>router.push(`/admin/courses/${info.row.original.id}`)}>
            <PencilSquare />
          </Button>
        ),
        footer: "Edit",
      },
      {
        id: "delete",
        header: "Delete",
        cell: (info) => (
          <Button
            variant="danger"
            onClick={(e) => {
              dispatch(deleteCourse(info.row.original.id));
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
    dispatch(getCourses());
  }, []);

  return (
    <div className="container my-2">
      <div>
        <Button variant="warning mb-2" onClick={handleClose}>
          Create Course
        </Button>
      </div>
      {showModal && <AddCourse show={showModal} handleClose={handleClose} />}

      <Table columns={columns} data={courses} />
    </div>
  );
};



export default Courses;
