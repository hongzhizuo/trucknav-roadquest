# TruckNav RoadQuest

RoadQuest is a small, dependency-free JavaScript engine that turns a set of
multiple-choice questions into a road-trip checkpoint quiz. Correct answers
move the truck to the next checkpoint; incorrect answers can be retried
immediately.

This repository includes:

- a product-training game created for [TruckNav UK](https://trucknav.co.uk/);
- a fictional barista onboarding example that demonstrates how the same engine
  can be reused with different content and branding.

**GitHub Pages demo:**
[https://hongzhizuo.github.io/trucknav-roadquest/](https://hongzhizuo.github.io/trucknav-roadquest/)

The demo becomes available after GitHub Pages is enabled for the `main` branch.

## Features

- No framework, package installation or build step
- Responsive HTML, CSS and JavaScript
- Configurable branding, colours, questions, explanations and calls to action
- Animated checkpoint journey, scoring, streaks and completion results
- Reusable configuration files with no changes to the engine

## Quick start

Include the stylesheet and engine, add a mount element, and pass a configuration
object to `RoadQuest.init`:

```html
<link rel="stylesheet" href="roadquest.css">

<div id="quest"></div>

<script src="roadquest.js"></script>
<script>
  RoadQuest.init('#quest', {
    brand: {
      name: 'Acme Training',
      tagline: 'Checkpoint quiz'
    },
    hero: {
      title: 'Training Quest',
      description: 'Answer each question to complete the journey.'
    },
    checkpoints: [
      {
        topic: 'Safety',
        badge: '1',
        question: 'Which answer is correct?',
        options: ['First answer', 'Second answer', 'Third answer'],
        correctIndex: 1,
        explanation: 'The second answer is correct.'
      }
    ]
  });
</script>
```

The first argument may be a CSS selector or a DOM element. Copy
`examples/trucknav.config.js` or `examples/barista.config.js` as a starting
point for a larger configuration.

## Configuration

| Field | Type | Purpose |
| --- | --- | --- |
| `theme` | object | Optional CSS theme colours such as `accent`, `good`, `bad`, `sky`, `grass` and `road` |
| `brand.name` | string | Brand name displayed in the game header |
| `brand.tagline` | string | Short label displayed below the brand name |
| `brand.iconSvg` | string | Optional trusted SVG markup for the brand mark |
| `hero` | object | Introductory title, description, image and start/finish copy |
| `notice` | string | Optional notice displayed above the game |
| `distanceUnit` | string | Unit used by the progress display |
| `stageLength` | number | Distance or progress added at each checkpoint |
| `routeStages` | string[] | Optional route label for each checkpoint |
| `cta` | object | Optional link with `href`, `label` and `finishLabel` |
| `facts` | object[] | Optional specification or detail rows with `label` and `value` |
| `footer` | string | Optional footer text |
| `checkpoints` | object[] | Required non-empty list of quiz checkpoints |
| `onComplete` | function | Optional callback receiving the final score and accuracy |

Each checkpoint supports:

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `question` | string | Yes | Question shown to the player |
| `options` | string[] | Yes | Available answers |
| `correctIndex` | number | Yes | Zero-based index of the correct answer |
| `topic` | string | No | Checkpoint category |
| `badge` | string | No | Short text displayed on the road sign |
| `explanation` | string | No | Feedback displayed after an answer |

## Project structure

```text
index.html                        demonstration page
roadquest.js                     reusable game engine
roadquest.css                    themeable game styles
examples/trucknav.config.js      TruckNav product-training configuration
examples/barista.config.js       fictional reusable example
LICENSE                          MIT License
```

## Product and safety notice

The TruckNav example is a training game and does not replace the supplied
product manual. Configure navigation equipment only while parked. Current road
signs, legal restrictions and real-world conditions always take priority over
any suggested route.

## License

The RoadQuest source code is licensed under the [MIT License](LICENSE).

The MIT License does not grant rights to use the TruckNav name, logos or other
trademarks. Product imagery and other third-party material remain subject to
their respective rights.
