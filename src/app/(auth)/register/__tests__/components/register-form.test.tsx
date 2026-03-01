import { fireEvent, render, screen } from '@testing-library/react'
import { RegisterForm } from '../../components/register-form'
import { useRegister } from '../../hooks/use-register'

jest.mock('../../hooks/use-register')

const mockUseRegister = useRegister as jest.Mock

describe('RegisterForm', () => {
  const defaultMockData = {
    formData: {
      fullName: '',
      companyName: '',
      email: '',
      password: ''
    },
    handleChange: jest.fn(),
    isLoading: false,
    error: null,
    handleRegister: jest.fn((e) => e.preventDefault())
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRegister.mockReturnValue(defaultMockData)
  })

  it('deve renderizar todos os campos do formulário corretamente', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nome da empresa/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /começar agora/i })
    ).toBeInTheDocument()
  })

  it('deve chamar handleChange quando os campos forem editados', () => {
    render(<RegisterForm />)

    const nameInput = screen.getByLabelText(/nome completo/i)
    fireEvent.change(nameInput, {
      target: { value: 'Fulano de Tal', name: 'fullName' }
    })

    expect(defaultMockData.handleChange).toHaveBeenCalled()
  })

  it('deve exibir estado de carregamento no botão', () => {
    mockUseRegister.mockReturnValue({
      ...defaultMockData,
      isLoading: true
    })

    render(<RegisterForm />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText(/criando conta.../i)).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro quando presente', () => {
    const errorMessage = 'E-mail já cadastrado'
    mockUseRegister.mockReturnValue({
      ...defaultMockData,
      error: errorMessage
    })

    render(<RegisterForm />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('deve chamar handleRegister ao submeter o formulário', () => {
    const { container } = render(<RegisterForm />)
    const formElement = container.querySelector('form')
    if (formElement) {
      fireEvent.submit(formElement)
    }

    expect(defaultMockData.handleRegister).toHaveBeenCalled()
  })
})
