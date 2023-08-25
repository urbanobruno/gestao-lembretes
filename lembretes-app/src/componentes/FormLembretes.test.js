import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux"; // Importe o Provider do seu Redux, se necessário
import store from "../redux/store"; // Importe a store do seu Redux
import FormLembretes from "./FormLembretes";

test("testa se o componente está renderizando corretamente", () => {
    render(
        <Provider store={store}>
            <FormLembretes />
        </Provider>
    )
})

test("cadastrar um novo lembrete deve chamar a função fetch com os dados do lembrete", async () => {
  const hoje = new Date();
  const cincoDiasDepois = new Date(hoje);
  cincoDiasDepois.setDate(cincoDiasDepois.getDate() + 5);

  const cincoDiasDepoisFormatado = formataData(cincoDiasDepois);

  // Mock da função fetch para simular uma resposta de sucesso
  const mockApiResponse = {
    id: 123,
    nome: "Lembrete Teste",
    dataLembrete: cincoDiasDepoisFormatado,
  };

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockApiResponse),
  });

  render(
    <Provider store={store}>
      <FormLembretes />
    </Provider>
  );

  // Atributos que estãos sendo manipulados/testados
  const nomeInput = screen.getByTestId("nomeLembreteInput");
  const dataInput = screen.getByTestId("dataLembreteInput");
  const criarButton = screen.getByTestId("botaoCriarLembrete");

  await act(async () => {
    fireEvent.change(nomeInput, {
      target: { value: "Lembrete Teste" },
    });
    fireEvent.change(dataInput, {
      target: { value: formataDataUSA(cincoDiasDepois) },
    });

    // Simule o clique no botão de criar
    fireEvent.click(criarButton);
  });

  // TODO testar
  // Aguarde a resposta simulada ser processada
  await act(async () => {
    const expectedBodyPattern = new RegExp(
        `"nome":"Lembrete Teste","dataLembrete":"${formataDataUSA(cincoDiasDepois)}"`,
        "g"
      );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5183/api/lembretes",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringMatching(expectedBodyPattern),
      })
    );
    // Aguarde um certo tempo ou utilize asserções para verificar o resultado do cadastro
  });
});

// Função para formatar a data como "dd-MM-yyyy"
const formataData = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

// Função para formatar a data como "yyyy-MM-dd"
const formataDataUSA = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
