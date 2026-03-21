import QuizEditor from "./components/QuizEditor.jsx";
import './App.css';

function App(){

  return(
      <div className={"App"}>
        <header>
          <h1>Quiz Editor</h1>
          <p>Create your quiz</p>
        </header>
        <main>
          <QuizEditor/>
        </main>
      </div>
  )
}
export default App