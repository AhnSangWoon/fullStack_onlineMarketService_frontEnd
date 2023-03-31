import React, { useRef, useEffect, useState, useMemo } from "react";
import axios from "axios";
import Item from "./item";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Proudct from "../../Routes/Products.js";
import { useStore1 } from "../../Routes/Stores/useStore";
import BasicMac from "../../Assets/basicMac.jpg";
import BasicMac2 from "../../Assets/basicMac2.jpg";
import MacM1Air from "../../Assets/macM1Air.jpg";
import MacM1Pro from "../../Assets/macM1Pro.jpg";
import MacM2Air from "../../Assets/macM2Air.jpg";
import MacM2Pro from "../../Assets/macM2Pro.jpg";
import { useImmer } from "use-immer";
import Aside from "../Aside";
import options from '../../data/options'
import {useStore2} from "../../Routes/Stores/useStore";

const ItemList = (props) => {
  const [searched, setSearched] = useState("");
  const inputRef = useRef();
  const { user, setUser } = useStore1();
  const { datas, setData } = useState("");
  const [requestResult, setRequestResult] = useState("");
  const navigate = useNavigate();
  let resData = [];
  const [inputData, setInputData] = useState([]);
  const {purpose, setPurpose} = useStore2();
  const [originData, setOriginData] = useState([]);
  useEffect(() => {
    setItems(originData);
  }, [originData]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/load/UploadShow")
      .then((response) => {
        setOriginData(
          response.data.map((i, idx) => {
            return {
              ...i,
              visit: (idx + 1) * i.itemprice,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error.message);

        setRequestResult("Failed!!");
      });
  }, []);

  const [items, setItems] = useState([]);

  const onSetSearched = (e) => {
    e.preventDefault();
    setSearched(inputRef.current.value);
  };

  const onSetSort = (type, category) => {
    switch (type) {
      /* 인기순 */
      case "pop":
        setItems([...originData.sort((a, b) => b.favor - a.favor)]);
        break;
      /* 가격 낮은순 */
      case "desc":
        setItems([...originData.sort((a, b) => a.itemprice - b.itemprice)]);
        break;
      /* 가격 높은순 */
      case "asc":
        setItems([...originData.sort((a, b) => b.itemprice - a.itemprice)]);
        break;
      case "category":
        if (category)
          setItems(originData.filter((i) => i.category === category));
        else setItems(originData);
        break;
      default:
        return;
    }
  };
  const categories = useMemo(
    () => originData.map((i) => i.category).filter((i) => i),
    [originData]
  );

  const categories1 = useMemo(
    () => options.map((i) => i.text).filter((i) => i),
    [options]
  );
  return (
    <Body>
      <Aside categories={categories1} onClickCateogry={onSetSort} />
      <StyledContainer>
        <h1>오늘의 추천 상품</h1>
        {purpose}
        <StyledWrapper>
          {[...items]
            .sort((a, b) => b.visit - a.visit)
            .map((i) => (
              <Item data={i} key={i.itemid} searched={searched} id={i.itemid} />
            ))}
        </StyledWrapper>
        <StyledFlex>
          <h1>판매상품</h1>
          <StyledSearchForm onSubmit={(e) => onSetSearched(e)}>
            <input type="text" ref={inputRef} />
            <button onClick={onSetSearched}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </StyledSearchForm>
          <StyledSoltContainer>
            <StyledSoltWrapper>
              <input
                type="radio"
                name="solt"
                id="pop"
                onChange={() => onSetSort("pop")}
              />
              <label htmlFor="pop">인기순</label>
            </StyledSoltWrapper>
            <StyledSoltWrapper>
              <input
                type="radio"
                name="solt"
                id="desc"
                onChange={() => onSetSort("desc")}
              />
              <label htmlFor="desc">가격 낮은순</label>
            </StyledSoltWrapper>
            <StyledSoltWrapper>
              <input
                type="radio"
                name="solt"
                id="asc"
                onChange={() => onSetSort("asc")}
              />
              <label htmlFor="asc">가격 높은순</label>
            </StyledSoltWrapper>
          </StyledSoltContainer>
        </StyledFlex>
        <StyledWrapper>
          {searched.length > 0
            ? items.map((v, idx) => {
                if (v.itemname.includes(searched)) {
                  return (
                    <Item
                      key={idx}
                      data={v}
                      searched={searched}
                      id={v.itemid}
                    />
                  );
                }
              })
            : items.map((v) => (
                <Item data={v} searched={searched} id={v.itemid} />
              ))}
        </StyledWrapper>
      </StyledContainer>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
`;

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  h1 {
    margin-bottom: 20px;
    text-align: left;
    font-size: 26px;
    font-weight: 500;
  }
`;

const StyledSearchForm = styled.form`
  position: absolute;
  top: 0;
  right: -10%;
  transform: translate(-100%, 0%);
  display: flex;
  align-items: center;
  width: 600px;
  input {
    width: 100%;
    padding-left: 12px;
    border: 1px solid lightgrey;
    height: 35px;
    outline: none;
  }
  button {
    background-color: whitesmoke;
    border: 1px solid lightgrey;
    width: 35px;
    height: 35px;
    transition: all 0.3s ease-in-out;
  }
  button:hover {
    background-color: #d3d3d3;
  }
`;

const StyledSoltContainer = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledSoltWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  label {
    font-size: 18px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 20px 40px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

export default ItemList;