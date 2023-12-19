"";

import {
  Form,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Head from "next/head";
import { courseSchema } from "@/schemas";
import { createCourse } from "@/features/courses/courseSlice";

const AddCourse = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const isLoading = false;

  const router = useRouter();

  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      name: "",
      credit_hours: 3,
    },
    validationSchema: courseSchema,

    onSubmit: async ({ name, credit_hours }) => {
      dispatch(createCourse({name, credit_hours})).unwrap().then(()=>{
        toast.success("Added Successfully")
        handleClose();
      }).catch((err)=>toast.error(err));
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <Head>
        <title>Add Course | LMS</title>
      </Head>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label>
                Course Name <span className="text-danger ml-2">*</span>
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.name}
                name="name"
                placeholder="Enter course name"
              />
              <Form.Text id="courseNameBlock" className="text-danger">
                {errors.name && touched.name && <>{errors.name}</>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Credit Hours</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.credit_hours}
                name="credit_hours"
                type="number"
                placeholder="Enter Credit Hours"
              />
              <Form.Text id="creditHoursBlock" className="text-danger">
                {errors.credit_hours && touched.credit_hours && (
                  <>{errors.credit_hours}</>
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
                "Add"
              )}
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCourse;
