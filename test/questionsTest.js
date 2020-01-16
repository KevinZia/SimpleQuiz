var assert = chai.assert;

describe('Tests', function() {
    // Seed some data for tests
    function Question(question, choices, answer){
        this.question = question;
        this.choices = choices;
        this.answer = answer;
      }

    var questions = 
    [
        new Question("Test", ["1", "2", "3", "4"], "1"),
        new Question("Test2", ["1", "2", "3", "4"], "1"),
        new Question("Test3", ["3", "4", "5", "6"], "6"),
        new Question("Test4", ["a", "b", "c", "d"], "c"),
        new Question("Test5", ["1", "2", "3", "4"], "1")
    ];

    // Execute tests
    it('should have length equal to questions', function() {
        assert.lengthOf(questions, 5);
    });
    it('should have question named test', function() {
        assert.include(questions[0].question, 'Test');
    });
    it('should contain 4 choices', function() {
        assert.lengthOf(questions[0].choices, 4);
    });
    it('should contain 1 answer', function() {
        assert.lengthOf(questions[0].answer, 1);
    });
    it('correct choice should be equal to answer', function() {
        assert.equal(questions[3].choices[2], questions[3].answer);
    });


    it('shuffled questions should not have same order as original array', function(){
        var copy = questions.slice(0, questions.length);
        function shuffleQuestions(array) {
            var i = array.length;
            while (i--) {
              const ri = Math.floor(Math.random() * (i + 1));
              [array[i], array[ri]] = [array[ri], array[i]];
            }
            return array;
          }
    
          shuffleQuestions(copy);

          assert.notSameOrderedMembers(questions, copy);
    });
});