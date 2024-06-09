const { LitContent, MathContent } = require("../models/contentModel");
const { LitWord, MathWord } = require("../models/wordModel"); // get the Word Schema
const { LitActivity, MathActivity } = require("../models/activityModel");
const { Items } = require("../models/itemModel");

//function to extract text inside tags in questions
function extractStringInsideTags(inputString) {
  const regex = /<([^<>]+)>/;
  const match = inputString.match(regex);
  if (match) {
    return match[1]; // Return the string inside the <> tags
  } else {
    return null; // Return null if no match found
  }
}

// Function to get all weeks on input words screen
const getWeeks = async (req, res) => {
  try {
    const foundWeeks = await LitContent.find({});
    const weeks = foundWeeks.map((weekDoc) => weekDoc.name);
    res.status(200).json(weeks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all categories in a week on input words screen
const getCategoriesByWeek = async (req, res) => {
  const { course, week } = req.params;
  if (course != 'Mathematics' && course != 'Literacy') {
    return res.status(404).json({ error: "No such course exists" });
}
  try {
    let foundWeek; let categoryNames;
    if(course == "Literacy") {
      foundWeek = await LitContent.findOne({ name: week });
    categoryNames = foundWeek.category.map((catdoc) => catdoc.name); // Extract all the "name" attributes from the categories list
    }
    else {
      foundWeek = await MathContent.findOne({ name: week });
      categoryNames = foundWeek.category.map((catdoc) => catdoc.name); // Extract all the "name" attributes from the categories list
    }
    
    return res.status(200).json(categoryNames);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getActivityTypes = async (req, res) => {
  const { course } = req.params;

  if (course != "Mathematics" && course != "Literacy") {
    return res.status(404).json({ error: "No such course exists!" });
  }
  const pipeline = [
    {
      $unwind: "$category",
    },
    {
      $unwind: "$category.mcqs",
    },
    {
      $group: {
        _id: "$category.mcqs.type",
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id",
      },
    },
  ];
  try {
    let activityTypes;
    if (course == "Literacy") {
      const result = await LitContent.aggregate(pipeline);
      activityTypes = result.map((entry) => entry.type);
      return res.status(200).json(activityTypes);
    } else if (course == "Mathematics") {
      const result = await LitContent.aggregate(pipeline);
      activityTypes = result.map((entry) => entry.type);
      return res.status(200).json(activityTypes);
    }
    // return res.status(200).json(activityTypes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { week, categoryName, questionText } = req.body;

  try {
    const findWeek = await LitContent.findOne({ name: week });
    if (!findWeek) {
      return res.status(400).json("The week you specified does not exist!");
    }

    // If Week is found, find Category
    else {
      const findCategory = findWeek.category.find(
        (category) => category.name === categoryName
      );

      // If Category is not found, add it in the week along with the MCQ
      if (!findCategory) {
        return res
          .status(400)
          .json("The category you specified does not exist!");
      } else {
        // Find the index of the question to delete
        const questionIndex = findCategory.mcqs.findIndex(
          (mcqs) => mcqs.question === questionText
        );

        // If question is not found, return error or handle accordingly
        if (questionIndex === -1) {
          return res.status(400).json("Question not found");
        }

        // Remove the question from the mcqs array
        findCategory.mcqs.splice(questionIndex, 1);
      }
    }
    await findWeek.save();

    res.status(200).json("Question deleted succesfully!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to insert a new question in the database
/*
Case 1: Week is not found,
Case 2: Week is found, but Category isn't found,
Case 3: Both Week and Category are found
*/
const createQuestion = async (req, res) => {
  const { course, week, categoryName, question, type, options, answer, marks } =
    req.body;

  if (course != "Mathematics" && course != "Literacy") {
    return res.status(404).json({ error: "No such course exists!" });
  }

  try {
    // Create a new MCQ using the MCQ model
    const newMCQ = {
      question: question,
      type: type,
      options: options,
      answer: answer,
      marks: marks,
    };

    let findWeek;
    let contentDoc;
    if (course == "Mathematics") {
      findWeek = await MathContent.findOne({ name: week });
      // If Week is not found, add it in the database, along with Category and MCQ
      if (!findWeek) {
        contentDoc = await MathContent.create({
          name: week,
          category: [
            {
              name: categoryName,
              mcqs: [newMCQ],
            },
          ],
        });
      }

      // If Week is found, find Category
      else {
        let findCategory;
        findCategory = findWeek.category.find(
          (category) => category.name === categoryName
        );

        // If Category is not found, add it in the week along with the MCQ
        let newCategory = null;
        if (!findCategory) {
          newCategory = {
            name: categoryName,
            mcqs: [newMCQ],
          };

          // Push the new Category in the Content model
          findWeek.category.push(newCategory);
          await findWeek.save();
        }

        // If Category is found, push the MCQ in the mcqs array
        else {
          findCategory.mcqs.push(newMCQ);
          await findWeek.save();
        }
      }
    } else {
      findWeek = await LitContent.findOne({ name: week });
      // If Week is not found, add it in the database, along with Category and MCQ
      if (!findWeek) {
        contentDoc = await LitContent.create({
          name: week,
          category: [
            {
              name: categoryName,
              mcqs: [newMCQ],
            },
          ],
        });
      }

      // If Week is found, find Category
      else {
        let findCategory;
        findCategory = findWeek.category.find(
          (category) => category.name === categoryName
        );

        // If Category is not found, add it in the week along with the MCQ
        let newCategory = null;
        if (!findCategory) {
          newCategory = {
            name: categoryName,
            mcqs: [newMCQ],
          };

          // Push the new Category in the Content model
          findWeek.category.push(newCategory);
          await findWeek.save();
        }

        // If Category is found, push the MCQ in the mcqs array
        else {
          findCategory.mcqs.push(newMCQ);
          await findWeek.save();
        }
      }
    }

    res.status(200).json(newMCQ);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Returns 4 random gallaudet font options (including input word's gallaudet font)
const getOptions = async (
  course,
  property,
  data,
  category,
  foundWord,
  type
) => {
  // Construct the projection dynamically based on data
  const projection = {
    _id: 0,
  };
  projection[property] = 1;

  // Construct the match query dynamically to check for the property using $ne operator
  //matchQuery[property] = { $ne: data };
  let matchQuery;
  if (type == "MCQ") {
    matchQuery = {
      [property]: { $ne: data },
      category: category, // filter by category
    };
  } else if (type == "Match") {
    matchQuery = {
      [property]: { $ne: foundWord.name },
      category: category, // filter by category
    };
  }

  let options;
  if (course == "Literacy") {
    // Query to get 3 random words from the db
    options = await LitWord.aggregate([
      { $match: matchQuery }, // exclude the correct answer word using the dynamic query
      { $sample: { size: 3 } }, // get 3 random words
      { $project: projection },
    ]);
  } else {
    // Query to get 3 random words from the db
    options = await MathWord.aggregate([
      { $match: matchQuery }, // exclude the correct answer word using the dynamic query
      { $sample: { size: 3 } }, // get 3 random words
      { $project: projection },
    ]);
  }

  options = options.map((option) => option[property]);
  if (type == "Match") {
    options.push(foundWord.name);
  }
  options.push(data); // add the correct answer word's gallaudetfont to the array
  return options;
};

const checkTag = async (foundWord, tag) => {
  let data = null;
  if (tag == "name") {
    data = foundWord.name;
  } else if (tag == "image") {
    data = foundWord.image;
  } else if (tag == "signvideo") {
    data = foundWord.signvideo;
  } else if (tag == "gallaudetfont") {
    data = foundWord.gallaudetfont;
  }
  return data;
};

// get a random item from the Item collection
const matchTag = async () => {
  const items = await Items.find({});
  const randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem.image;
};

const getQuestion = async (
  course,
  foundWord,
  foundQuestion,
  category,
  questions,
  question_tag,
  answer_tag,
  type
) => {
  let data_a = null;
  let data_q = null;

  if (type == "MCQ") {
    data_a = await checkTag(foundWord, answer_tag); // Returns specific attribute of the answer tag
    options = await getOptions(
      course,
      answer_tag,
      data_a,
      category,
      foundWord,
      type
    ); // Gets options for the answer

    data_q = await checkTag(foundWord, question_tag); // Returns specific attribute of the question tag

    // Populate the questions array by filling the placeholders in the question
    questions.push({
      question: foundQuestion.question.replace(question_tag, data_q),
      type: type,
      options: options,
      answer: data_a,
      marks: 1,
    });
  } else if (type == "Match") {
    data_a = await matchTag();
    options = await getOptions(
      course,
      "name",
      data_a,
      category,
      foundWord,
      type
    );
    data_q = await checkTag(foundWord, question_tag);
    // Populate the questions array by filling the placeholders in the question
    questions.push({
      question: foundQuestion.question.replace(question_tag, data_q),
      type: type,
      options: options,
      answer: foundWord.name,
      marks: 1,
    });
  }
};

// const getRandomQuestionByType = (mcqs, activityType) => {
//   const filteredQuestions = mcqs.filter(
//     (question) => question.type === activityType
//   );
//   if (filteredQuestions.length > 0) {
//     // Get a random index within the range of filteredQuestions
//     const randomIndex = Math.floor(Math.random() * filteredQuestions.length);

//     // Get the random question object
//     const randomQuestion = filteredQuestions[randomIndex];

//     return randomQuestion;
//   } else {
//     return null;
//     //console.log("No questions found for the input type:", inputType);
//   }
// };

const populateQuestions = async (req, res) => {
  const { course, words, week, categoryName } = req.body; // Get the words input by teacher
  let foundWord = null;
  let foundQuestion = null;
  questions = [];

  if (course != "Mathematics" && course != "Literacy") {
    return res.status(404).json({ error: "No such course exists!" });
  }

  for (word of words) {
    try {
      let foundWord;
      let findWeek;
      if (course == "Literacy") {
        foundWord = await LitWord.findOne({ name: word });
        if (!foundWord) {
          // Skip to the next word if current word not found
          continue;
        }

        //find week
        findWeek = await LitContent.findOne({ name: week });
      } else {
        foundWord = await MathWord.findOne({ name: word });
        // console.log(foundWord);
        if (!foundWord) {
          // Skip to the next word if current word not found
          continue;
        }

        //find week
        findWeek = await MathContent.findOne({ name: week });
      }

      //find specific category
      const findCategory = findWeek.category.find(
        (category) => category.name === categoryName
      );

      //pick a random index from MCQs array and pick the mcq at that index
      const randomIndex = Math.floor(Math.random() * findCategory.mcqs.length);
      // Get the element at the random index
      foundQuestion = findCategory.mcqs[randomIndex];

      //console.log(foundQuestion);
      if (!foundQuestion) {
        // Skip to next word if question type doesnt exist for that word
        // console.log("q not found");
        continue;
      }

      /*
       doing for usability testing only (hard-coding). usability testing at school on 7th March 2024.
      */
       while (extractStringInsideTags(foundQuestion.question)=="signvideo" || foundQuestion.options[0]=="signvideo") {
        const randomIndex = Math.floor(Math.random() * findCategory.mcqs.length);
      // Get the element at the random index
      foundQuestion = findCategory.mcqs[randomIndex];
      }
    /* 
    */

      const question_tag = extractStringInsideTags(foundQuestion.question);
      const answer_tag = foundQuestion.options[0];
      const activityType = foundQuestion.type;

      // Dynamically call the appropriate question function based on the question number
      // await questionFunctions[foundQuestion.id](foundWord, foundQuestion, questions);
      await getQuestion(
        course,
        foundWord,
        foundQuestion,
        categoryName,
        questions,
        question_tag,
        answer_tag,
        activityType
      );
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    // if (!foundWord || !foundQuestion) {
    //   return res.status(400).json({ error: "No word or question found" });
    // }
  }

  res.status(201).json(questions);
};

// Function to add generate activity in the database
const publishActivity = async (req, res) => {
  const { name, course, category, questions, dueDate, show } = req.body; // get activity generated by teacher
  //console.log(category);
  if (course != "Literacy" && course != "Mathematics") {
    return res.status(404).json({ error: "No such course exists!" });
  }
  try {
    let activity;
    if (course == "Literacy") {
      activity = await LitActivity.create({
        name: name,
        category: category,
        questions: questions,
        dueDate: dueDate,
        show: show,
      });
    } else if (course == "Mathematics") {
      activity = await MathActivity.create({
        name: name,
        category: category,
        questions: questions,
        dueDate: dueDate,
        show: show,
      });
    }

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWeeks,
  getCategoriesByWeek,
  getActivityTypes,
  createQuestion,
  deleteQuestion,
  populateQuestions,
  publishActivity,
};
