import { createSlice } from "@reduxjs/toolkit";

const questions = [
    {
        id: 1,
        question: "In which type of habitat does the Leopard primarily reside, showcasing its adaptability?",
        options: ["Tropical Rainforests", "Arctic Tundra", "Desert Ecosystems", "Grasslands"],
        answer: 0,
        image: '/leopard.jpg'
    },
    {
        id: 2,
        question: "What is the approximate top speed of the Cheetah, the fastest land animal?",
        options: ["10 mph", "50 mph", "75 mph", "120 mph"],
        answer: 2,
        image: '/cheetah.jpeg'
    },
    {
        id: 3,
        question: "Which characteristic is a notable adaptation of the fishing cat, found in wetland habitats?",
        options: ["Strong Climbing Ability", "Excellent Swimmer", "Camouflage Fur", "Nocturnal Behavior"],
        answer: 1,
        image: '/prionailurus.jpeg'
    },
    {
        id: 4,
        question: "What is the typical elevation range where the Snow Leopard is found, showcasing its preference for high altitudes?",
        options: ["Sea Level to 500 feet", "1,000 to 5,000 feet", "10,000 to 15,000 feet", "20,000 feet and above"],
        answer: 2,
        image: '/snow.jpeg'
    },
    {
        id: 5,
        question: "Which sense is highly developed in the Lynx, aiding its hunting in forested environments?",
        options: ["Sense of Taste", "Sense of Smell", "Sense of Touch", "Sense of Hearing"],
        answer: 3,
        image: '/lynx.jpeg'
    },
    {
        id: 6,
        question: "What is the primary diet of the Serval, a wild cat with distinctive large ears?",
        options: ["Fish", "Insects", "Small Mammals", "Plants"],
        answer: 2,
        image: '/serval.jpeg'
    }
];


const initialState = {
    questions,
    currentQuestionId: 1,
    status: 'start',
    points: 0,
    answeredQuestions: 0,
    answers: [],
    totalTime: 0
}


const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        submitAnswer(state, action){

            const { questionId, answerIndex } = action.payload;
            
            const question = state.questions.find((q) => q.id === +questionId);
            
            if (!question) {
              throw new Error(
                "Could not find question! Check to make sure you are passing the question id correctly."
              );
            }
      
            if (question.options[answerIndex] === undefined) {
              throw new Error(
                `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
              );
            }

            const isCorrect = question.answer === answerIndex;
      
            state.answers.push({
              questionId,
              answerIndex,
              question,
              answer: question.options[answerIndex],
              isCorrect
            });

            if (isCorrect) {
                state.points += 1;
            } else {
                state.points -= 1;
            }
        },
        timeIsOver(state, action){

            const { questionId } = action.payload;
            
            const question = state.questions.find((q) => q.id === +questionId);

            state.answers.push({
                questionId,
                answerIndex: null,
                question,
                answer: 'Time is up!',
                isCorrect: false
            });

            state.points -= 1;
        },
        goToNextQuestion(state, action){
            state.currentQuestionId += 1;
        },
        updateTotalTime(state, action){
            state.totalTime += action.payload;
        },
        restart(state, action){
            state.currentQuestionId = 1,
            state.status = 'start',
            state.points = 0,
            state.answeredQuestions = 0,
            state.totalTime = 0;
            state.answers = []
        },
        start(state, action){
            state.status = "active";
        },
        finish(state, action){
            state.status = "finish";
        }
    }
});

export default quizSlice.reducer;

export const { restart, start, finish, submitAnswer, timeIsOver, goToNextQuestion, updateTotalTime } = quizSlice.actions;

