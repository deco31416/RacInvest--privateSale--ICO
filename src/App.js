import HeaderComponent from "./components/Header";
import Presale from "./components/Presale";
import ShapeDivider from "./components/ShapeDivider";
import FooterComponent from './components/Footer';
import { useContext, useEffect, useState } from "react";
import { GlobalProvider } from "./context/GlobalContext";

import Particles from "react-tsparticles";
import { loadFull } from 'tsparticles'
import AlertBox from "./components/AlertBox";

function App() {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  useEffect(() => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
    }

  }, []);
  return (
    <GlobalProvider>

      <div className="container mx-auto px-10 max-w-7xl">
        <div className="min-h-screen">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              fpsLimit: 24,
              interactivity: {
                events: {
                  onClick: {
                    enable: false,
                    mode: "push",
                  },
                  onHover: {
                    enable: false,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.1,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1200,
                  },
                  value: 100,
                },
                opacity: {
                  value: 0.1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
          <HeaderComponent setError={setError} setErrMsg={setErrMsg}/>
          {/* <ShapeDivider /> */}
          <Presale />
        </div>
      </div>
      {error && (<AlertBox  msg={errMsg}/>)}
      <FooterComponent />
    </GlobalProvider>
  );
}

export default App;
