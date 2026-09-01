/*!
 * Example RoadQuest config: a fictional "espresso machine onboarding"
 * quiz, included purely to demonstrate that the engine is reusable
 * for any subject — not just TruckNav.
 */
window.BARISTA_CONFIG = {
  theme: {
    accent: '#c98a3d',
    good: '#3f7d52',
    bad: '#a4402f',
    sky: '#f0e2c9',
    grass: '#8a6b45',
    road: '#3a2e26'
  },
  brand: {
    name: 'Espresso Academy',
    tagline: 'Barista onboarding quest'
  },
  hero: {
    eyebrow: '6 checkpoints · new hire training',
    title: 'Barista Basics Quest',
    description: 'A sample RoadQuest instance: walk through a fictional espresso machine onboarding course, checkpoint by checkpoint.',
    startTitle: 'Ready to train?',
    startDescription: 'Answer six onboarding questions correctly to finish the shift.',
    finishTitle: 'Shift complete',
    finishDescription: 'This is a demo config — copy examples/barista.config.js as a starting point for your own quiz.'
  },
  distanceUnit: 'stops',
  stageLength: 1,
  routeStages: ['Prep station', 'Prep station', 'Espresso bar', 'Espresso bar', 'Front counter', 'Front counter'],
  checkpoints: [
    { topic: 'Grind size', badge: '1', question: 'What should you do if espresso pulls too fast (under 20s)?', options: ['Grind finer', 'Grind coarser', 'Use more water'], correctIndex: 0, explanation: 'A finer grind slows extraction and brings back balance.' },
    { topic: 'Tamping', badge: '2', question: 'What is the goal of tamping the grounds?', options: ['Make the puck as loose as possible', 'Create an even, level surface for water to pass through', 'Cool the grounds down'], correctIndex: 1, explanation: 'An even tamp prevents channeling, where water finds the path of least resistance.' },
    { topic: 'Milk steaming', badge: '3', question: 'Where should the steam wand tip sit when texturing milk?', options: ['Deep in the pitcher', 'Just under the surface', 'Above the milk entirely'], correctIndex: 1, explanation: 'Just under the surface introduces air to build microfoam without large bubbles.' },
    { topic: 'Cleaning', badge: '4', question: 'How often should the group head be backflushed with a blind basket?', options: ['Once a month', 'Daily, per house procedure', 'Never, it damages the machine'], correctIndex: 1, explanation: 'Regular backflushing clears coffee oils that turn rancid and affect flavour.' },
    { topic: 'Customer service', badge: '5', question: 'A customer says their oat milk latte tastes off. What do you do first?', options: ['Argue that the recipe is correct', 'Apologise, ask what tastes wrong, and offer to remake it', 'Ignore it and move to the next order'], correctIndex: 1, explanation: 'Listening first lets you fix the actual problem, not just the symptom.' },
    { topic: 'Safety', badge: '6', question: 'What is the first thing to do if you smell gas near the machine?', options: ['Keep working and mention it later', 'Turn off equipment, evacuate the area and alert a manager', 'Spray the area with water'], correctIndex: 1, explanation: 'Gas smells are treated as an immediate safety issue, not a routine fix.' }
  ]
};
