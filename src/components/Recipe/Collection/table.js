import React, {  useState, useEffect, useMemo } from 'react'
import { useHistory } from "react-router-dom";
import { supabase } from '../../../supabase'
import { useTable } from 'react-table'
import { Styles, StyledTr } from './index.styles'
import { blue } from '@ant-design/colors';

const Table = ({columns, data}) => {

  // TODO: add sorting filter to table

    const history = useHistory()

    const handleClick = (id) => {
        console.log('uuid', id)
        history.push({
            pathname: '/recipe',
            state: {
                recipeId: id
            }
        });
    }

    const formatCell = (cell) => {
      let Content = cell.value
  
      if (cell.column.Header === 'Cooking Time') {
        return (
          <span>
            {Content + ' minutes'}
          </span>
        )
      } else if (cell.column.Header === 'Name') {
        return (
          <span style={{ fontWeight: 600 }}>
            {Content}
          </span>
        )
      } else {
        return Content
      }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
    return (
      <Styles>
            <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <StyledTr {...row.getRowProps()} onClick={() => {handleClick(row.original.id); console.log('row', row)}}>
                    {row.cells.map(cell => {
                      console.log('cell', cell)
                      return (
                        <td
                          {...cell.getCellProps()}
                        >
                         {formatCell(cell)}
                        </td>
                      )
                    })}
                  </StyledTr>
                )
              })}
            </tbody>
          </table>
          </Styles>
    );
};

export default Table;