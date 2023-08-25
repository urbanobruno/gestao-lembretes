import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carregarLembretes } from "../redux/actions";
import './FormLembretes.css'

const FormLembretes = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const lembretes = useSelector((state) => state.lembretes);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (nome && data) {

      // funcão necessário para pegar a hora de brasilia
      const getUTCDate = (date) => {
        const d = new Date(date);
        const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        return utcDate;
    }

      const dataSelecionada = getUTCDate(data);

      const dataAtual = new Date();

      if (dataSelecionada > dataAtual) {

        const novoLembrete = {
          nome: nome,
          dataLembrete: data,
        };

        const response = await fetch('http://localhost:5183/api/lembretes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoLembrete),
        });

        if (response.ok) {
          const novoLembreteCriado = await response.json();
          dispatch(carregarLembretes([...lembretes, novoLembreteCriado]));
          setNome("");
          setData("");
        } else {
          console.error('Erro ao criar o lembrete:', response.statusText);
        } 

      } else {
        alert("A data selecionada deve ser maior que a data atual.");
      }
    }
  };

  return (
    <div className="lembrete-form-card">
      <h2>Crie seu lembrete</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            data-testid="nomeLembreteInput"
            type="text"
            placeholder="Nome do lembrete"
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            data-testid="dataLembreteInput"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button data-testid="botaoCriarLembrete" className="button-criar-lembrete" type="submit">Criar</button>
      </form>
    </div>
  );
};

export default FormLembretes;
