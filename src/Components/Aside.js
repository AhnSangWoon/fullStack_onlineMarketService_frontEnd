import styled from "styled-components";
import './Aside.css'
import femail_clothes from "../data/femail_clothes";
import mail_clothes from "../data/mail_clothes";
import shoes from "../data/shoes";
import bag from "../data/bag";
import jewelry_watch from "../data/jewelry_watch";
import fashion_accessories from "../data/fashion_accessories";
import digital_home_electronics from "../data/digital_home_electronics";
import sports_leisure from "../data/sports_leisure";
import vehicle_motorcycle from "../data/vehicle_motorcycle";
import merchandise from "../data/merchandise";
import Kidult from "../data/Kidult";
import art_collection_rare from "../data/art_collection_rare";
import record_album_instrument from "../data/record_album_instrument";
import office_supplies_book_ticket from "../data/office_supplies_book_ticket";
import beauty from "../data/beauty";
import furniture_interior_design from "../data/furniture_interior_design";
import daily_necessity_Kitchen_appliances from "../data/daily_necessity_Kitchen_appliances";
import infant_maternity_supplies from "../data/infant_maternity_supplies";
import tools from "../data/tools";
import pet_equipment from "../data/pet_equipment";
import free from "../data/free";
import food from "../data/food";
import etc from "../data/etc";
import local_service from "../data/local_service";
import roommate from "../data/roommate";
import job from "../data/job";
import talent from "../data/talent";


const Aside = ({ categories, onClickCateogry }) => {
  let type = null
  const onSetCategory = (category) =>{

    
    console.log(category);
    if (category == "여성의류") {
      type = femail_clothes;
    } else if (category === "남성의류") {
      type = mail_clothes;
    }else if (category === "신발") {
      type = shoes;
    } else if (category === "가방") {
      type = bag;
    } else if (category === "시계/쥬얼리") {
      type = jewelry_watch;
    } else if (category === "패션 액세서리") {
      type = fashion_accessories;
    } else if (category === "디지털/가전") {
      type = digital_home_electronics;
    } else if (category === "스포츠.레저") {
      type = sports_leisure;
    } else if (category === "차량/오토바이") {
      type = vehicle_motorcycle;
    } else if (category === "스타굿즈") {
      type = merchandise;
    } else if (category === "키덜트") {
      type = Kidult;
    } else if (category === "예술/희귀/수집품") {
      type = art_collection_rare;
    } else if (category === "음반/악기") {
      type = record_album_instrument;
    } else if (category === "도서/티켓/문구") {
      type = office_supplies_book_ticket;
    } else if (category === "뷰티/미용") {
      type = beauty;
    } else if (category === "가구/인테리어") {
      type = furniture_interior_design;
    } else if (category === "생활/주방용품") {
      type = daily_necessity_Kitchen_appliances;
    } else if (category === "식품") {
      type = food;
    } else if (category === "유아동/출산") {
      type = infant_maternity_supplies;
    } else if (category === "공구/산업용품") {
      type = tools;
    } else if (category === "반려동물용품") {
      type = pet_equipment;
    } else if (category === "무료나눔") {
      type = free;
    } else if (category === "기타") {
      type = etc;
    } else if (category === "지역 서비스") {
      type = local_service;
    } else if (category === "재능") {
      type = talent;
    } else if (category === "원룸/함께살아요") {
      type = roommate;
    } else if (category === "구인구직") {
      type = job;
    }
    else{
      type = [];
    }

    return type;
  };



  return (
    <Wrapper className="nav">
      <ul className="nav__menu">
        <p>
          <b>전체 카테고리</b>
        </p>
        <List>
          <button
            onClick={() => {
              onClickCateogry("category");
            }}
          >
            all
          </button>
        </List>
        {categories.map((category) => (
          <List key={category} className="nav__menu-item">
            <button className="nav__menu-item"
              onClick={() => {
                onClickCateogry("category", category);
              }}
            >
              {category}
            </button>
            <Submenu category2={onSetCategory(category)}/>
          </List>
        ))}
      </ul>
    </Wrapper>
  );
};

const Submenu = ({category2}) =>{
  return (

    // <ul className="nav__submenu">
    //     <li className="nav__submenu-item ">
    //       <a>Our Company</a>
    //     </li>
    //     <li className="nav__submenu-item ">
    //       <a>Our Team</a>
    //     </li>
    //     <li className="nav__submenu-item ">
    //       <a>Our Portfolio</a>
    //     </li>
    //   </ul>
    <ul className="nav__submenu">
      {category2 && category2.map((category3) => (
          <li key={category3.value} className="nav__submenu-item">
            <button className="nav__submenu-item"
            >
              {category3.text}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Aside;

const Wrapper = styled.aside`
  width: 230px;
`;

const List = styled.li`
  :hover {
    cursor: pointer;
  }
`;