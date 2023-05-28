import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios"


export default function App() {

    axios.defaults.headers.common['Authorization'] = 'nuyTwtCpgWNbJvaNSSgr6jgJ';

    return (
        <BrowserRouter>
            <NavContainer>
                <h1>CINEFLEX</h1> 
            </NavContainer>
            <Routes>
				<Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idfilme" element={<SessionsPage />}/>
                <Route path="/assentos/:idSessao" element={<SeatsPage />}/>
                <Route path="/sucesso" element={<SuccessPage />}/>
			</Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    h1 {
        color: #E8833A;
        font-family: 'Roboto', sans-serif;
        font-size: 34px;
    }
    img {
        position: fixed;
        z-index: 3;
        top: 10px;
        left: 40px;
        width: 50px;
        height: 50px;
    
    }
`
