import { getCourse } from "@/features/courses/courseSlice";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Container } from "react-bootstrap";
import Image from "next/image";
import Table from "@/components/shared/Table";

const CourseDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const courseDetails = useSelector((state) => state.admin.course);
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "email",
        id: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
    ];
  }, []);

  const { id } = router.query;
  useEffect(() => {
    dispatch(getCourse({ id }));
  }, []);
  return (
    <Container className="my-2 d-flex align-items-center justify-content-center">
      <Card style={{ width: "100%", overflow: "auto" }}>
        <Card.Img src="https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Card.Img>
        <Card.Body>
          <Card.Title>Course Details</Card.Title>
          {courseDetails ? (
            <>
              <Card.Text>
                Name: <Badge>{courseDetails?.course?.name}</Badge>
                <br />
                Credit Hours:{" "}
                <Badge>{courseDetails?.course?.credit_hours}</Badge>
              </Card.Text>
              {courseDetails?.students?.length > 0 && (
                <>
                  {" "}
                  <p>Registered Students</p>
                  <Table columns={columns} data={courseDetails?.students} />
                </>
              )}
            </>
          ) : (
            "Loading..."
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
export default CourseDetails;
