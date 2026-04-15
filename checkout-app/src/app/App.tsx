import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CheckoutPage from "../pages/CheckoutPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import { OfflineBanner } from "../components/ui/OfflineBanner";
import NotificationCenter from "../components/ui/NotificationCenter"; // ✅ ADD

export default function App() {
  const location = useLocation();

  return (
    <>
      {/* 🌐 GLOBAL COMPONENTS */}
      <OfflineBanner />
      <NotificationCenter /> {/* 🔥 FIX: GLOBAL TOASTS */}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
            <Route path="/" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}