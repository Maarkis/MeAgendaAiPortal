import {Endereco} from '@brunoc/ngx-viacep/brunoc-ngx-viacep';

export class CEP implements Endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    unidade: string;
}
