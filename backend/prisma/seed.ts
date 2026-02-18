import prisma from "../src/config/prismaClient";

async function main() {
  console.log("Seeding database...");

  const quiz = await prisma.quiz.create({
    data: {
      title: "General Knowledge Quiz",
      questions: {
        create: [
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
          {
            text: "Which company is known for creating the iPhone?",
            type: "checkbox",
            options: JSON.stringify(["Microsoft", "Apple", "Google", "Samsung"]),
          },
          {
            text: 'What does "VPN" stand for in online security?',
            type: "checkbox",
            options: JSON.stringify([
              "Virtual Private Network",
              "Visual Protected Network",
              "Verified Personal Node",
              "Virtual Packet Network",
            ]),
          },
          {
            text: 'What is considered the "brain" of an Artificial Intelligence (AI) system?',
            type: "checkbox",
            options: JSON.stringify([
              "The physical robot body",
              "The internet connection",
              "Neural networks",
              "The hard drive",
            ]),
          },
          {
            text: "Which of these is NOT a web browser?",
            type: "checkbox",
            options: JSON.stringify(["Chrome", "Firefox", "Safari", "Python"]),
          },
          {
            text: "What year did the World Wide Web (WWW) become available to the public?",
            type: "checkbox",
            options: JSON.stringify(["1985", "1991", "1995", "2000"]),
          },
          {
            text: 'What does "IoT" stand for?',
            type: "checkbox",
            options: JSON.stringify([
              "Internet of Things",
              "Information over Technology",
              "Integrated open Tools",
              "Input on Terminals",
            ]),
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
