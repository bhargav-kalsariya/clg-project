import './App.css';
import { axiosClient } from './utilities/axiosClient';

function App() {
    async function loginUser() {

        const response = await axiosClient.post('/auth/login', {
            email: 'random@gmail.com',
            password: '134'
        });

        console.log(response);

    }

    loginUser();

    return (
        <div className="App">
            app
        </div>
    );
}

export default App;
