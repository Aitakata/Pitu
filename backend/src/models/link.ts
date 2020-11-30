export type Link = {
    id?: number,    // idt único da URl - o ? é porque o id é opcional
    url: string,    // URL original
    code?: string,  // URL curta
    hits?: number   // nro de acessos na URL
}