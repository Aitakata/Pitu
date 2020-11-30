import React from 'react';
import Header from '../../components/Header';
import { ContentContainer, Form, AdsBlock} from './styles';
import {Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { // preservando os valores
            isLoading: false,
            url: '',            // Url original
            code: '',           // Url encurtada
            errorMessage: '',   // msg qdo ocorrer erro
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();     // cancela o evento
        const { url } = this.state;  // pega o state da url
        this.setState({isLoading: true, // poe o carregamento como true
            errorMessage:''});      // e zera a msg de erro
        if (!url) {                  // testa se esta vazio
            this.setState({isLoading: false,  // poe o carregamento como falso
                errorMessage: 'Informe uma url para encurtar'}); // set a a msg de erro
        } else {
            try {
                const service = new ShortenerService();
                const result = await service.generate({url});  // encurta a url
                this.setState({isLoading: false, code: result.code}); // seta a url encurtada
            } catch (error) {
                this.setState({isLoading: false, 
                        errorMessage: 'Ops, ocorreu um erro ao tentar encurtar a url'});
            }
        }    
    }

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render() {
        const { isLoading, errorMessage, code} = this.state;
        return (
            <Container>
                <Header >Seu novo encurtador de URL</Header>
                <ContentContainer>
                    <Form onSubmit= {this.handleSubmit} >
                        <InputGroup className="mb-3">
                            <FormControl
                               placeholder= "Digite a URL a encurtar"
                               defaultValue= ""
                               onChange= { e => this.setState({ url: e.target.value })}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {isLoading ? (
                            <Spinner animation="border" /> // indica que esta carregando
                        ) : (               // se já carregou e tem um valor a exibir
                            code && (       //    é <> de null e vazio
                                <>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            autoFocus= {true}
                                            defaultValue= {`https://localhost:3000/${code}`}
                                   /*         defaultValue= {`https://pitu.tk/${code}`}  */
                                            ref= {(input) => this.inputURL = input}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={()=> this.copyToClipboard()}> Copiar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <p>Para acompanhar as estatísticas, acesse https://pitu.tk/{code}</p>
                                </>
                            )
                         )}
                         {errorMessage && <Alert variant="danger"> 
                                                 {errorMessage} 
                                          </Alert>}
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <AdsBlock>AdSense</AdsBlock>
                </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;