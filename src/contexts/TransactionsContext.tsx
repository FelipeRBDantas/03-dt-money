import { createContext, useEffect, useState } from "react";

import { api } from "../lib/axios";

interface Transactions {
  id: number;
  title: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  title: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { title, price, category, type } = data

    const response = await api.post('transactions', {
      title,
      price,
      category,
      type,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state])

    fetchTransactions()
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions, 
      fetchTransactions, 
      createTransaction 
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}
