import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import RequireApiKey from "./routes/RequireApiKey";
import { Setup } from "./pages/Setup";
import "./App.css";

const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
        font-family: monospace, sans-serif;
    }
    * {
        box-sizing: border-box;
    }
    :root {
        font-size: 16px;
    }
`;

const Wrapper = styled.div`
    background: #2d2e2f;
    color: white;
    height: 100vh;
`;

export const App = () => {
    return (
        <BrowserRouter>
            <Wrapper>
                <GlobalStyle />
                <div>Hello World</div>
                <Routes>
                    <Route path="/setup" element={<Setup />} />
                    <Route
                        path="/"
                        element={
                            <RequireApiKey>
                                <Home />
                            </RequireApiKey>
                        }
                    />
                </Routes>
            </Wrapper>
        </BrowserRouter>
    );
};
