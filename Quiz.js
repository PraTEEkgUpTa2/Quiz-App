const start_btn = document.querySelector(".strt-btn button");
const cont_btn = document.querySelector(".cont");
const exit_btn = document.querySelector(".exit");
const exit_btn2 = document.querySelector(".result-btn .exit");
const next_btn = document.querySelector(".next-btn");
const restart_btn = document.querySelector(".restart");
const info_box = document.querySelector(".Info-box");
const quiz_box = document.querySelector(".quiz-box");
const options_list = document.querySelector(".option-list");
const quiz = document.querySelector(".quiz");
const result_box = document.querySelector(".result-box");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo")
    start_btn.style.opacity = "0";
    quiz.style.opacity = "0";
}

cont_btn.onclick = () => {
    quiz_box.style.display = "block";
    info_box.classList.remove("activeInfo");
    showQuestion(0);
    showQuesNumber(1);
    next_btn.style.display ="none";
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    start_btn.style.opacity = "1";
    quiz.style.opacity = "1";
}



let que_count = 0;
let que_numb = 1;
let userScore = 0;

next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestion(que_count);
        showQuesNumber(que_numb);
    }
    else{
        console.log("Quiz is completed");
        showResult();
        quiz_box.style.display = "none";
    }
    next_btn.style.display ="none";
}

function showQuestion(index){
    const que_text = document.querySelector(".que-text");
    

    const que_tag = '<span>'+ questions[index].numb + '.' + questions[index].question +'</span>'
    const option_tag = '<div class="option">' + questions[index].options[0]
    +'<span></span></div>'
    + '<div class="option">' + questions[index].options[1]
    +'<span></span></div>'
    +'<div class="option">' + questions[index].options[2]
    +'<span></span></div>'
    +'<div class="option">' + questions[index].options[3]
    +'<span></span></div>'

    que_text.innerHTML = que_tag;
    options_list.innerHTML = option_tag;

    const option = options_list.querySelectorAll(".option");
    for(let i=0; i < option.length ; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function showQuesNumber(index){
      const bottom_quesNumb = document.querySelector(".total-ques");
      const bottom_quesTag = ' <span><p>' + index + '</p> of <p>' + questions.length + '</p>Questions</span>'

      bottom_quesNumb.innerHTML = bottom_quesTag;
}

let tickIcon = '<div class="icon right"><i class="fa-solid fa-check"></i></div>'
let crossIcon = ' <div class="icon wrong"><i class="fa-solid fa-xmark"></i></div>'

function optionSelected(answer){
    const userAns = answer.textContent;
    const correctAns = questions[que_count].answer;
    
    if(userAns == correctAns){
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        userScore++;
        console.log("Answer is correct")
    }
    else{
        answer.classList.add("Incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("Answer is Wrong")
    }

    for(let i = 0; i < options_list.children.length; i++){
        options_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";

}

function showResult(){
    result_box.style.display = "block";

    const score_Text = document.querySelector(".score");

    const score_Tag = 'Your Score is <p>' + userScore + '</p> out of <p>' + questions.length + '</p>';

    score_Text.innerHTML = score_Tag;

}

restart_btn.onclick = () => {
    quiz_box.style.display = "block";
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuestion(que_count);
    showQuesNumber(que_numb);
    result_box.style.display = "none";
} 

exit_btn2.onclick = () => {
    window.location.reload();
}