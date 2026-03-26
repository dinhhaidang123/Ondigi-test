import {useRef} from "react";
import {exQuiz,importQuiz} from "../utils/json.js";

function ImportExport({quiz, setQuiz}) {
    const fileInputRef = useRef(null);
    function handleExport() {
        exQuiz(quiz);
    }
    function handleImportClick(){
        fileInputRef.current.click();
    }
    function handleFileChange(e){
        const file =e.target.files[0];
        if(file){
            importQuiz(file , (data) => {
                setQuiz(data);
            });
        }
        e.target.value = '';
    }
    return(
        <div className={"exprot-improt"}>
            <h3>Import/Exprot</h3>
            <div className={"export-import-button"}>
                <button className={"btn-export"} onClick={handleExport} title={"Download json file"}>Export json</button>
                <button className={"btn-import"} onClick={handleImportClick} title={"Load json file"}>Import json </button>
                <input
                    ref={fileInputRef}
                    type={"file"}
                    accept={".json"}
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                />
            </div>
        </div>
    );
}
export default ImportExport;