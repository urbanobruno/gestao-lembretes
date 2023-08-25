import React from "react";
import { render, screen } from "@testing-library/react";
import ListaLembretes from "./ListaLembretes";
import '@testing-library/jest-dom'

test("testa se o componente está renderizando corretamente", () => {
  
  const diasLembretes = [...new Set(['25-08-2024'])];

  const lembretes = [
    {
      id: 1,
      nome: "Lembrete 1",
      dataLembrete: '25-08-2024',
    },
    {
      id: 2,
      nome: "Lembrete 2",
      dataLembrete: '25-08-2024',
    },
  ]

  render(
    <ListaLembretes
    dias={diasLembretes}
    lembretes={lembretes}
    excluirLembrete={() => {}}
  />
  )
})

describe("ListaLembretes", () => {
  it("deve exibir os lembretes passados como props corretamente", () => {
    const hoje = new Date();
    
    const data = new Date(hoje);
    data.setDate(data.getDate() + 5);
    const dataFormatada = formataData(data);

    const lembretes = [
      {
        id: 1,
        nome: "Lembrete 1",
        dataLembrete: dataFormatada,
      },
      {
        id: 2,
        nome: "Lembrete 2",
        dataLembrete: dataFormatada,
      },
      {
        id: 3,
        nome: "Lembrete 3",
        dataLembrete: dataFormatada,
      },
    ];

    const diasDistintos = [...new Set([dataFormatada])];

    const { getByText } = render(
      <ListaLembretes
        dias={diasDistintos}
        lembretes={lembretes}
        excluirLembrete={() => {}}
      />
    );

    // Verifique se os nomes dos lembretes estão sendo exibidos
    lembretes.forEach((lembrete) => {
      const lembreteNome = screen.getByText(lembrete.nome);
      expect(lembreteNome).toBeInTheDocument();
    });
  });
});

// Função para formatar a data como "dd-MM-yyyy"
const formataData = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};
