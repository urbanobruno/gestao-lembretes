import React from 'react';
import LembretesDoDia from './LembretesDoDia';
import './ListaLembretes.css'

const ListaLembretes = ({ dias, lembretes, excluirLembrete }) => {
  
  return (
    <div className="lembrete-list-card">
      <h2>Seus Lembretes</h2>

      {dias.map((dia) => (
        <LembretesDoDia key={dia} dia={formatarDataBrasileira(dia)} lembretesDia={lembretes.filter((lembrete) => formataDataSemHora(lembrete.dataLembrete) === dia)} excluirLembrete={excluirLembrete} />
      ))}
    </div>
  );
};

// Pega a data da dataLembrete sem a hora para comparação
const formataDataSemHora = (data) => {
  return data.slice(0, 10);
};

// Formata a data dd-MM-yyyy
const formatarDataBrasileira = (data) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}-${mes}-${ano}`;
};

export default ListaLembretes;
