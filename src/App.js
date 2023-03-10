import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/note/:id/edit" element={<Layout><handleEditNote /></Layout>} />
        <Route path="/note/:id" element={<Layout><Main /></Layout>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
