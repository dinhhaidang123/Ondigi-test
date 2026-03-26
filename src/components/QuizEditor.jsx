import {useState} from "react";
import QuestionList from "./QuestionList.jsx";
import ImportExport from "./ImportExport.jsx";

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
    function addOption(questionId) {
        const newOption ={
            id: Date.now(),
            value: '',
            label: '',
            sortOrder: 0
        };
        setQuiz(
            {
                ...quiz,
                questions: quiz.questions.map((q)=> q.id === questionId ? {...q , options: [...q .options, newOption]}:q),
            }
        );
    }

    function updateOption(questionId, optionId, field , value ) {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((q)=> q.id === questionId ? {
                ...q,
                options: q.options.map((opt)=> opt.id === optionId ? {...opt, [field]: value  } :opt ),
            } :q ),
        });
    }

    function deleteOption(questionId, optionId){
        const confirmed = window.confirm("Are you sure you want to delete this option?");
        if(confirmed){
            setQuiz({
                ...quiz,questions: quiz.questions.map((q)=> q.id ===questionId ? {
                    ...q,
                    options: q.options.filter((opt )=> opt.id !== optionId),
                    // Xóa option value khỏi correctAnswers nếu có
                    correctAnswers: q.correctAnswers.filter((ans)=> ans !== q.options.find((opt)=> opt.id ===optionId)?.value ),
                } :q ),
            });
        }
    }
    // Toggle correct answer
    function toggleCorrectAnswer(questionId, optionValue) {
        setQuiz({
            ...quiz,
            questions: quiz.questions.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        correctAnswers: q.correctAnswers.includes(optionValue)
                            ? q.correctAnswers.filter((ans) => ans !== optionValue) // Bỏ chọn
                            : [...q.correctAnswers, optionValue], // Thêm
                    }
                    : q
            ),
        });
    }
    return(
        <div className="quiz-editor">
            <h1>Quiz Information</h1>
            <ImportExport quiz={quiz} setQuiz={setQuiz}/>

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
                addOption={addOption}
                updateOption={updateOption}
                deleteOption={deleteOption}
                toggleCorrectAnswer={toggleCorrectAnswer}
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