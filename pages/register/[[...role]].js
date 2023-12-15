"use client";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import Head from "next/head";
import { registerSchema } from "@/schemas";

const Register = ({ userRole }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,

    onSubmit: async ({ email, password }) => {
      const promise = dispatch(register({ email, password, role: userRole }));
      promise
        .unwrap()
        .then(() => {
          toast.success("Successfully Registered! "), dispatch(reset());
          router.push("/login");
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <Head>
        <title>Register | LMS</title>
      </Head>
      <Container>
        <div style={{ marginTop: "25vh" }}></div>
        <Row className="mx-auto">
          <Col lg={6} md={8} sm={10} className="mx-auto">
            <Card className="p-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>
                    Email <span className="text-danger ml-2">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text id="emaiHelpBock" className="text-danger">
                    {errors.email && touched.email && <>{errors.email}</>}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>
                    Password <span className="text-danger ml-2">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                  <Form.Text id="passwordHelpBlock" className="text-danger">
                    {errors.password && touched.password && (
                      <>{errors.password}</>
                    )}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading | isSuccess}
                  className="mb-2"
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
                <div className="d-flex justify-content-between align-items-center">
                  <p>
                    Already have an account <Link href="/login">Login</Link>
                  </p>
                  <p>|</p>
                  <p>
                    Register as <Link href="/register/admin">Admin</Link>
                  </p>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { role: ["admin"] } }, { params: { role: [] } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { role } = params;
  const userRole = role && role[0] === "admin" ? 1 : 2;
  return {
    props: {
      userRole,
    },
  };
}

export default Register;
