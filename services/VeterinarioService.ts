import { Veterinario } from "../models/Veterinario";

let listaVeterinarios: Veterinario[] = [
  {
    id: 1,
    nome: "Dra. Ana Souza",
    crmv: "12345",
    estado: "BA",
    ccpsId: 1,
    fotoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    nome: "Dr. João Lima",
    crmv: "54321",
    estado: "BA",
    ccpsId: 1,
  },
];

export const VeterinarioService = {
  listarPorCcps: (ccpsId: number): Veterinario[] => {
    return listaVeterinarios.filter((v) => v.ccpsId === ccpsId);
  },

  remover: (id: number) => {
    listaVeterinarios = listaVeterinarios.filter((v) => v.id !== id);
  },

  adicionar: (novo: Veterinario) => {
    novo.id = Date.now();
    listaVeterinarios.push(novo);
  },

  editar: (v: Veterinario) => {
    const index = listaVeterinarios.findIndex((x) => x.id === v.id);
    if (index !== -1) {
      listaVeterinarios[index] = v;
    }
  },
  salvarOuAtualizar : (v: Veterinario) => {
    const index = listaVeterinarios.findIndex((vet) => vet.id === v.id);
    if (index >= 0) {
      listaVeterinarios[index] = v;
    } else {
      listaVeterinarios.push(v);
    }
  }  

  
};
