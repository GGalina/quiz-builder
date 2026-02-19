import prisma from "../src/config/prismaClient";

async function main() {
  console.log("Seeding database...");

  const quiz = await prisma.quiz.create({
    data: {
      title: "Mixed Question Types Quiz",
      questions: {
        create: [
          // Checkbox question
          {
            text: 'What does "CPU" stand for in computing?',
            type: "checkbox",
            options: JSON.stringify([
              "Central Processing Unit",
              "Computer Personal Unit",
              "Central Peripheral Unit",
              "Core Processing Utility",
            ]),
          },
          // Boolean question
          {
            text: "Is React a frontend framework?",
            type: "boolean",
            // answer will be filled by frontend on quiz attempt
          },
          // Input question
          {
            text: "What is the capital of France?",
            type: "input",
            // answer will be filled by frontend on quiz attempt
          },
          // Another checkbox
          {
            text: "Select programming languages:",
            type: "checkbox",
            options: JSON.stringify(["Python", "HTML", "JavaScript", "CSS"]),
          },
          // Another boolean
          {
            text: "Does 2 + 2 equal 4?",
            type: "boolean",
          },
          // Another input
          {
            text: "Name a planet in our solar system that starts with 'M'.",
            type: "input",
          },
        ],
      },
    },
    include: { questions: true },
  });

  console.log("Seeded quiz:", quiz.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
