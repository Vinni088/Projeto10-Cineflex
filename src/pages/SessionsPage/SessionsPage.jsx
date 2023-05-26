import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import styled from "styled-components"
import axios from "axios"

export default function SessionsPage() {

    let [info,setInfo] = useState([]);
    let [sessoes,setSessoes] = useState([]);
    const params = useParams();
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idfilme}/showtimes`;

    useEffect(() => {
		const requisicao = axios.get(url);
		requisicao.then(resposta => {
			setInfo(resposta.data);
            console.log(resposta.data);
            setSessoes(resposta.data.days);
		});
	}, []);
    if(info.id > 0) {
        return (
        <PageContainer>
            
            Selecione o horário
            {sessoes.map(sessao => 
                <SessionContainer key={sessao.id}>
                    {sessao.weekday} - {sessao.date}
                    <ButtonsContainer>
                        <Link to={`/Assentos/${sessao.showtimes[0].id}`}>
                            <button>{sessao.showtimes[0].name}</button>
                        </Link>
                        <Link to={`/Assentos/${sessao.showtimes[1].id}`}>
                            <button>{sessao.showtimes[1].name}</button>
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
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
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
        p {
            margin-top: 0px;
            text-align: left;
        }
    }
`