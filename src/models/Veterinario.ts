export class Veterinario {
  id?: number;
  nome: string;
  crmv: string;
  cep: string;
  endereco: string;   
  ccpsId: number;
  fotoUrl?: string;

  constructor(nome: string, crmv: string, endereco: string, cep: string, ccpsId: number, fotoUrl?: string) {
    this.nome = nome;
    this.crmv = crmv;
    this.endereco = endereco;
    this.cep = cep;
    this.ccpsId = ccpsId;
    this.fotoUrl = fotoUrl;
  }
}