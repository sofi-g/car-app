import './App.css';
import Lottie from "react-lottie";
import CarAnimation from './car-animation.json'
import Body from './components/Body'

function App() {
  const defaultOptions = {
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: CarAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Lottie options={defaultOptions} height={200} width={200} />  
        <Body></Body>
      </header>
    </div>
  );
}

export default App;
