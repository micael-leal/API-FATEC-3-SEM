import React, { Component, FormEvent, ChangeEvent } from 'react';
import Styles from '../UserForm/UserForm.module.css';
import InputText from '../../components/InputText/InputText';
import { Session } from '../../model/utils/Session';
import User from "../../model/classes/User";
import SaltyAlert from '../../model/utils/SaltyAlert';

interface EditUserFormState {
    id: number;
    nomeCompleto: string;
    cpf: string;
    nomeDoUsuario: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    tipoDoUsuario: string;
    active: boolean;
}

interface EditUserFormProps {
    onSubmit: (
        id: number, nomeCompleto: string,
        cpf: string, nomeDoUsuario: string,
        email: string, senha: string, tipoDoUsuario: string,
        confirmarSenha: string, active: boolean,
    ) => void;
}

const session = Session();

class EditUserForm extends Component<EditUserFormProps, EditUserFormState> {
    constructor(props: EditUserFormProps) {
        super(props);
        this.state = {
            id: session.id,
            nomeCompleto: session.fullName,
            cpf: session.cpf,
            nomeDoUsuario: session.userName,
            email: session.email,
            senha: '',
            confirmarSenha: '',
            tipoDoUsuario: session.profile.type.toString(),
            active: true,
        };
    }

    handleNomeCompletoChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ nomeCompleto: event.target.value });
    };

    handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ cpf: event.target.value });
    };

    handleNomeDoUsuarioChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ nomeDoUsuario: event.target.value });
    };

    handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    };

    handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ senha: event.target.value });
    };

    handleConfirmarSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ confirmarSenha: event.target.value });
    };

    handleTipoDoUsuarioChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ tipoDoUsuario: event.target.value });
    };
  

    editUserAdm () {
        const storageUser = localStorage.getItem('user');

        if (storageUser === null){
            // Henrique: Pq ta vazio aqui?
        } else {
            const user: User = JSON.parse(storageUser);
            this.setState({
                nomeCompleto: user.fullName,
                cpf: user.cpf,
                active: user.active,
                email: user.email,
                id: user.id,
                nomeDoUsuario: user.userName
            });
            localStorage.removeItem('user');
        }
    }

  
    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            id, nomeCompleto,
            cpf, nomeDoUsuario,
            email, senha, tipoDoUsuario,
            confirmarSenha, active
        } = this.state;

        if(senha !== confirmarSenha) {
            new SaltyAlert().modal({
                icon: 'Error',
                title: 'Erro',
                text: 'Senhas não são iguais!',
                closeOnClickOutside: true,
                timerInMiliseconds: 5000
            });
        } else {
            this.props.onSubmit(id, nomeCompleto, cpf, nomeDoUsuario, email, senha, tipoDoUsuario, confirmarSenha, active);
        }
    };


  
    render() {
        const {
            nomeCompleto,
            cpf, nomeDoUsuario,
            email, senha,
            tipoDoUsuario, confirmarSenha
        } = this.state;
        
        if (session.profile.type === 0) {
            return (
                <form onSubmit={ this.handleSubmit }>
                    <div className={ Styles.container }>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 255 }
                                value={ nomeCompleto }
                                onChange={ this.handleNomeCompletoChange }
                                placeholder="Insira o nome completo"
                                mytype="text"
                                label="Nome completo"
                            />
                            <InputText
                                maxLength={ 14 }
                                value={ cpf }
                                onChange={ this.handleCpfChange }
                                placeholder="Insira o CPF"
                                mytype="text"
                                label="CPF"
                                isCpf={ true }
                            />
                        </div>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 100 }
                                value={ nomeDoUsuario }
                                onChange={ this.handleNomeDoUsuarioChange }
                                placeholder="Insira o nome de usuário"
                                mytype="text"
                                label="Nome de usuário"
                            />
                            <InputText
                                maxLength={ 255 }
                                value={ email }
                                onChange={ this.handleEmailChange }
                                placeholder="Insira o email"
                                mytype="email"
                                label="Email"
                            />
                        </div>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 25 }
                                value={ senha }
                                onChange={ this.handleSenhaChange }
                                placeholder="Insira a senha"
                                mytype="password"
                                label="Senha"
                            />
                            <InputText
                                maxLength={ 25 }
                                value={ confirmarSenha }
                                onChange={ this.handleConfirmarSenhaChange }
                                placeholder="Confirme a senha"
                                mytype="password"
                                label="Confirmar a senha"
                            />
                        </div>
                        <div className={ Styles.line }>
                            <button className={ Styles.button }>Salvar</button>
                        </div>
                    </div>
                </form>
            );
        }else{
            this.editUserAdm()
            return (
                <form onSubmit={ this.handleSubmit }>
                    <div className={ Styles.container }>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 255 }
                                value={ nomeCompleto }
                                onChange={ this.handleNomeCompletoChange }
                                placeholder="Insira o nome completo"
                                mytype="text"
                                label="Nome completo"
                            />
                            <InputText
                                maxLength={ 14 }
                                value={ cpf }
                                onChange={ this.handleCpfChange }
                                placeholder="Insira o CPF"
                                mytype="text"
                                label="CPF"
                                isCpf={ true }
                            />
                        </div>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 100 }
                                value={ nomeDoUsuario }
                                onChange={ this.handleNomeDoUsuarioChange }
                                placeholder="Insira o nome de usuário"
                                mytype="text"
                                label="Nome de usuário"
                            />
                            <InputText
                                maxLength={ 255 }
                                value={ email }
                                onChange={ this.handleEmailChange }
                                placeholder="Insira o email"
                                mytype="email"
                                label="Email"
                            />
                        </div>
                        <div className={ Styles.line }>
                            <InputText
                                maxLength={ 25 }
                                value={ senha }
                                onChange={ this.handleSenhaChange }
                                placeholder="Insira a senha"
                                mytype="password"
                                label="Senha"
                            />
                            <InputText
                                maxLength={ 25 }
                                value={ confirmarSenha }
                                onChange={ this.handleConfirmarSenhaChange }
                                placeholder="Confirme a senha"
                                mytype="password"
                                label="Confirmar a senha"
                            />
                        </div>
                        <div className={ Styles.line }>
                            <div className={ Styles.tipoDoUsuario }>
                                <label>Tipo de usuário</label>
                                <select className={ Styles.comboBox } name="userType" required id="userType" value={ tipoDoUsuario } onChange={ this.handleTipoDoUsuarioChange }>
                                    <option value="0">Administrador</option>
                                    <option value="1">Usuário</option>
                                </select>
                            </div>
                            <button className={ Styles.button }>Salvar</button>
                        </div>
                    </div>
                </form>
            )
        }
    }
}

export default EditUserForm;






