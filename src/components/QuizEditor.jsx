import {useState} from "react";

function QuizEditor() {
    const [quiz, setQuiz]= useState({
        name:'',
        description:'',
        questions:[]
    })
    function handleNameChange(e) {
        const newValue = e.target.value;
        setQuiz({
            ...quiz,
            name: newValue
        });
    }
    function handleDescription(e){
        const newValue2 = e.target.value;
        setQuiz({
            ...quiz,
            description: newValue2
        });
    }
    return(
        <div className="quiz-editor">
            <h1>Quiz Information</h1>

            {/*Nhập tên quiz*/}
            <div className="group">
                <label>Tên Quiz</label>
                <input
                type={"text"}
                placeholder={"Enter Quiz Name"}
                value={quiz.name}
                onChange={handleNameChange}
                />

            </div>
            {/*Nhập description*/}
            <div className={"group"}>
                <label>Description</label>
                <textarea
                    type={"text"}
                    placeholder={"Enter Description"}
                    value={quiz.description}
                    onChange={handleDescription}
                    rows={"3"}
                />
            </div>
            {/*view jason*/}
            <div className={"preview"}>
                <h3>Preview Data</h3>
                <pre>
                    {JSON.stringify(quiz,null,2)}
                </pre>
            </div>

        </div>
    )
}

export default QuizEditor