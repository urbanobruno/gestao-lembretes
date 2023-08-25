import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FormLembretes from "./componentes/FormLembretes";
import ListaLembretes from "./componentes/ListaLembretes";
import { carregarLembretes } from "./redux/actions";
import "./App.css";

const App = () => {
  const lembretes = useSelector((state) => state.lembretes);
  const dispatch = useDispatch();

  const getDatasDistintas = () => {
    
    // Slice para tirar o tempo e deixar somente a data
    const datas = lembretes.map((lembrete) => lembrete.dataLembrete.slice(0, 10));

    const diasDistintos = [...new Set(datas)];

    // Ordena as datas em ordem crescente
    diasDistintos.sort((a, b) => new Date(a) - new Date(b));

    return diasDistintos;
  };

  const handleExcluirLembrete = (id) => {
    // Chame a API para deletar o lembrete do banco de dados

    fetch(`http://localhost:5183/api/lembretes/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          // Atualize o store do Redux removendo o lembrete deletado
          const lembretesAtualizados = lembretes.filter(
            (lembrete) => lembrete.id !== id
          );
          dispatch(carregarLembretes(lembretesAtualizados));
        } else {
          console.error("Erro ao deletar o lembrete:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar o lembrete:", error);
      });

  };

  return (
    <div className="app-container">
      <FormLembretes />
      <ListaLembretes
        dias={getDatasDistintas()}
        lembretes={lembretes}
        excluirLembrete={handleExcluirLembrete}
      />
    </div>
  );
};

export default App;
