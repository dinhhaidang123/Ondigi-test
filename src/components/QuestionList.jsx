function QuestionList({ questions, addQuestion, updateQuestion, deleteQuestion }) {

    return (
        <div className="questions-section">
            <div className="section-header">
                <h2>Questions</h2>
                <button className="btn-primary" onClick={addQuestion}>
                     Add Question
                </button>
            </div>

            {questions.length === 0 ? (
                <p className="no-questions">
                    No questions
                </p>
            ) : (
                <div className="questions-list">
                    {questions.map((question, index) => (
                        <div key={question.id} className="question-item">
                            <h3>Question #{index + 1}</h3>

                            {/* Question Name */}
                            <div className="group">
                                <label>Question Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter question name"
                                    value={question.name}
                                    onChange={(e) => updateQuestion(question.id, 'name', e.target.value)}
                                />
                            </div>

                            {/* Question Description */}
                            <div className="group">
                                <label>Description:</label>
                                <textarea
                                    placeholder="Enter question description"
                                    value={question.description}
                                    onChange={(e) => updateQuestion(question.id, 'description', e.target.value)}
                                    rows="2"
                                />
                            </div>

                            {/* Sort Order */}
                            <div className="group">
                                <label>Sort Order:</label>
                                <input
                                    type="number"
                                    value={question.sortOrder}
                                    onChange={(e) => updateQuestion(question.id, 'sortOrder', parseInt(e.target.value))}
                                />
                            </div>

                            {/* Delete Button */}
                            <button
                                className="btn-danger"
                                onClick={() => deleteQuestion(question.id)}
                            >
                                Delete Question
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QuestionList;