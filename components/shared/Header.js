import Container from "react-bootstrap/Container";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetAuthDetails, reset } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import { ADMIN, STUDENT } from "@/utils/roles";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(
    (state) => state.auth.authDetails?.authenticatedUser
  );

  // Logout Handler
  const onLogout = (e) => {
    localStorage.clear();
    dispatch(resetAuthDetails());
    dispatch(reset());
    router.push("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Link className="navbar-brand" href="/">
          LMS | Trustline
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link className="nav-item nav-link active" href="/">
                Home
              </Link>
            </Nav.Item>
            {user?.role === ADMIN && (
              <>
                <Nav.Item>
                  <Link className="nav-link" href="/admin/courses">
                    Courses
                  </Link>
                </Nav.Item>
              </>
            )}
            {user?.role === STUDENT && (
              <Nav.Item>
                <Link className="nav-link" href="/student/courses">
                  Registered Courses
                </Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="ml-auto">
            {!user && (
              <>
                {" "}
                <Nav.Item>
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" href="/register">
                    Register
                  </Link>
                </Nav.Item>
              </>
            )}
            {user && (
              <>
                <NavDropdown
                  title={`Welcome ${
                    user?.role === ADMIN ? "Admin" : "Student"
                  }`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={onLogout}>
                    <Nav.Item>Logout</Nav.Item>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
