import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login";
import Footer from "./Shared/Footer/Footer";
import Header from "./Shared/Header/Header";
import Loading from "./Shared/Loading/Loading";
import NotFound from "./Shared/NotFound/NotFound";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from "./Shared/SideBar/SideBar";
import SkuList from "./Pages/SkuList/SkuList";
import OwnPartList from "./Pages/OwnPartList/OwnPartList";
import ThirdPartyBOM from "./Pages/ThirdPartyBOM/ThirdPartyBOM";
import ThirdPartyBOMSearch from "./Pages/ThirdPartyBOM/ThirdPartyBOMSearch";
import EditThirdPartyBom from "./Pages/EditThirdPartyBom/EditThirdPartyBom";
import RequireAuth from "./Shared/RequireAuth/RequireAuth";
import Users from "./Pages/Users/Users";
import Parts from "./Pages/Parts/Parts";

const border = {border: "1px solid blue", minHeight:"80vh"}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Container fluid>
        <Row md={12}>
          <Col lg={1} style={border}><SideBar /></Col>
          <Col style={border}>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/parts" element={<Parts></Parts>} />
              <Route path="/loading" element={<Loading></Loading>} />
              <Route path="/skuList" element={<SkuList />} />
              <Route path="/ownPartList" element={<OwnPartList />} />
              <Route path="/thirdPartyBom" element={<ThirdPartyBOM />} />
              <Route path="/thirdPartyBomSearch" element={<ThirdPartyBOMSearch />} />
              <Route path="/editThirdPartyBom" element={
                <RequireAuth>
                  <EditThirdPartyBom />
                </RequireAuth>} />
              <Route path="*" element={<NotFound></NotFound>} />
            </Routes>
          </Col>
          <Col lg={1} style={border}>second side bar</Col>
        </Row>
        <Row><Footer></Footer></Row>
      </Container>
      
      
    </div>
  );
}

export default App;
