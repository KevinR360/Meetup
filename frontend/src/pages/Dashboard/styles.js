import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;

  header {
    align-self: stretch;
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 36px;
    }

    button {
      background: #f94d6a;
      border: 0;
      padding: 10px 20px;
      font-size: 20px;
      font-weight: bold;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    span {
      margin-left: 5px;
    }
  }

  ul {
    align-self: stretch;
    margin: 20px 0;

    li {
      background: rgba(0, 0, 0, 0.1);
      height: 60px;
      align-self: stretch;
      border-radius: 6px;
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & + li {
        margin-top: 15px;
      }

      strong {
        font-size: 18px;
      }

      div {
        display: flex;
        align-items: center;

        button {
          margin-left: 10px;
          border: 0;
          background: none;
        }
      }
    }
  }
`;
