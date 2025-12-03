"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Filter, BookOpen, Wind, Headphones, X, Trash2, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Head } from "@inertiajs/react"
import DashboardTopNav from "@/components/dashboard-top-nav"

//

const products = [
  {
    id: 1,
    name: "Mood Journal Pro",
    description: "Template jurnal premium",
    price: 49000,
    category: "Journal",
    icon: BookOpen,
    color: "bg-purple-500"
  },
  {
    id: 2,
    name: "Breathing Pack",
    description: "Panduan 4-7-8 & box breathing",
    price: 29000,
    category: "Breathing",
    icon: Wind,
    color: "bg-yellow-500"
  },
  {
    id: 3,
    name: "Mindfulness Audio",
    description: "Audio 10 menit fokus napas",
    price: 39000,
    category: "Audio",
    icon: Headphones,
    color: "bg-blue-500"
  }
]

type CartItem = {
  productId: number
  quantity: number
}

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua")
  const [isCartOpen, setIsCartOpen] = useState(false)
  

  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.productId === productId)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { productId, quantity: 1 }])
    }
    
    const product = products.find(p => p.id === productId)
    toast.success(`${product?.name} ditambahkan ke keranjang!`, {
      duration: 2000,
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId))
    const product = products.find(p => p.id === productId)
    toast.info(`${product?.name} dihapus dari keranjang`, {
      duration: 2000,
    })
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta
        if (newQuantity <= 0) {
          removeFromCart(productId)
          return item
        }
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const filteredProducts = selectedCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    return sum + (product?.price || 0) * item.quantity
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      <Head title="Shop" />
      <DashboardTopNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Toko Mental Health</h1>
              <p className="text-gray-600">Dapatkan item pendukung kesehatan mental kamu</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-6 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2">
            {["Semua", "Journal", "Breathing", "Audio"].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  className={`cursor-pointer px-4 py-2 transition-all ${
                    selectedCategory === category 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => {
              const IconComponent = product.icon
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-xl ${product.color} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600">
                            {product.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <div className="text-xl font-bold text-gray-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => addToCart(product.id)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Beli
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Additional Products Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Produk Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardContent className="text-center py-12">
                  <motion.div 
                    className="mb-3 text-4xl"
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    🎁
                  </motion.div>
                  <p className="text-gray-600 font-medium mb-4">Produk baru segera hadir</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                      Beritahu Saya
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Keranjang Belanja</h2>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🛒
                    </motion.div>
                    <p className="text-gray-600 font-medium">Keranjang masih kosong</p>
                    <p className="text-gray-400 text-sm mt-2">Yuk mulai belanja produk kesehatan mental!</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    layout
                  >
                    <AnimatePresence mode="popLayout">
                      {cart.map((item, index) => {
                        const product = products.find(p => p.id === item.productId)
                        if (!product) return null
                        const IconComponent = product.icon

                        return (
                          <motion.div
                            key={item.productId}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-200"
                          >
                            <motion.div 
                              className={`w-16 h-16 rounded-lg ${product.color} flex items-center justify-center flex-shrink-0`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent className="h-7 w-7 text-white" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 border border-gray-200">
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.productId, -1)}
                                    className="w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </motion.button>
                                  <motion.span 
                                    key={item.quantity}
                                    initial={{ scale: 1.5 }}
                                    animate={{ scale: 1 }}
                                    className="text-sm font-medium w-6 text-center"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.productId, 1)}
                                    className="w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </motion.button>
                                </div>
                                <p className="font-bold text-gray-900">
                                  Rp {(product.price * item.quantity).toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <motion.div 
                  className="border-t border-gray-200 p-6 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({totalItems} item)</span>
                      <span className="font-medium text-gray-900">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <motion.span 
                        className="text-purple-600"
                        key={totalPrice}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </motion.span>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base font-semibold"
                      onClick={() => {
                        toast.success("Checkout berhasil! Terima kasih sudah berbelanja", {
                          duration: 3000,
                        })
                        setCart([])
                        setIsCartOpen(false)
                      }}
                    >
                      Checkout Sekarang
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 MindPath Mental Health Shop. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}
