/*!
 * Example RoadQuest config: product training quiz for a 7" HGV
 * navigator, used on trucknav.co.uk.
 * This file only contains data — see ../roadquest.js for the engine.
 */
window.TRUCKNAV_CONFIG = {
  theme: {
    accent: '#f5c62f',
    good: '#19744a',
    bad: '#b64327'
  },
  brand: {
    name: 'TruckNav UK',
    tagline: 'Road Quest product game'
  },
  hero: {
    eyebrow: '9 checkpoints · one road-ready driver',
    title: 'TruckNav Road Quest',
    description: 'Drive across Europe, solve product challenges and learn how to get more from your 7-inch GPS navigator.',
    image: 'https://trucknav.co.uk/images/trucknav-gallery-01-v20260724T205555.jpg',
    imageAlt: 'TruckNav 7-inch GPS navigator',
    startTitle: 'Ready for the road?',
    startDescription: 'Each checkpoint tests a real product feature. A correct answer moves your truck 100 km closer to the finish.',
    finishTitle: 'Road Quest complete',
    finishDescription: 'You cleared all nine challenges and learned the essentials of setup, HGV routing, Bluetooth, AV-IN and media.'
  },
  notice: 'Training game only. Set up the navigator while parked. Current road signs, legal restrictions and real conditions take priority over any suggested route.',
  distanceUnit: 'km',
  stageLength: 100,
  routeStages: ['London Depot → Channel Crossing', 'London Depot → Channel Crossing', 'London Depot → Channel Crossing',
    'Channel Crossing → European Hub', 'Channel Crossing → European Hub', 'Channel Crossing → European Hub',
    'European Hub → Final Delivery', 'European Hub → Final Delivery', 'European Hub → Final Delivery'],
  cta: {
    href: 'https://trucknav.co.uk/',
    label: 'Visit TruckNav',
    finishLabel: 'Explore TruckNav'
  },
  factsLabel: 'View the navigator specifications',
  facts: [
    { label: '7-inch capacitive', value: '800 × 480 touchscreen' },
    { label: '8 GB + 256 MB', value: 'Storage and RAM' },
    { label: 'MSTAR 2531', value: '800 MHz, Windows CE 6.0' },
    { label: 'European maps', value: 'IGO navigation software' },
    { label: 'Bluetooth', value: 'Calls and phone audio' },
    { label: 'AV-IN', value: 'Compatible camera input' },
    { label: 'FM 76–108 MHz', value: 'Audio to vehicle radio' },
    { label: 'TF up to 32 GB', value: 'Mini USB and 3.5mm audio' }
  ],
  footer: '© 2026 TruckNav. This game does not replace the supplied manual. Camera not included; AV-IN supports a compatible rear camera.',
  checkpoints: [
    { topic: 'Mount & power', badge: '5V/2A', question: 'Before starting, what is the safest way to prepare the navigator?', options: ['Hold it while driving', 'Mount it securely, connect the supplied charger and set it up while parked', 'Place it loose on the seat'], correctIndex: 1, explanation: 'Secure it without blocking your view, use the supplied 5V/2A charger and finish setup while parked.' },
    { topic: 'Vehicle mode', badge: 'HGV', question: 'Which mode should you choose when setting up a lorry route?', options: ['Truck / HGV mode', 'Pedestrian mode', 'Car mode for every vehicle'], correctIndex: 0, explanation: 'Truck / HGV mode enables the vehicle profile used by compatible navigation software.' },
    { topic: 'Vehicle profile', badge: '4.0 m', question: 'What should be entered in the HGV vehicle profile?', options: ['Only the registration', 'Preferred speed', 'Complete height, width, length and loaded weight'], correctIndex: 2, explanation: 'Use accurate measurements for the complete vehicle and load, including trailer and roof equipment.' },
    { topic: 'Low bridge', badge: '3.8 m', question: 'Your vehicle is 4.0 m high and a bridge sign shows 3.8 m. What should you do?', options: ['Continue because the navigator chose it', 'Do not proceed; obey the sign and find a safe alternative', 'Drive through slowly'], correctIndex: 1, explanation: 'Never enter an unsuitable road. Real signs and restrictions always take priority.' },
    { topic: 'Route planning', badge: 'SW1A', question: 'How can you enter a destination on the European maps?', options: ['By postcode or address', 'Only with coordinates', 'Only from a Bluetooth contact'], correctIndex: 0, explanation: 'The navigation software supports postcode and address search. Review the route before moving.' },
    { topic: 'Bluetooth', badge: 'BT', question: 'What can Bluetooth add to this navigator?', options: ['Wireless camera video', 'Phone calls and phone audio / music', 'Automatic map updates from every phone'], correctIndex: 1, explanation: 'Bluetooth supports calls and phone audio. Pair and manage devices while parked.' },
    { topic: 'Rear camera', badge: 'AV-IN', question: 'Where does a compatible wired rear-camera video signal connect?', options: ['3.5mm earphone connection', 'TF / microSD slot', 'AV-IN connection'], correctIndex: 2, explanation: 'Use AV-IN for a compatible camera signal. The camera is not included with this version.' },
    { topic: 'Audio & media', badge: 'FM', question: 'Which statement correctly describes the entertainment features?', options: ['FM 76–108 MHz can send audio to the radio; MP3 and WMA are supported', 'It only plays CDs', 'FM only receives traffic data'], correctIndex: 0, explanation: 'The FM transmitter operates at 76–108 MHz. Supported audio includes MP3 and WMA.' },
    { topic: 'Road safety', badge: '!', question: 'What always takes priority over the route shown on screen?', options: ['The shortest journey time', 'Current signs, legal restrictions and real conditions', 'A route saved last month'], correctIndex: 1, explanation: 'Navigation is an aid; it never overrides road signs, legal restrictions or driver responsibility.' }
  ]
};
