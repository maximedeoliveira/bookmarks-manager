import { AppProvider } from '@/providers/AppProvider'
import Header from '@/components/Header'
import Grid from '@/components/Grid'
import '@/styles/index.css'

const App = () => {
    return (
        <div className="container">
            <AppProvider>
                <Header />
                <Grid />
            </AppProvider>
        </div>
    )
}

export default App
