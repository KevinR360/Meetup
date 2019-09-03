import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 92px;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 30px;
  box-shadow: 0 0 1px #2b2b2b;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  align-items: center;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      margin-top: 2px;
      font-size: 12px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #eee;
    }
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #eee;
  }

  button {
    margin-left: 10px;
    background: ${darken(0.03, '#f94d6a')};
    padding: 5px 10px;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#f94d6a')};
    }
  }
`;
