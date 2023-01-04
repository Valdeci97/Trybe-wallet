/* eslint-disable react/no-multi-comp */
import React from 'react';
import TableData from './TableData';
import './table.css';

class Table extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr className="table-row">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Taxa de câmbio</th>
            <th>Valor convertido</th>
            <th>Editar - Excluir</th>
          </tr>
        </thead>
        <TableData />
      </table>
    );
  }
}

export default Table;

// Fonte sobre como montar tabela com react: https://www.youtube.com/watch?v=R6sRxQ9nd0A
