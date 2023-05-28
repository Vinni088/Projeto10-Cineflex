import { Link, useNavigate, useParams } from "react-router-dom";
import loading from "../../assets/loading.gif";
import { useState, useEffect } from 'react';
import voltar from "../../assets/return.png";
import styled from "styled-components"
import axios from "axios"

export default function SessionsPage() {

    let [info,setInfo] = useState(null);
    let [sessoes,setSessoes] = useState([]);
    const params = useParams();
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idfilme}/showtimes`;
    const navigate = useNavigate();
    
    useEffect(() => {
		const requisicao = axios.get(url);
		requisicao.then(resposta => {
			setInfo(resposta.data);
            console.log(resposta.data);
            setSessoes(resposta.data.days);
		})
	}, []);

    if(info === null) {
        return(
            <Loading>
                <img src={loading} alt="Carregando Sua Página :D" />
                <h1> Carregando sua pagina </h1>
            </Loading>);
    } //Loading phase

    if(info !== null) {
        return (
        <PageContainer>
            <Back>
                <img onClick={() => navigate(-1)} src={voltar} alt='Voltar à pagina anterior' />
            </Back>
            
            Selecione o horário
            {sessoes.map(sessao => 
                <SessionContainer key={sessao.id}>
                    {sessao.weekday} - {sessao.date}
                    <ButtonsContainer>
                        <Link to={`/Assentos/${sessao.showtimes[0].id}`}>
                            <BotãoSessão>{sessao.showtimes[0].name}</BotãoSessão>
                        </Link>
                        <Link to={`/Assentos/${sessao.showtimes[1].id}`}>
                            <BotãoSessão>{sessao.showtimes[1].name}</BotãoSessão>
                        </Link>
                    </ButtonsContainer>
                </SessionContainer>
                )}

            <FooterContainer>
                <div>
                    <img src={info.posterURL} alt={info.title} />
                </div>
                <div>
                   <p>{info.title} <br/> {info.overview}</p> 
                </div>
            </FooterContainer>

        </PageContainer>
    )}
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 20px 0;
    gap: 20px;
    a {
        text-decoration: none;
    }

`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        width: 50px;
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        height: 100px;
        p {
            margin-top: 0px;
            text-align: left;
            word-wrap: break-word;
        }
    }
`
const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    img {
        width: 30%;
    }
    h1 {
        font-family: 'Roboto';
        font-size: 24px;
        text-align: center;
        color: #293845;
    }
    `
const BotãoSessão = styled.button`
    width: 83px;
    height: 43px;

    background: #E8833A;
    border: 0px solid white;
    border-radius: 3px;

    cursor: pointer;
`
const Back = styled.div`
    position: fixed;
    top: 80px;
    left: 40px;
    height: 50px;
    width: 50px;
`