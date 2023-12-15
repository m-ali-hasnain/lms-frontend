''

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { navigate } from "../utils/navigate";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import Head from "next/head";
import { loginSchema } from "@/schemas";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { authDetails, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async ({ email, password }) => {
      dispatch(login({ email, password }));
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    console.log("authDetails: ", authDetails)
    if (isSuccess || authDetails) {
      navigate(router, authDetails?.authenticatedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authDetails, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
     dispatch(reset());
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message]);

  return (
    <>
      <Head>
        <title>Login | LMS</title>
      </Head>
      <Container>
        <div style={{ marginTop: "25vh" }}></div>
        <Row className="mx-auto">
          <Col lg={6} md={8} sm={10} className="mx-auto">
            <Card className="p-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label >Email <span className="text-danger ml-2">*</span></Form.Label>
                  <Form.Control
                    
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text id="emaiHelpBock"  className="text-danger">
                    {errors.email && touched.email && <>{errors.email}</>}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password <span className="text-danger ml-2">*</span></Form.Label>
                  <Form.Control
                    
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                  <Form.Text id="passwordHelpBlock"  className="text-danger">
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
                    "Login"
                  )}
                </Button>
                <>
                  Don&apos;t have an account.{" "}
                  <Link href="/register">Signup Now</Link>
                </>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
