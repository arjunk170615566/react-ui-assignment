import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '../components/DataTable'
import React from 'react'

type Row = { id: number; name: string; age: number }

const rows: Row[] = [
  { id: 1, name: 'A', age: 30 },
  { id: 2, name: 'B', age: 25 },
]

describe('DataTable', () => {
  it('renders rows and sorts', () => {
    render(<DataTable<Row>
      data={rows}
      columns={[
        { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
        { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
      ]}
    />)

    expect(screen.getByText('Name')).toBeInTheDocument()

    const sortBtn = screen.getByRole('button', { name: /sort by age/i })
    fireEvent.click(sortBtn) // asc
    fireEvent.click(sortBtn) // desc
  })

  it('selects rows', () => {
    const onRowSelect = vi.fn()
    render(<DataTable<Row>
      data={rows}
      columns={[
        { key: 'name', title: 'Name', dataIndex: 'name' },
        { key: 'age', title: 'Age', dataIndex: 'age' },
      ]}
      selectable
      onRowSelect={onRowSelect}
    />)

    const checkbox = screen.getByLabelText('Select row 1')
    fireEvent.click(checkbox)
    expect(onRowSelect).toHaveBeenCalled()
  })
})
