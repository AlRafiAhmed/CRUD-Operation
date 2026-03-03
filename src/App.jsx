import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Read from './Read'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <BrowserRouter>
        <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50">
                Users Dashboard
              </h1>
              <p className="text-xs text-slate-400">
                Manage, search and maintain your user records
              </p>
            </div>
            <div className="inline-flex items-center justify-start sm:justify-end gap-2 text-[11px] text-slate-300">
              <span className="hidden sm:inline-block h-px w-6 bg-slate-700" />
              <span className="rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Creator:&nbsp;
                <span className="text-slate-50">Al Rafi Ahmed</span>
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/read/:id' element={<Read />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
