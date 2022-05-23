import axios from 'axios'
import { useEffect, useState } from 'react'
import * as S from './styles'

interface ErrorsProps {
  email: boolean
  name: boolean
  cpf: boolean
  phone: boolean
}

interface UserProps {
  email: string
  name: string
  cpf: string
  phone: string
}

const Main = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [apiUsers, setApiUsers] = useState<UserProps[]>([])
  const [enableButton, setEnableButton] = useState<boolean>(false)

  const [errors, setErrors] = useState<ErrorsProps>({
    email: false,
    name: false,
    cpf: false,
    phone: false
  })

  useEffect(() => {
    axios
      .get('https://private-9d65b3-tinnova.apiary-mock.com/users')
      .then((response) => {
        const usersFromApi = response.data

        if (typeof window !== 'undefined') {
          const hasUserLocalStorage = localStorage.getItem('users')
          const usersLocal = hasUserLocalStorage
            ? [...JSON.parse(localStorage.getItem('users') as string)]
            : []
          if (usersLocal.length === 0) {
            const mergeUsers = [...usersLocal, ...usersFromApi]
            localStorage.setItem('users', JSON.stringify(mergeUsers))
            setApiUsers(mergeUsers)
          } else {
            setApiUsers(usersLocal)
          }
        }
      })
  }, [])

  const handleChangeName = (event: any) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handleCpf = (event: any) => {
    setCpf(cpfMask(event.target.value))
  }

  const handlePhone = (event: any) => {
    setPhone(phoneMask(event.target.value))
  }

  const validateEmail = (email: string) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
  }

  const validateName = (name: string) => {
    const regex = /^\w+( \w+)+$/i
    return regex.test(name)
  }

  const validateCpf = (cpf: string) => {
    const regex =
      /([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})/
    return regex.test(cpf)
  }

  const validatePhone = (phone: string) => {
    const regex =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/
    return regex.test(phone)
  }

  const testErrors = () => {
    const testError = {
      name: validateName(name),
      email: validateEmail(email),
      cpf: validateCpf(cpf),
      phone: validatePhone(phone)
    }
    setErrors(testError)

    if (Object.values(errors).length > 0) {
      setEnableButton(Object.values(errors).every((value) => value))
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const hasError = Object.values(errors).some((error) => error === false)
    if (hasError) return

    const user = {
      name,
      cpf: cpf.replace(/\D/g, ''),
      phone: phone.replace(/\D/g, ''),
      email
    }
    const getUser = localStorage.getItem('users')

    const usersLocal = JSON.parse(getUser as string)

    const mergeUsers = [...usersLocal, user]
    localStorage.setItem('users', JSON.stringify(mergeUsers))
    setApiUsers(mergeUsers)
  }

  const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const phoneMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
  }

  const deleteUser = (userIndex: number) => {
    setApiUsers((user) => user.filter((_, index) => index !== userIndex))
  }

  useEffect(() => {
    testErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, cpf, email, phone])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(apiUsers))
  }, [apiUsers])

  return (
    <>
      <S.FormWrapper onSubmit={handleSubmit}>
        <S.WrapperInput>
          <S.InputStyled
            placeholder=" "
            type="text"
            onChange={handleChangeName}
            error={errors.name}
          />
          <S.LabelStyled>Nome completo (sem abreviações)</S.LabelStyled>
          {!errors.name && (
            <S.ErrorMessage>Informe Nome e Sobrenome</S.ErrorMessage>
          )}
        </S.WrapperInput>
        <S.WrapperInput>
          <S.InputStyled
            placeholder=" "
            type="email"
            onChange={handleChangeEmail}
            error={errors.email}
          />
          <S.LabelStyled>E-mail</S.LabelStyled>
          {!errors.email && (
            <S.ErrorMessage>Informe um E-mail válido</S.ErrorMessage>
          )}
        </S.WrapperInput>
        <S.WrapperInput>
          <S.InputStyled
            placeholder=" "
            type="text"
            maxLength={14}
            value={cpf}
            onChange={handleCpf}
            error={errors.cpf}
          />
          <S.LabelStyled>CPF</S.LabelStyled>
          {!errors.cpf && (
            <S.ErrorMessage>Informe um CPF válido</S.ErrorMessage>
          )}
        </S.WrapperInput>
        <S.WrapperInput>
          <S.InputStyled
            placeholder=" "
            type="text"
            maxLength={15}
            value={phone}
            onChange={handlePhone}
            error={errors.phone}
          />
          <S.LabelStyled>Telefone</S.LabelStyled>
          {!errors.phone && (
            <S.ErrorMessage>Informe um Telefone válido</S.ErrorMessage>
          )}
        </S.WrapperInput>
        <S.Button
          className={enableButton ? '-active' : ''}
          type="submit"
          disabled={enableButton ? false : true}
        >
          Cadastrar
        </S.Button>
      </S.FormWrapper>
      <S.TableUser>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-Mail</th>
            <th>CPF</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {apiUsers.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.cpf}</td>
              <td>{item.phone}</td>
              <td onClick={() => deleteUser(index)}>Excluir</td>
            </tr>
          ))}
        </tbody>
      </S.TableUser>
    </>
  )
}

export default Main
