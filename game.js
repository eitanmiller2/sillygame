let playerData = {
    name: '',
    email: '',
    choices: []
};

const scenarios = [
    {
        id: 'earthquake',
        image: 'earthquake.jpg',
        text: "Your alarm doesn't wake you - a sudden earthquake does! As you open your eyes, your room is filled with flying papers. Your phone buzzes with a message from Eitan about your date tonight at the Lawrence concert.",
        choices: [
            { text: "Hide under the bed", value: "hide" },
            { text: "Run to the window to see what's happening", value: "window" },
            { text: "Grab your guitar and start playing 'Earthquake Blues'", value: "guitar" }
        ],
        eitanMessage: "Did you feel that shake? Still on for tonight? 🎵🌆"
    },
    {
        id: 'subway',
        image: 'subway.jpg',
        text: "You've made it to the subway, but it's turned into a chaotic maze! The train cars seem to stretch infinitely in both directions.",
        choices: [
            { text: "Navigate the maze", value: "navigate" }
        ],
        eitanMessage: "Subway's acting weird. Hope you're not stuck! 🚇🌀"
    },
    {
        id: 'zoo',
        image: 'zoo.jpg',
        text: "Emerging from the subway, you find the city overrun by escaped zoo animals. It's a jungle out there... literally!",
        choices: [
            { text: "Befriend a capuchin monkey to help navigate", value: "monkey" },
            { text: "Disguise yourself as a zookeeper", value: "zookeeper" },
            { text: "Help recapture animals", value: "recapture" }
        ],
        eitanMessage: "There's a giraffe outside my window. NYC, am I right? 🦒🗽"
    },
    {
        id: 'alien',
        image: 'hotdog.jpg',
        text: "You stumble upon a hot dog stand that seems... off. The vendor has an odd greenish tint, and the menu items are written in an indecipherable script.",
        choices: [
            { text: "Ask for directions to Radio City Music Hall", value: "directions" },
            { text: "Trade your watch for a teleportation device", value: "trade" },
            { text: "Apply for a job as an Earth tour guide", value: "apply" }
        ],
        eitanMessage: "Just saw the weirdest hot dog stand. Bringing you a souvenir! 🌭👽"
    },
    {
        id: 'pizza',
        image: 'pizza.jpg',
        text: "Giant sentient pizza slices are taking over the streets! They seem to be organizing some sort of rally in Times Square.",
        choices: [
            { text: "Lead a resistance movement against the pizza overlords", value: "resist" },
            { text: "Negotiate a peace treaty between humans and pizza", value: "negotiate" },
            { text: "Embrace our new cheesy rulers and become a pizza yourself", value: "become" }
        ],
        eitanMessage: "Pizza's come alive! Might be late. Don't eat anything suspicious! 🍕😱"
    },
    {
        id: 'lava',
        image: 'lava.jpg',
        text: "You're close to Radio City Music Hall, but the street is literally lava! You can see the concert venue just a few blocks away.",
        choices: [
            { text: "Cross the lava street", value: "cross" }
        ],
        eitanMessage: "I'm at Radio City. Hurry, the street's getting hot! 🌋🎭"
    }
];

function startGame() {
    playerData.name = document.getElementById('player-name').value;
    playerData.email = document.getElementById('player-email').value;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    showScenario(0);
}

function showScenario(index) {
    if (index >= scenarios.length) {
        endGame();
        return;
    }
    const scenario = scenarios[index];
    document.getElementById('scenario-image').style.backgroundImage = `url('${scenario.image}')`;
    document.getElementById('scenario-text').textContent = scenario.text;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    scenario.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(index, choice.value);
        choicesDiv.appendChild(button);
    });
    document.getElementById('eitan-message').textContent = `Eitan: ${scenario.eitanMessage}`;
}

function makeChoice(scenarioIndex, choiceValue) {
    playerData.choices.push({ scenario: scenarios[scenarioIndex].id, choice: choiceValue });
    sendToGoogleSheet(scenarioIndex, choiceValue);
    showScenario(scenarioIndex + 1);
}

function sendToGoogleSheet(scenarioIndex, choiceValue) {
    // Placeholder for Google Sheets integration
    console.log("Sending to Google Sheets:", {
        name: playerData.name,
        email: playerData.email,
        scenario: scenarios[scenarioIndex].id,
        choice: choiceValue
    });
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'flex';
    // Implement end game logic here
}

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', () => {
    playerData = { name: '', email: '', choices: [] };
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
});
