import styled from 'styled-components'

interface InputProps {
  error?: boolean
}

export const FormWrapper = styled.form`
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #ececec;
`

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 20px;
`

export const InputStyled = styled.input<InputProps>`
  border: none;
  border-bottom: 2px solid #000;
  padding: 10px;
  width: 300px;
  outline: none;
  font-weight: 700;
  background: transparent;
  transition: all 0.3s ease-out;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    font-size: 10px;
    top: -5px;
    left: 0;
  }

  &::placeholder {
    color: transparent;
  }
  &::after {
    content: 'teste';
  }
  border-bottom: ${(props) => (props.error === false ? '2px solid red' : '')};
`
export const LabelStyled = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #b9b2b2;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: all 0.3s ease-out;
  pointer-events: none;
`
export const Button = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 40px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #dddcdc;
  font-weight: 700;
  margin-top: 40px;
  cursor: pointer;
  opacity: 0.7;
  &.-active {
    background-color: #15c8b4;
    color: #fff;
    &:hover {
      opacity: 1;
    }
  }
`

export const ErrorMessage = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: #d7182a;
  margin-top: 1px;
`
export const TableUser = styled.table`
  width: 100%;
  text-align: center;
  font-size: 16px;
  th td {
    padding: 20px 0;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tbody td:last-child {
    cursor: pointer;
  }
`
