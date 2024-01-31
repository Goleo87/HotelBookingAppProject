// Don't forget to run "npm install" in the terminal before trying to use "readline-sync"
// You only need to do this once, not every time you run the code
import readline from "readline-sync";
// Example use of readline-sync
// Run "node solution.js" in the terminal to see how it works
// Feel free to delete the example code once you are clear about how to use "readline-sync"

console.log("Welcome to Palazzo Mazzioti!");
const roomsData = [
  { Number: 1, name: "Room Premium", price: 200 },
  { Number: 2, name: "Room Confort", price: 150 },
  { Number: 3, name: "Room Tourist", price: 100 },
];

// Function to display rooms
function displayRooms() {
  console.log("This are our avaliable rooms: ");
  roomsData.forEach((room) => {
    console.log(
      `[${room.Number}] ${room.name} - Price: $${room.price} per night`
    );
  });
}
displayRooms();

let roomNumber;
do {
  roomNumber = parseInt(readline.question("Please select a room: "));
  if (roomsData.findIndex((room) => room.Number === roomNumber) === -1) {
    console.log("Please select a valid room.");
  }
} while (roomsData.findIndex((room) => room.Number === roomNumber) === -1);

// Function to book a room
function bookRoom(roomNumber) {
  const selectedRoom = roomsData.find((room) => room.Number === roomNumber);
  if (selectedRoom) {
    console.log(`Booking ${selectedRoom.name}...`);

    //  user input for booking details
    const bookingData = {
      roomNumber: roomNumber,
      date: new Date().toISOString(),
    };

    // Collect dynamic user input for booking details with regular expressions instead of "if"
    const questions = [
      {
        question: "FullName:",
        validation: (input) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(input.trim()),
        errorMessage: "Error: Please provide your first name and last name.",
      },
      {
        question: "Booking Days:",
        validation: (input) => /^(?:[2-9]|[12][0-9]|30)$/.test(input.trim()),
        errorMessage:
          "Error: your Booking should include a minimum of 2 days and a maximum 30 days.",
      },
      {
        question: "Number Of Guests:",
        validation: (input) => /^[1-5]$/.test(input.trim()),
        errorMessage: "Error: a maximum of 5 Guests are allowed .",
      },
      {
        question: "Email:",
        validation: (input) => /^\S+@\S+\.\S+$/.test(input.trim()),
        errorMessage: "Error: Invalid email format.",
      },
      {
        question: "PhoneNumber:",
        validation: (input) => /^\+\d{1,3}\d{1,16}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid phone number format. Please enter a valid phone number starting with '+' then country code and your number",
      },
      {
        question: "creditCard Number:",
        validation: (input) => /^\d{16}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid credit card number format. Please enter a 16-digit number.",
      },
      {
        question: "CreditCard Expiration Date:",
        validation: (input) => /^\d{2}\/\d{2}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid expiration date format. Please enter in MM/YY format.",
      },
      {
        question: "CreditCard Security Code:",
        validation: (input) => /^\d{3}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid security code format. Please enter a 3-digit number.",
      },
      {
        question: "Billing Address:",
        validation: (input) =>
          /^(?=.*[a-zA-Z])\S.*\s+\d{1,3}$/.test(input.trim()),
        errorMessage:
          "Error: Please provide your street name followed by your house number (up to 3 digits).",
      },
      {
        question: "City:",
        validation: (input) => /^[a-zA-Z]+$/.test(input.trim()),
        errorMessage: "Error: Please provide your City.",
      },
      {
        question: "State:",
        validation: (input) => /^[a-zA-Z]+$/.test(input.trim()),
        errorMessage: "Error: Please provide your State .",
      },
      {
        question: "ZipCode:",
        validation: (input) => /^\d{5}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid ZIP code format. Please enter a 5-digit number.",
      },
      {
        question: "Country:",
        validation: (input) => /^[a-zA-Z]+$/.test(input.trim()),
        errorMessage: "Error: Please provide your Country.",
      },
      {
        question: "Passport Number:",
        validation: (input) => /^[a-zA-Z0-9]{1,9}$/.test(input.trim()),
        errorMessage:
          "Error: Passport number must contain 1 to 9 characters and cannot be empty.",
      },
      {
        question: "Expiration Date:",
        validation: (input) => /^\d{2}\/\d{2}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid expiration date format. Please enter in MM/YY format.",
      },
      {
        question: "Nationality:",
        validation: (input) => /^[a-zA-Z]+$/.test(input.trim()),
        errorMessage: "Error: Nationality must be a word without numbers.",
      },
      {
        question: "Date of Birth:",
        validation: (input) => /^\d{2}\/\d{2}\/\d{4}$/.test(input.trim()),
        errorMessage:
          "Error: Invalid date of birth format. Please enter in DD/MM/YYYY format.",
      },
      {
        question: "Special Requests:",
        validation: () => true,
        errorMessage: " ",
      }, // No validation needed
    ];

    questions.forEach((questionObj) => {
      let userInput;
      do {
        userInput = readline.question(questionObj.question + " ");
        if (!questionObj.validation(userInput)) {
          console.log(questionObj.errorMessage);
        }
      } while (!questionObj.validation(userInput));

      // Assign validated input to bookingData
      bookingData[questionObj.question.replace(/:/g, "").trim()] = userInput;
    });

    // Simulate sending the booking data to the server
    simulateServerRequest(bookingData);
  } else {
    console.log("Please select a valid room.");
  }
}

// Book the room
bookRoom(roomNumber);

// Simulate sending the booking data to the server
function simulateServerRequest(bookingData) {
  setTimeout(() => {
    // Get the selected room details
    const selectedRoom = roomsData.find(
      (room) => room.Number === bookingData.roomNumber
    );
    const roomDetails = `[${selectedRoom.Number}] ${selectedRoom.name} - Price: $${selectedRoom.price} per night`;

    // Convert bookingData object into an array of key-value pairs
    const detailsArray = Object.entries(bookingData).map(
      ([key, value]) => `${key}: ${value}`
    );

    // Combine selected room details with user's booking details
    const bookingDetails = [roomDetails, ...detailsArray].join("\n");

    // Print the booking details
    console.log(`Booking successful! Details ${bookingDetails}`);
  }, 1000);
}
