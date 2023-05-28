import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
export default function SuccessPage() {
    const navigate = useNavigate();
    console.log(useLocation().state);
    let dados = useLocation().state;
    let assentos = [];
    for (let i =0; i < dados.info.seats.length; i++) {
        if(dados.objeto.ids.includes(dados.info.seats[i].id)){
            assentos.push(dados.info.seats[i].name);
            console.log(assentos);
        }
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info" >
                <strong><p>Filme e sessão</p></strong>
                <p>{dados.info.movie.title}</p>
                <p>{dados.info.day.date}  {dados.info.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {assentos.map((numero) => <p>Assento {numero}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {dados.objeto.name}</p>
                <p>CPF: {dados.objeto.cpf}</p>
            </TextContainer>

            <button onClick={() => navigate('/')} data-test="go-home-btn">Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        width: 225px;
        height: 42px;

        background: #E8833A;
        border-radius: 3px;
        border: 0px solid #E8833A;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`