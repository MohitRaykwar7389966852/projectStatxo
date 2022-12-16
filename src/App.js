import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/navbar';

function App() {

  return (
    //main
    <div>
        {<Navbar/>}
        <div class="text-center m-5">
        <p class = "text-primary fs-1 fw-semibold">Welcome To StatXo</p>
        <p class="text-muted font-monospace fs-5">Hello users, Welcome to our website StatXo</p>
        <p class="text-muted font-monospace">Here you can upload your excel file easily and show the data in table format</p>
        </div>
        
    </div>
  );
}

export default App;
