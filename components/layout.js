import {Header, Footer} from "./shared"
const Layout = ({ children }) => {
    return (
        <>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}

export default Layout