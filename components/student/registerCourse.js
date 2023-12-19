"";

import { Form, Button, Spinner, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Head from "next/head";
import { registerCourseSchema } from "@/schemas";
import { registerCourse } from "@/features/courses/courseSlice";

const RegisterCourse = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const user = useSelector((state) => state.auth.authDetails.authenticatedUser);
  const courses = useSelector((state)=>state.admin.courses);
  const router = useRouter();

  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      user: user.id,
      course: 0,
    },
    validationSchema: registerCourseSchema,

    onSubmit: async ({ user, course }) => {
      console.log(course)
      dispatch(registerCourse({ user, course: Number.parseInt(course, 10)  }))
        .unwrap()
        .then(() => {
          toast.success("Registered Successfully");
          handleClose();
        })
        .catch((err) => toast.error(err));
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <Head>
        <title>Register Course | LMS</title>
      </Head>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {console.log(errors)}
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Choose Course</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>formik.setFieldValue('course', e.target.value)} value={values.course}>
                <option>Open this select menu</option>
                {courses?.map((c)=><option value={c.id}>{c.name}</option>)}
              </Form.Select>
              <Form.Text id="courseHelpBlock" className="text-danger">
                {errors.course && touched.course && (
                  <>{errors.course}</>
                )}
              </Form.Text>
            </Form.Group>

            <div className="text-center">
              <Button
                variant="secondary"
                type="submit"
                className="mb-2 text-center"
              >
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterCourse;
