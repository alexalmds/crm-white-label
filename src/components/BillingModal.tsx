import React, { useState } from 'react';
import { IBillingData } from '@/interfaces';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

interface BillingModalProps {
    isOpen: boolean;
    onClose: () => void;
    billingData: IBillingData;
    onBaixa: () => void;
    onLancamento: () => void;
    onExcluir: () => void;
    onEstornar: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ isOpen, onClose, billingData, onBaixa, onEstornar, onExcluir, onLancamento }) => {
    const [selectedMethod, setSelectedMethod] = useState<string>(''); // Estado para o método de envio de cobrança
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    if (!isOpen) return null;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

    // Função para lidar com a seleção do método de envio de cobrança
    const handleSendCharge = () => {
        if (selectedMethod) {
            console.log(`Enviando cobrança via ${selectedMethod} para o cliente.`);
            // Implementação do envio de cobrança
        } else {
            alert('Selecione um método de envio!');
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" size="3xl">
            <ModalContent>
                <ModalHeader>Detalhes da Cobrança</ModalHeader>
                <ModalBody>
                    <Tabs>
                        {/* Aba Principal */}
                        <Tab title="Informações Principais">
                            <div className="space-y-4">
                                <div>
                                    <span className="font-bold">Cliente:</span> {billingData.nome_cliente}
                                </div>
                                <div>
                                    <span className="font-bold">Valor:</span> R$ {billingData.valor}
                                </div>
                                <div>
                                    <span className="font-bold">Forma de Pagamento:</span> {billingData.forma_pagamento}
                                </div>
                                <div>
                                    <span className="font-bold">Parcelamento:</span> {billingData.installment === 1 ? `À vista (1x)` : billingData.installment + "X sem juros"}
                                </div>
                                <div>
                                    <span className="font-bold">Status:</span> {billingData.status}
                                </div>
                                <div>
                                    <span className="font-bold">Data de Vencimento:</span> {billingData.data_vencimento}
                                </div>
                            </div>
                        </Tab>

                        {/* Aba Detalhes */}
                        <Tab title="Outros Detalhes">
                            <div className="space-y-4">
                                <div>
                                    <span className="font-bold">Descrição:</span> {billingData.descricao}
                                </div>
                                <div>
                                    <span className="font-bold">ID Boleto:</span> {billingData.id_boleto}
                                </div>
                                <div>
                                    <span className="font-bold">Data de Emissão:</span> {billingData.data_emissao}
                                </div>
                                <div>
                                    <span className="font-bold">Última Notificação:</span> {formatDate(billingData.ultima_notificacao)}
                                </div>
                                <div>
                                    <span className="font-bold">Próxima Notificação:</span> {formatDate(billingData.proxima_notificacao)}
                                </div>
                                <div>
                                    <span className="font-bold">Sincronizado em:</span> {formatDate(billingData.sincronizado_em)}
                                </div>
                                <div>
                                    <span className="font-bold">WhatsApp:</span> {billingData.whatsapp}
                                </div>
                                <div>
                                    <span className="font-bold">Email Cliente:</span> {billingData.email_cliente || 'Não informado'}
                                </div>
                                <div>
                                    <span className="font-bold">Telefone Cliente:</span> {billingData.telefone_cliente || 'Não informado'}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </ModalBody>
                <ModalFooter className='flex justify-between'>
                    <div className="flex items-center space-x-2">
                        <Button color="success" onClick={handleSendCharge}>
                            Enviar Cobrança
                        </Button>
                    </div>
                    <div className='space-x-2'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color="warning">+ Ações</Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="send-charge">
                                </DropdownItem>
                                <DropdownItem key="delete-charge" onClick={onExcluir}>
                                    Excluir Cobrança
                                </DropdownItem>
                                <DropdownItem key="launch-charge" onClick={onLancamento}>
                                    Lançar Cobrança
                                </DropdownItem>
                                <DropdownItem key="settle-charge" onClick={onBaixa}>
                                    Dar Baixa
                                </DropdownItem>
                                <DropdownItem key="reverse-charge" onClick={onEstornar}>
                                    Estornar
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="danger" variant="flat" onClick={onClose}>
                            Fechar
                        </Button>
                    </div>

                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BillingModal;
