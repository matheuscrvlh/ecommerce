import type { StoreProduct } from '../models/store.model'

export const storeProductsMock: StoreProduct[] = [
  { id: 1, nome: 'Camiseta Essential', slug: 'camiseta-essential', marca: 'Nórdica', categoria: 'Roupas', preco: 89.9, precoComparativo: 119.9, cores: ['#0075ff', '#21d4fd'] },
  { id: 2, nome: 'Tênis Runner Pro', slug: 'tenis-runner-pro', marca: 'Vento', categoria: 'Calçados', preco: 399.9, cores: ['#7928ca', '#ff0080'] },
  { id: 3, nome: 'Mochila Urbana', slug: 'mochila-urbana', marca: 'Trilha', categoria: 'Acessórios', preco: 229.0, precoComparativo: 279.0, cores: ['#01b574', '#c9fbd5'] },
  { id: 4, nome: 'Fone Bluetooth Air', slug: 'fone-bluetooth-air', marca: 'Sonar', categoria: 'Eletrônicos', preco: 299.9, cores: ['#f6ad55', '#ff4d6d'] },
  { id: 5, nome: 'Jaqueta Corta-vento', slug: 'jaqueta-corta-vento', marca: 'Nórdica', categoria: 'Roupas', preco: 349.9, precoComparativo: 429.9, cores: ['#2c5282', '#4fd1c5'] },
  { id: 6, nome: 'Relógio Smart Fit', slug: 'relogio-smart-fit', marca: 'Sonar', categoria: 'Eletrônicos', preco: 599.0, cores: ['#1a1f37', '#0075ff'] },
  { id: 7, nome: 'Boné Classic', slug: 'bone-classic', marca: 'Trilha', categoria: 'Acessórios', preco: 69.9, cores: ['#e53e3e', '#f6ad55'] },
  { id: 8, nome: 'Sandália Conforto', slug: 'sandalia-conforto', marca: 'Vento', categoria: 'Calçados', preco: 129.9, precoComparativo: 159.9, cores: ['#805ad5', '#0075ff'] },
]
