import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';

$(document).ready(function () {
  
  $(".button").on("click", "button", function() {
    const category = $("#category").val();
    const difficulty = $("#difficulty").val();
    let url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        displayQuestions(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function displayQuestions(response) {
      const questionsArray = response.results;
      questionsArray.forEach((element) => {
        let incorrectAnswersArray = element.incorrect_answers;
        let question = element.question;
        let htmlString = `<p>${question}</p><div class="form-group">`;
        htmlString += `<div class="form-check"><input class="form-check-input answers" type="radio" value="correct" id="${element.correct_answer}"><label class="form-check-label" for="${element.correct_answer}">${element.correct_answer}</label></div>`;
        incorrectAnswersArray.forEach((element) => {
          htmlString += `<div class="form-check"><input class="form-check-input answers" type="radio" value="incorrect" id="${element}"><label class="form-check-label" for="${element}">${element}</label></div>`;
        });
        htmlString += "</div>";
        $("#show").append(htmlString);
      });
    }
  });
});