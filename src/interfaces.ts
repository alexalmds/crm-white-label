export interface INotification {
    id: number;
    notification_type: string;
    from_user_id?: number;
    related_post_id?: number;
    notification_desc: string;
    is_read: boolean;
    userImg?: string;
    created_at: string;
}

export interface IUser{
    name: string,
    email: string,
    verified_acc: string,
    user_img: string,
}


export interface IClient {
    id: number,
    nome_cliente: string,
    cpf_cnpj: string,
    email_cliente: string,
    telefone_cliente: string,
    endereco_cliente: string,
    status: string,
    data_criacao: string,
    pais: string,
    cidade: string,
    estado: string,
    cep: string,
    whatsapp: string
}


export interface ISetor{
    id: number,
    titulo: string,
    id_empresa: number,
    descricao: string,
    observacao: string,
    gera_incidencia: string,
    taxa: number,
    percentual: number
}

export interface IServicos{
    id: number,
    id_empresa: number,
    titulo: string,
    encargos: number,
    tributos_federais_totais: number,
    valor: number,
    vigencia: string,
    id_setor: number,
    setor_nome: string
}


export interface IModelContrato{
    id: number,
    id_empresa: number,
    titulo: string,
    conteudo: string,
    data_criacao: string
}

export interface FormaDePgto {
    id: number;
    descricao: string;
    tipo: string;
    status: string;
    data_criacao: string;
}

export interface ICobrancas{
    id: number,
    nome_cliente: string,
    id_cliente: number,
    descricao: string,
    vencimento: string,
    id_cobranca_asaas: string,
    valor: string,
    status: string,
}

export interface IBillingData {
    id: number;
    id_boleto: string;
    id_cliente: number;
    id_empresa: number;
    data_emissao: string;
    data_vencimento: string;
    valor: string;
    status: string;
    ultima_notificacao: string;
    proxima_notificacao: string;
    sincronizado_em: string;
    nome_cliente: string;
    customerId: string;
    whatsapp: string;
    email_cliente?: string | null;
    telefone_cliente?: string | null;
    descricao?: string | null;
    tipo_juros?: string | null;
    tipo_multa?: string | null;
    valor_juros?: string | null;
    valor_multa?: string | null;
    forma_pagamento_id: number;
    forma_pagamento: string;
    installment: number;
}