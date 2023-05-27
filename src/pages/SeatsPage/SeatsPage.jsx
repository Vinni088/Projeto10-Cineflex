import axios from "axios";
import loading from "../../assets/loading.gif"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage() {
    let [info, setInfo] = useState(null);
    let [select, setSelect] = useState([]);
    let [assentos,setAssentos] = useState(null);
    let params = useParams();
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`;

    useEffect(() => {
        const requisicao = axios.get(url);
        requisicao.then(resposta => {
            setInfo(resposta.data); 
            setAssentos(resposta.data.seats);
            console.log(resposta.data);
        });
    },[])
    
    if(info === null) {
        return(
            <Loading>
                <img src={loading} alt="Carregando Sua Página :D" />
                <h1> Carregando sua pagina </h1>
            </Loading>);
    } //loading phase

    function MarcarAssento(numero, vazio){
        console.log(vazio);
        if(vazio){
            if(select.includes(numero)){
                let NewArr = [...select];
                let index = NewArr.indexOf(numero);
                NewArr.splice(index, 1);
                console.log(NewArr);
                setSelect(NewArr);
            } else {
                let NewArr = [...select, numero];
                console.log(NewArr);
                setSelect(NewArr); 
            }
            
        }
    }
    if( info !== null ) {return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map(assento => 
                    <SeatItem onClick={() => MarcarAssento(assento.name, assento.isAvailable)} 
                    vazio={assento.isAvailable} key={assento.id} numero={assento.name} select={select}>
                        {assento.name}
                    </SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>

                <CaptionItem>
                    <CaptionCircle color='#1AAE9E' border='#0E7D71' />
                    Selecionado
                </CaptionItem>
                
                <CaptionItem>
                    <CaptionCircle color='#C3CFD9' border='#7B8B99' />
                    Disponível
                </CaptionItem>

                <CaptionItem>
                    <CaptionCircle color='#FBE192' border='#F7C52B' />
                    Indisponível
                </CaptionItem>

            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <Link to={"/"}> <button>Reservar Assento(s)</button> </Link> 
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={info.movie.posterURL} alt={info.movie.title} />
                </div>
                <div>
                    <p>{info.movie.title}</p>
                    <p>{info.day.weekday} - {info.name}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`

    border: 1px solid ${props => props.border};        // Essa cor deve mudar
    background: ${props => props.color};    // Essa cor deve mudar
    height: 26px;
    width: 26px;
    border-radius: 12px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    box-sizing: border-box;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`

    height: 26px;
    width: 26px;
    border-radius: 12px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    box-sizing: border-box;

    border: 1px solid ${props => {
    if (props.vazio && !props.select.includes(props.numero)) {
        return('#7B8B99')
    } else if(props.vazio && props.select.includes(props.numero)) {
        return('#0E7D71');
    } else {
        return('#F7C52B')
    }}};        // Essa cor deve mudar
    background: ${props => {
    if (props.vazio && !props.select.includes(props.numero)) {
        return('#C3CFD9')
    } else if(props.vazio && props.select.includes(props.numero)) {
        return('#1AAE9E');
    } else {
        return('#FBE192')
    }}};     // Essa cor deve mudar
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
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
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