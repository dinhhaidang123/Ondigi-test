export function exQuiz(quiz){
    if(!quiz.name||quiz.name.trim() === ''){
        alert("Please entern quiz name");
        return;
    }
    if(!quiz.description||quiz.description.trim() === ''){
        alert("Please entern quiz description");
        return;
    }
    if(!quiz.questions||quiz.questions.length === 0){
        alert("Please entern some questions");
        return;
    }
    for(let i = 0 ;i < quiz.questions.length; i++){
        const a = quiz.questions[i];
        if(!a.options||a.options.length < 2){
            alert("Please entern 2 options");
            return;
        }
        if(!a.correctAnswers||a.correctAnswers.length === 0){
            alert("Please entern select correct answer");
            return;
        }
        if(!a.name||a.name.trim() ===''){
            alert("Please entern question name ");
            return;
        }
        if(!a.description||a.description.trim()===''){
            alert("Please entern question description");
            return;
        }
        for (let j = 0; j < a.options.length; j++){
            const opt = a.options[j];
            if (!opt.value||opt.value.trim() === '') {
                alert(`There is a question with no value entered.`);
                return;
            }
            if (!opt.label||opt.label.trim() === '') {
                alert(`The question has no content.`);
                return;
            }
        }
    }
    const json = JSON.stringify(quiz, null , 2);
    const blob = new Blob ([json], { type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download= `${quiz.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
export function importQuiz(file, callback){
    if(!file.name.endsWith('.json')){
        alert("please select a json file");
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) =>{
        try{
            const data = JSON.parse(e.target.result);
            if(!validateQuiz(data)){
                alert("Please check json file");
                return;
            }
            callback(data);
            alert('Quiz import success');
        }
        catch (error){
            alert('invalid json file ');
        }
    };
    reader.readAsText(file);
}
function validateQuiz(quiz) {
    if (!quiz || typeof quiz !== 'object') {
        return false;
    }
    if (typeof quiz.name !== 'string') {
        return false;
    }
    if (typeof quiz.description !== 'string') {
        return false;
    }
    for (const question of quiz.questions) {
        if (!validateQuestion(question)) {
            return false;
        }

    }
    return true;
}
function validateQuestion(question) {
        if(!question || typeof  question !=='object'){
            return false;
        }
        if(typeof question.name !== 'string')
        {
            return false;
        }
        if(typeof question.description !== 'string'){
            return false;
        }
        if(typeof question.sortOrder !=='number'){
            return false;
        }
        if(!Array.isArray(question.options)){
            return false;
        }
        for(const option of question.options){
            if(!validateOption(option)){
                return false;
            }
        }
        return true;
}
function validateOption(option) {
        if(!option|| typeof option !== 'object'){
            return false;
        }
        if(typeof option.value !== 'string'){
            return false;
        }
        if(typeof option.label !== 'string'){
            return false;
        }
        if(typeof option.sortOrder !== 'number'){
            return false;
        }
    return true;
}    
