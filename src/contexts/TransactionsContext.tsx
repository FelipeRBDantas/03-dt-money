import { createContext, useEffect, useState } from "react";

interface Transactions {
  id: number;
  title: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transactions[]
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function fetchTransactions(query?: string) {
    const url = new URL('http://localhost:3333/transactions')

    if (query) {
      url.searchParams.append('q', query)
    }

    const response = await fetch(url)

    const data: Transactions[] = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions, 
      fetchTransactions 
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}
