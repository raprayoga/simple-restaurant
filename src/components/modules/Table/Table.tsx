import React from 'react'
import Card from '@/components/elements/Card'
import { OrderProps } from '@/components/templates/Order'

const tables = [1, 2, 3, 4, 5, 6]

interface TableProps
  extends React.HTMLAttributes<HTMLTableCaptionElement>,
    OrderProps {}

const Table = React.forwardRef<HTMLTableCaptionElement, TableProps>(
  ({ table, setTable, ...props }, ref) => {
    return (
      <div className="grid grid-cols-fill-12 gap-5" {...props} ref={ref}>
        {tables.map((tableNum, index) => (
          <Card
            key={tableNum}
            className="flex h-24 cursor-pointer items-center justify-center font-semibold transition-all hover:shadow hover:shadow-primary"
            theme={table === index ? 'primary' : 'white'}
            onClick={() => setTable(index)}
          >
            Meja {tableNum}
          </Card>
        ))}
      </div>
    )
  }
)
Table.displayName = 'Table'

export { Table }
