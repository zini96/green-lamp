import MainPage from './main';
import Header from './include/Header';
import Footer from './include/Footer';
import ProductView from './detailView/index'
import {Route, Routes} from "react-router-dom";
import UploadPage from './upload';
import './App.css';

function App() {
  return (
    <div className="App" id="wrap">
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/products/:id" element={<ProductView/>}/>
        <Route path="/upload" element={<UploadPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
