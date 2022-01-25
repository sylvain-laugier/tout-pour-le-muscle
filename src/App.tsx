import { useCallback } from 'react';
import './App.css';
import { FileDrop } from 'react-file-drop';
import FileInfo from './components/FileInfo';
import { useFitData } from './utils/useFitData';
import GraphContainer from './components/GraphContainer';
import { H2 } from './components/HtmlTags';

function App() {
  const [fitDataService, setFileToFitData] = useFitData();
  const onFileDrop = useCallback(
    (files) => {
      const [csv] = files;
      setFileToFitData(csv);
    },
    [setFileToFitData]
  );

  return (
    <div className="App">
      <h1 className="text-6xl font-cursive my-5 text-indigo-700 tracking-wide">
        Tout pour le muscle !
      </h1>
      <div>
        <H2> Dépose le fichier ici BG</H2>
        {fitDataService && <FileInfo />}
        <FileDrop onDrop={onFileDrop} />

        {fitDataService && <GraphContainer />}
      </div>
    </div>
  );
}

export default App;
