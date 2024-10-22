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