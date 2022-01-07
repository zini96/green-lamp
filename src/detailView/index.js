import { API_URL } from "../config/constants";
import axios from "axios";
import {useEffect,useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import './detail.scss';

function ProductView(){
    const navigate = useNavigate();
    const [product,setProduct] = useState(null);
    const param = useParams();
    const {id} = param;
    useEffect(()=>{
        axios.get(
            `${API_URL}/products/${id}`
        ).then(function(result){
            setProduct(result.data.product);
            console.log(result.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])
    const productDel =()=>{
        axios.delete(`${API_URL}/products/${id}`)
        .then(function(result){
            console.log("삭제되었습니다")
            navigate(-1);
        })
        .catch(function(error){
            console.error(error)
        })
    }
    if(product == null){
        return <div>상품정보를 받고있습니다...</div>
    }
    return(
        <div className="innerCon" id="detail">
            <h1>{product.name}</h1>
            <div id="image-box">
                <img src={product.imageUrl} alt="" className="P_img"/>
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt=""/>
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div>제품명: {product.name}</div>
                <div>가격: {product.price}원</div>
                <div>등록일자:{product.createdAt}</div>
                <div>제품상세: {product.description}</div>
            </div>
            <div className="btn">
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    )
}
export default ProductView;