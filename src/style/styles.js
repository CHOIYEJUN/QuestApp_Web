import {styled} from "styled-components";

export const Wrapper = styled.div`
  
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
      width: 330px;
      height: 500px;
      padding: 30px 30px;
      border-radius: 20px;
      opacity: 0.8;
  
    `;

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 330px;
  height: 500px;
  padding: 30px 30px;
  border-radius: 20px;
  opacity: 0.8;
`;

export const Title = styled.h1`
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 10px;
    `

export const StyleForm = styled.form`
  
        margin-top: 20px;
    `

export const Input = styled.input`
      padding: 10px 20px;
      margin: 5px 0px;
      border-radius: 10px;
      border: 1px solid #dbdbdb;
      width: 100%;
      &[type="submit"] {
        cursor : pointer;
        &:hover{
          opacity: 0.8;
        }
      } 
      color: #000;
  
    `
export const Switcher = styled.div`
      margin-top: 20px;
      font-size: 0.9em;
        a {
            color: #0095f6;
            margin-left: 5px;
            font-weight: 600;
            text-decoration: none;
        }
`
