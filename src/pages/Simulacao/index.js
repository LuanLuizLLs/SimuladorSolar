import "./index.css";
import Api from "../../services/api";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * FORMATAR DADOS
 */
const Formatar = {
    real: (valor = 0) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    decimal: (valor = 0) => valor.toFixed(2)
}

export default function Simulacao() {
    const [dados, setDados] = useState({ parcelamento: [], kit: [] });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cep = params.get('cep');
        const estrutura = params.get('estrutura');
        const valor_conta = params.get('valor_conta');
        const search = `busca-cep?estrutura=${estrutura}&valor_conta=${valor_conta}&cep=${cep}`;
        Api.get(search).then((response) => {
            setDados(response.data);
        }).catch((error) => {
            console.error(`Erro na consulta da API => ${error}`);
        })
    }, [])

    return (
        <div className="contentSimulacao">
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={3}>
                        <Container className="h-100">
                            <Row className="dadosSimulacao">
                                <Col>
                                    <div className="blocoSimulacao">
                                        <h3 className="tituloSimulacao">Potência:</h3>
                                        { dados.potencial ? (
                                            <Typography sx={{
                                                fontSize: 50
                                            }}>{ dados.potencial }</Typography>
                                        ) : (
                                            <Skeleton height={80} variant="text" />
                                        )}
                                    </div>
                                    <div className="blocoSimulacao">
                                        <h3 className="tituloSimulacao">Irradiação Solar:</h3>
                                        { dados.irradiancia ? (
                                            <Typography sx={{
                                                fontSize: 40
                                            }}>{ dados.irradiancia }</Typography>
                                        ) : (
                                            <Skeleton height={40} variant="text" />
                                        )}
                                        { dados.irradiancia_maxima && dados.irradiancia_minima ? (
                                            <div className="irradiacaoMaxMin">
                                                <Typography sx={{ fontSize: 14 }}>
                                                    { dados.irradiancia_maxima }
                                                    <ArrowCircleUpIcon sx={{
                                                        fontSize: 18,
                                                        marginX: 1,
                                                        color: 'darkgreen'
                                                    }}/>
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }}>
                                                    { dados.irradiancia_minima }
                                                    <ArrowCircleDownIcon  sx={{
                                                        fontSize: 18,
                                                        marginX: 1,
                                                        color: 'darkred'
                                                    }}/>
                                                </Typography>
                                            </div>
                                        ) : (
                                            <Skeleton height={30} variant="text" />
                                        )}
                                    </div>
                                    <div className="blocoSimulacao">
                                        <h3 className="tituloSimulacao">Redução de CO<sup>2</sup>:</h3>
                                        { dados.co2 ? (
                                            <Typography>
                                                { Formatar.decimal(dados.co2) } toneladas
                                            </Typography>
                                        ) : (
                                            <Skeleton height={30} variant="text" />
                                        )}
                                    </div>
                                    <Button className="my-2 px-5" href="/" size="lg">
                                        VOLTAR
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={6}>
                        <Card className="cardMaterial" sx={{
                            backgroundColor: '#FFFFFF80',
                            maxHeight: 550,
                            overflowY: 'auto',
                            margin: 2
                        }}>
                            <CardContent>
                                { dados.potencial ? (
                                    <div className="blocoSimulacao">
                                        <Typography sx={{
                                            fontSize: 30,
                                            paddingBottom: 2
                                        }}>Kit de Materiais:</Typography>
                                        {
                                            dados.kit.map((dado, index) => (
                                                <Card className="kitSimulacao" key={index} sx={{
                                                    marginY: 1
                                                }}>
                                                    <CardContent>
                                                        <div className="kitSimulacao-Item">
                                                            <img src={ dado.url } alt={ dado.titulo }/>
                                                            <b>{ dado.qtde }x</b>
                                                            <span>{ dado.titulo }</span>
                                                            <strong>({ Formatar.real(dado.valor) })</strong>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <Skeleton variant="rectangular" width="100%" height="30vh" />
                                )}
                                <div className="blocoSimulacao">
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="parcelamento"
                                            id="parcelamento"
                                        >
                                            <Typography sx={{
                                                fontSize: 16
                                            }}>Parcelamento</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                             <Container>
                                                {
                                                    dados.parcelamento.map((dado, index) => (
                                                        <Row key={index}>
                                                            <Col className="p-0">
                                                                <div className="valorSimulacao">
                                                                    <strong>Min: { dado.parcelas }x</strong>
                                                                    <span>{ Formatar.real(dado.valor_minimo) }</span>
                                                                    <span>| <b>Taxa:</b> { Formatar.real(dado.taxa_minina) }</span>
                                                                </div>
                                                            </Col>
                                                            <Col className="p-0">
                                                                <div className="valorSimulacao">
                                                                    <strong>Max: { dado.parcelas }x</strong>
                                                                    <span>{ Formatar.real(dado.valor_maximo) }</span>
                                                                    <span>| <b>Taxa:</b> { Formatar.real(dado.taxa_maxima) }</span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    ))
                                                }
                                             </Container>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                <div className="blocoSimulacao instalacaoEconomica">
                                    <Card sx={{
                                        p: 2,
                                        my: 1
                                    }}>
                                        <h3 className="tituloSimulacao">Valor de Instalação:</h3>
                                        <Typography sx={{
                                            fontSize: 25
                                        }}>
                                            { Formatar.real(dados.valor_instalacao) }
                                        </Typography>
                                    </Card>
                                    <Card sx={{
                                        p: 2,
                                        my: 1
                                    }}>
                                        <h3 className="tituloSimulacao">Economia:</h3>
                                        <Typography sx={{
                                            fontSize: 25
                                        }}>
                                            { Formatar.real(dados.economia) }
                                        </Typography>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}