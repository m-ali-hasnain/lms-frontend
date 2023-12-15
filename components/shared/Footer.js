import Container from "react-bootstrap/Container";
function Footer() {
  return (
    <Container
      fluid
      className="text-white d-flex justify-content-center align-items-center position-fixed bottom-0 bg-dark w-100 p-2"
    >
      <p>&copy; Copyright 2023</p>
    </Container>
  );
}

export default Footer;
