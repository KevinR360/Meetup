import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  height: 300px;
  align-self: stretch;
  margin-bottom: 15px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
    }

    div {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      display: none;
    }
  }
`;
