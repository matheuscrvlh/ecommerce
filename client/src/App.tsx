import { AuthProvider } from './contexts/AuthProvider'
import { CartProvider } from './contexts/CartProvider'
import { ThemeProvider } from './contexts/ThemeProvider'
import { AppRouter } from './routes/AppRouter'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
