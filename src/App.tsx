import React from 'react'
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'

type User = { id: number; name: string; email: string; age: number }

const sample: User[] = [
  { id: 1, name: 'Aarav', email: 'aarav@example.com', age: 21 },
  { id: 2, name: 'Diya', email: 'diya@example.com', age: 24 },
  { id: 3, name: 'Kabir', email: 'kabir@example.com', age: 19 }
]

export default function App() {
  const [value, setValue] = React.useState('')
  const [selected, setSelected] = React.useState<User[]>([])


  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <button onClick={toggleTheme} className="px-4 py-2 rounded-xl bg-brand text-white shadow-soft hover:bg-brand-hover transition">Toggle theme (Current: {theme})</button>
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">InputField Demo</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField
            label="Your name"
            placeholder="Type here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            helperText="This is helper text."
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            variant="filled"
            size="lg"
            type="password"
            helperText="Use 8+ characters."
            clearable
            passwordToggle
          />
          <InputField
            label="Invalid"
            placeholder="Wrong value"
            invalid
            errorMessage="Please correct this field."
          />
          <InputField
            label="Loading"
            placeholder="Fetching..."
            loading
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">DataTable Demo</h2>
        <DataTable<User>
          data={sample}
          columns={[
            { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
            { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
            { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
          ]}
          selectable
          onRowSelect={setSelected}
        />

        <div className="text-sm text-gray-600">
          Selected rows: {selected.map((r) => r.name).join(', ') || 'none'}
        </div>
      </section>
    </div>
  )
}
