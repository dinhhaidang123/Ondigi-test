function OptionList({questionId, options, correctAnswers, addOption, updateOption, deleteOption, toggleCorrectAnswer}) {
    return(
        <div className={"options-section"}>
            <div className={"options-header"}>
                <h4>Option</h4>
                <button className={"btn-secondary"} onClick={()=> addOption(questionId)}>
                    Add Option
                </button>
            </div>

            {options.length === 0 ? (<p className={"no-option"}>No Option</p>):(
                <div className={"option-list"}>
                    {options.map((option,index) =>(
                        <div key={option.id} className={"option-item"}>
                            <div className={"option-listHeader"}>
                                <span className={"option-number"}>Options #{index+1}</span>
                            </div>
                    <div className={"option-fields"}>
                        {/*input*/}
                        <div className={"option-field"}>
                            <label >Value:</label>
                            <input
                                type={"text"}
                                placeholder={"A"}
                                value={option.value}
                                onChange={(e) => updateOption(questionId, option.id, 'value', e.target.value)}
                            />
                        </div>
                        {/*label input*/}
                        <div className={"option-label"}>
                            <label>Label:</label>
                            <input
                                type={"text"}
                                value={option.label}
                                placeholder={"Enter Label"}
                                onChange={(e) => updateOption(questionId, option.id , 'label', e.target.value)}
                            />
                        </div>

                        {/*sort order input*/}
                        <div className={"option-field"}>
                            <label>Sort:</label>
                            <input
                                type={"number"}
                                placeholder={"enter sort order input"}
                                value={option.sortOrder}
                                onChange={(e)=> updateOption(questionId, option.id , 'sortOrder', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className={"option-action"}>
                        {/*correct answer check box*/}
                        <label className={"checkbox-label"}>
                            <input
                                type={"checkbox"}
                                checked={correctAnswers.includes(option.value)}
                                onChange={()=> toggleCorrectAnswer(questionId,option.value) }
                            />
                            <span>Correct Answer</span>
                        </label>
                        {/*delete button*/}
                        <button className={"btn-delete-small"} onClick={()=> deleteOption(questionId, option.id)} >
                            Delete option
                        </button>
                    </div>
                        </div>
                        ))
                    }
                </div>
            )}
            {/* Validation Warning */}
            { options.length >0 && options.length < 2 && (
                <p className={"validation warning"}>Please add 2 option</p>
    )}
            {options.length >= 2 && correctAnswers.length === 0 && (
                <p className="validation-warning">Please select 1 correct answer</p>
    )}
        </div>
    );
}
export default OptionList;