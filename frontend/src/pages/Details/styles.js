import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 60px auto 0;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    strong {
      font-size: 30px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        border: 0;
        border-radius: 4px;
        height: 42px;
        display: flex;
        align-items: center;
        background: #4dbaf9;
        width: 116px;
        justify-content: center;

        & + button {
          margin-left: 15px;
          background: #d44059;
        }

        span {
          font-weight: bold;
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;

    aside {
      height: 300px;
      width: 100%;
      max-width: 900px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin: 20px 0;

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }

    p {
      margin-top: 20px;
      font-size: 16px;
      line-height: 20px;
    }
    span {
      color: #eee;
      margin-top: 40px;
      line-height: 18px;
    }

    footer {
      margin-top: 40px;

      span {
        & + span {
          margin-left: 15px;
        }
      }
    }
  }
`;
