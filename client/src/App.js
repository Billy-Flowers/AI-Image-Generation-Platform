import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme";
import './index.css';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ChristmasOverlay from "./components/ChristmasOverlay";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-x: hidden;
  transition: all 0.2s ease;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  flex:3;
`;

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/post" element={<CreatePost/>} exact/>
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
        <ChristmasOverlay />
      </Container>
    </ThemeProvider>
  );
}

export default App;
