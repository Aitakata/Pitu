import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';

import ShortenerService from '../../services/shortenerService';
import { parseISO, formatRelative}from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles'

class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           isLoading: false,
           shortenedURL: {},
           errorMessage: 'Error',
        }
    }

    async componentDidMount(){
        // const code= this.props.match.params.code;
        const {code} = this.props.match.params;
        try {
            const service = new ShortenerService();
            const shortenedURL= await service.getStatus(code);
            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });
            shortenedURL.relativeDate = relativeDate;
            this.setState({isLoading: false, shortenedURL});

        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'Ops, a url solicitada não existe'});
        }
    }

    render() {
        const {errorMessage, shortenedURL} = this.state;
        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className= "text-center">
                        <FontAwesomeIcon
                            size="3x"
                            color="#f8d7da"
                            icon= "exclamation-triangle"
                        />
                        <p className= "m-3"> {errorMessage} </p>
                        <a className= "btn- btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className= "text-center">
                        {/* <p><b>https://pitu.tk/{shortenedURL.code}</b></p> */}
                        <p><b>https://localhost:3000/{shortenedURL.code}</b></p>
                        <p>Redireciona para: <br/>{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Última Visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }
}

export default StatsPage;