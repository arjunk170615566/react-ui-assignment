import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '../components/DataTable'
import React from 'react'

type User = { id: number; name: string; email: string; age: number }
const data: User[] = [
  { id: 1, name: 'Aarav', email: 'aarav@example.com', age: 21 },
  { id: 2, name: 'Diya', email: 'diya@example.com', age: 24 },
  { id: 3, name: 'Kabir', email: 'kabir@example.com', age: 19 }
]

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof DataTable<User>>

export const Basic: Story = {
  render: () => (
    <div className="w-[720px]">
      <DataTable<User>
        data={data}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
        ]}
      />
    </div>
  )
}

export const Selectable: Story = {
  render: () => (
    <div className="w-[720px]">
      <DataTable<User>
        data={data}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
        ]}
        selectable
        onRowSelect={() => {}}
      />
    </div>
  )
}

export const Loading: Story = {
  render: () => (
    <div className="w-[720px]">
      <DataTable<User>
        data={[]}
        loading
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
        ]}
      />
    </div>
  )
}

export const Empty: Story = {
  render: () => (
    <div className="w-[720px]">
      <DataTable<User>
        data={[]}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
        ]}
      />
    </div>
  )
}
