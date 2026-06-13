import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from "./pages/Login"
import PaymentSuccess from "./pages/PaymentSuccess"
import PaymentFail from "./pages/PaymentFail"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-fail" element={<PaymentFail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
