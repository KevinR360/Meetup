import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      align-self: stretch;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      padding: 15px;
      border: 0;
      border-radius: 4px;

      & + input {
        margin-top: 15px;
      }
    }
    textarea {
      line-height: 20px;
      margin: 15px 0;
      height: 200px;
      align-self: stretch;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      padding: 15px;
      border: 0;
      border-radius: 4px;
    }

    button {
      height: 42px;
      width: 180px;
      align-self: flex-end;
      margin-top: 15px;
      border: none;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f94d6a;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const Banner = styled.div`
  width: 100%;
  max-width: 900px;
  height: 300px;
  border-radius: 4px;
  margin: 20px 0;

  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;
