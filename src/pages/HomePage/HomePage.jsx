import { useState, useEffect } from 'react';
import loading from "../../assets/loading.gif" 
import { Link } from "react-router-dom";
import styled from "styled-components"
import axios from "axios"

export default function HomePage() {

    const [thumbs, setThumbs] = useState(null);
    useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

		requisicao.then(resposta => {
            /*console.log(resposta.data);*/
			setThumbs(resposta.data);
		});
	}, []);

    if(thumbs === null) {
        return(
        <Loading>
            <img src={loading} alt="Carregando Sua Página :D" />
            <h1> Carregando sua pagina </h1>
        </Loading>);
    }
    if(thumbs !== null) {
        return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {thumbs.map((thumb,index) => 
                <Link data-test="movie" key={index} onClick={() => QualFilme(thumb.id)} to={`/sessoes/${thumb.id}`} >
                    <MovieContainer  id={thumb.id}>
                        <img src={thumb.posterURL} alt={thumb.title}/>
                    </MovieContainer> 
                </Link>
                )}
            </ListContainer>

        </PageContainer>
    )}
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
const Loading = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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