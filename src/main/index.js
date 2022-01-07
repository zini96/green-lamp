import { API_URL } from "../config/constants";
import "antd/dist/antd.min.css";
import "./main.scss"
import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { Carousel } from 'antd';


function MainPage(){
    const [products, setProducts] = useState([]);
    //비주얼 이미지 state로 관리하기
    const [banners, setBanners] = useState([]);
    useEffect(()=>{
        axios.get(`${API_URL}/products/`)
        .then(function(result){
            const products = result.data.product;
            setProducts(products);
            console.log(products);
        }).catch(function(error){
            console.log(error);
        })
        //배너이미지 받기
        axios.get(`${API_URL}/banners/`)
        .then((result)=>{ //서버에서 샌드로 보낸부분이기 때문에
            const banner = result.data.banners;
            //server에 then result res.send와 이름이 일치해야함(banners)
            setBanners(banner);
            console.log(banner)
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])
    
    return(
        <div id="main">
            <Carousel autoplay={true} autoplaySpeed={3000}>
                {banners.map((banner,index)=>{
                    return(
                        <div id="visual" key={index}>
                            <img src={`${API_URL}${banner.imageUrl}`} alt="최신조명"/>
                        </div>
                    );
                })}
            </Carousel>
            <div id="product" className="innerCon">
                <h1>그린 조명's 최신상품</h1>
                <div id="product-list">
                    {
                    products.map(product=>{
                        return(
                            <div className="product-card" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                <div className="imgdiv">
                                    <img className="product-img" src={product.imageUrl} alt="조명"/>
                                </div>
                                <div className="product-contents">
                                    <span>{product.name}</span>
                                    <span>{product.price}원</span>
                                    <div>
                                        <img className="product-avatar" src="images/icons/avatar.png" alt="아이콘"/>
                                        <span>{product.seller}</span>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                    })
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default MainPage; //파일명과 다르게 생성해도 상관없음