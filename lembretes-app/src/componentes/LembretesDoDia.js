import React from 'react';
import './LembretesDoDia.css'

const LembretesDoDia = ({ dia, lembretesDia, excluirLembrete }) => {

  return (
    <div>
      <h2>{dia}</h2>
      <ul className="lembrete-list">
        {lembretesDia.map((lembrete) => (
          <li key={lembrete.id} className='lembrete-item'>
            {lembrete.nome}
            <button className='button-delete-lembrete' onClick={() => excluirLembrete(lembrete.id)}>X</button>
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default LembretesDoDia;
