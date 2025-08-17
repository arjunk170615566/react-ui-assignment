import React from 'react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
}

type Order = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = 'No data'
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [order, setOrder] = React.useState<Order>(null)
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const processed = React.useMemo(() => {
    if (!sortKey || !order) return data
    const col = columns.find(c => c.key === sortKey)
    if (!col) return data
    const idx = col.dataIndex as string
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[idx]
      const vb = b[idx]
      if (va == null && vb == null) return 0
      if (va == null) return -1
      if (vb == null) return 1
      if (typeof va === 'number' && typeof vb === 'number') {
        return order === 'asc' ? va - vb : vb - va
      }
      return order === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
    return copy
  }, [data, sortKey, order, columns])

  function toggleSort(key: string, enabled?: boolean) {
    if (!enabled) return
    setSortKey(prev => {
      if (prev !== key) {
        setOrder('asc')
        return key
      }
      setOrder(o => (o === 'asc' ? 'desc' : o === 'desc' ? null : 'asc'))
      return key
    })
  }

  function toggleRow(idx: number) {
    if (!selectable) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  React.useEffect(() => {
    if (onRowSelect) {
      const rows = [...selected].map(i => processed[i]).filter(Boolean)
      onRowSelect(rows)
    }
  }, [selected, processed, onRowSelect])

  return (
    <div className={clsx('w-full border rounded-2xl overflow-x-auto', loading && 'animate-pulse')} aria-busy={loading || undefined}>
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {selectable && <th className="px-3 py-2 w-10">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={processed.length > 0 && selected.size === processed.length}
                onChange={(e) => {
                  if (e.target.checked) setSelected(new Set(processed.map((_, i) => i)))
                  else setSelected(new Set())
                }}
              />
            </th>}
            {columns.map(col => (
              <th key={col.key} className="text-left px-3 py-2 font-medium select-none">
                <button
                  className={clsx('inline-flex items-center gap-1', col.sortable && 'cursor-pointer')}
                  onClick={() => toggleSort(col.key, col.sortable)}
                  aria-sort={sortKey === col.key ? (order ?? 'none') : 'none'}
                  aria-label={col.sortable ? `Sort by ${col.title}` : undefined}
                >
                  <span>{col.title}</span>
                  {col.sortable && sortKey === col.key && order && (
                    <span>{order === 'asc' ? '▲' : '▼'}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td className="px-3 py-6 text-center" colSpan={columns.length + (selectable ? 1 : 0)}>Loading…</td></tr>
          ) : processed.length === 0 ? (
            <tr><td className="px-3 py-6 text-center" colSpan={columns.length + (selectable ? 1 : 0)}>{emptyText}</td></tr>
          ) : processed.map((row, i) => (
            <tr key={i} className={clsx('border-t hover:bg-muted', selectable && 'cursor-pointer')} onClick={() => toggleRow(i)}>
              {selectable && (
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(i)}
                    onChange={() => toggleRow(i)}
                    aria-label={`Select row ${i + 1}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map(col => (
                <td key={col.key} className="px-3 py-2 whitespace-nowrap">
                  {col.render ? col.render(row[col.dataIndex], row) : String(row[col.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
