document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('securityQuiz');
    const resultsContainer = document.getElementById('quiz-results');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const questions = document.querySelectorAll('.quiz-question');

    let currentQuestionIndex = 0;

    const correctAnswers = {
        q1: 'C',
        q2: 'B',
        q3: 'C',
        q4: 'B',
        q5: 'C',
        q6: 'B',
        q7: 'C',
        q8: 'B',
        q9: 'B',
        q10: 'C'
    };

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.remove('active');
            if (i === index) {
                q.classList.add('active');
            }
        });

        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        quizForm.reset();
        resultsContainer.style.display = 'none';
        restartBtn.style.display = 'none';
        quizForm.style.display = 'block';
        showQuestion(currentQuestionIndex);
    }

    nextBtn.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');

        if (selectedOption) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            alert('Please select an answer before proceeding.');
        }
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');

        if (!selectedOption) {
            alert('Please select an answer before submitting.');
            return;
        }

        let score = 0;
        const formData = new FormData(quizForm);

        for (const [key, value] of formData.entries()) {
            if (correctAnswers[key] === value) {
                score++;
            }
        }

        displayResults(score);
    });

    restartBtn.addEventListener('click', resetQuiz);

    function displayResults(score) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'block';

        const scoreText = document.createElement('p');
        scoreText.classList.add('score-text');

        if (score === 10) {
            scoreText.textContent = `🎉 Fantastic! You scored ${score} out of 10! You have a great grasp of these concepts.`;
            resultsContainer.classList.add('score-perfect');
        } else if (score >= 7) {
            scoreText.textContent = `Well done! You scored ${score} out of 10. You're almost there!`;
            resultsContainer.classList.add('score-good');
        } else {
            scoreText.textContent = `You scored ${score} out of 10. Keep studying, you'll get it next time!`;
            resultsContainer.classList.add('score-low');
        }

        resultsContainer.appendChild(scoreText);
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
        quizForm.style.display = 'none';
        restartBtn.style.display = 'block';
    }
});