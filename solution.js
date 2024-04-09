console.log("Welcome to Palazzo Mazzioti!");

const roomsData = [
  { Number: 1, name: "Room Premium", price: 200 },
  { Number: 2, name: "Room Confort", price: 150 },
  { Number: 3, name: "Room Tourist", price: 100 },
];

// Function to display rooms
function displayRooms() {
  const roomList = document.getElementById("roomList");
  roomsData.forEach((room) => {
    const listItem = document.createElement("li");
    listItem.textContent = `[${room.Number}] ${room.name} - Price: $${room.price} per night`;
    listItem.setAttribute("data-room-number", room.Number);

    // Create a button to select the room
    const button = document.createElement("button");
    button.textContent = "Select Room";
    button.setAttribute("data-room-number", room.Number);
    button.addEventListener("click", handleRoomSelection);
    listItem.appendChild(button);

    roomList.appendChild(listItem);
  });
}
displayRooms();

// Handle room selection
function handleRoomSelection(event) {
  const roomNumber = parseInt(event.target.getAttribute("data-room-number"));
  if (!isNaN(roomNumber)) {
    showBookingForm(roomNumber);
  }
}

// Show booking form for the selected room
function showBookingForm(roomNumber) {
  const bookingForm = document.getElementById("bookingForm");
  const selectedRoom = roomsData.find((room) => room.Number === roomNumber);
  if (selectedRoom) {
    document.getElementById("selectedRoomNumber").value = roomNumber;
    bookingForm.classList.remove("hidden");
    displayNextInput();
  }
}

// Counter to keep track of the current input field
let currentInputIndex = 0;

// Array of questions for booking details
const questions = [
  "FullName:",
  "Booking Days:",
  "Number Of Guests:",
  "Email:",
  "PhoneNumber:",
  "CreditCard Number:",
  "CreditCard Expiration Date (MM/YY):",
  "CreditCard Security Code:",
  "Billing Address:",
  "City:",
  "State:",
  "ZipCode:",
  "Country:",
  "Passport Number:",
  "Passport Expiration Date (MM/YY):",
  "Nationality:",
  "Date of Birth (DD/MM/YYYY):",
  "Special Requests:",
];

// Function to display the next input field
function displayNextInput() {
  const currentQuestion = questions[currentInputIndex];
  const userInput = prompt(currentQuestion);
  const validationFunction = getValidationFunction(currentQuestion);
  if (validationFunction(userInput)) {
    currentInputIndex++;
    if (currentInputIndex < questions.length) {
      displayNextInput();
    } else {
      submitBooking();
    }
  } else {
    alert("Invalid input. Please try again.");
    displayNextInput();
  }
}

// Function to get the validation function for a given question
function getValidationFunction(question) {
  const validationFunctions = {
    "FullName:": (input) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(input.trim()),
    "Booking Days:": (input) => /^(?:[2-9]|[12][0-9]|30)$/.test(input.trim()),
    "Number Of Guests:": (input) => /^[1-5]$/.test(input.trim()),
    "Email:": (input) => /^\S+@\S+\.\S+$/.test(input.trim()),
    "PhoneNumber:": (input) => /^\+\d{1,3}\d{1,16}$/.test(input.trim()),
    "CreditCard Number:": (input) => /^\d{16}$/.test(input.trim()),
    "CreditCard Expiration Date (MM/YY):": (input) => /^\d{2}\/\d{2}$/.test(input.trim()),
    "CreditCard Security Code:": (input) => /^\d{3}$/.test(input.trim()),
    "Billing Address:": (input) => /^(?=.*[a-zA-Z])\S.*\s+\d{1,3}$/.test(input.trim()),
    "City:": (input) => /^[a-zA-Z]+$/.test(input.trim()),
    "State:": (input) => /^[a-zA-Z]+$/.test(input.trim()),
    "ZipCode:": (input) => /^\d{5}$/.test(input.trim()),
    "Country:": (input) => /^[a-zA-Z]+$/.test(input.trim()),
    "Passport Number:": (input) => /^[a-zA-Z0-9]{1,9}$/.test(input.trim()),
    "Passport Expiration Date (MM/YY):": (input) => /^\d{2}\/\d{2}$/.test(input.trim()),
    "Nationality:": (input) => /^[a-zA-Z]+$/.test(input.trim()),
    "Date of Birth (DD/MM/YYYY):": (input) => /^\d{2}\/\d{2}\/\d{4}$/.test(input.trim()),
    "Special Requests:": () => true, // No validation needed for Special Requests
  };
  return validationFunctions[question];
}

// Function to submit the booking
function submitBooking() {
  const bookingData = {
    roomNumber: document.getElementById("selectedRoomNumber").value,
    date: new Date().toISOString(),
  };

  questions.forEach((question) => {
    const userInput = prompt(question);
    bookingData[question.replace(/:/g, "").trim()] = userInput;
  });

  // Simulate sending the booking data to the server
  simulateServerRequest(bookingData);
}

// Simulate sending the booking data to the server
function simulateServerRequest(bookingData) {
  setTimeout(() => {
    // Get the selected room details
    const selectedRoom = roomsData.find(
      (room) => room.Number === parseInt(bookingData.roomNumber)
    );
    const roomDetails = `[${selectedRoom.Number}] ${selectedRoom.name} - Price: $${selectedRoom.price} per night`;

    // Combine selected room details with user's booking details
    let bookingDetails = roomDetails;
    for (const key in bookingData) {
      if (key !== "roomNumber" && key !== "date") {
        bookingDetails += `\n${key}: ${bookingData[key]}`;
      }
    }

    // Print the booking details
    console.log(`Booking successful! Details:\n${bookingDetails}`);
    alert(`Booking successful! Details:\n${bookingDetails}`);
  }, 1000);
}
