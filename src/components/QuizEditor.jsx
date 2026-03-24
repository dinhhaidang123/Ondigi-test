import {useState} from "react";
import QuestionList from "./QuestionList.jsx";

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
    function addQuestion(e) {
        const newQuestion = {
            // Dùng timestamp làm ID duy nhất để React quản lý key không bị trùng khi thêm/xóa
            id : Date.now(),
            name: '',
            description:'',
            sortOrder: quiz.questions.length +1,
            options:[],
            correctAnswers:[]
        };
        setQuiz ({
            ...quiz,
            questions: [...quiz.questions, newQuestion]
        });
    }
    function deleteQuestion(d) {
        const confirmed = window.confirm("Are you sure");
        if (confirmed){
            setQuiz({
                ...quiz,
                questions: quiz.questions.filter(q=>q.id !==d)
            });
        }
    }
    function updateQuestion(id, field, newValue) {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((q) =>
                q.id === id ? { ...q, [field]: newValue } : q
            ),
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
            {/* Questions Section */}
            <QuestionList
                questions={quiz.questions}
                addQuestion={addQuestion}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
            />
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