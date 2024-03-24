function showSurah(surahNumber) {
    var surah = surahData[surahNumber];

    if (surah) {
        // Update the current Ayat index to the first Ayat of the selected Surah
        currentSurahData = surah;
        currentAyatIndex = 0;

        // Update the Surah content
        selectAyat(surah.ayat[currentAyatIndex]);

        // Close the Surah list (optional)
        closeSurahList();

        // Update the displayed Surah names on the homepage
        updateSurahNameDisplay(surah.surahName, surah.surahNameArabic);
    } else {
        console.error("Invalid surah number:", surahNumber);
    }
}


function updateSurahNameDisplay(surahName, surahNameArabic) {

    var surahNameDisplay = document.getElementById("surahNameDisplay");
    var surahNameArabicDisplay = document.getElementById("surahNameArabicDisplay");

    if (surahNameDisplay) {
        surahNameDisplay.textContent = surahName;
    }

    if (surahNameArabicDisplay) {
        surahNameArabicDisplay.textContent = surahNameArabic;
    }
}


function toggleSideNav() {
    var sideNav = document.getElementById("mySidenav");
    var mainContent = document.getElementById("main");

    if (sideNav.style.width === "250px") {
        sideNav.style.width = "0";
        mainContent.style.marginLeft = "0";
    } else {
        sideNav.style.width = "250px";
        mainContent.style.marginLeft = "250px";

        // Add event listener to close sideNav on outside click
        document.addEventListener('click', closeSideNavOnOutsideClick);
    }
}

function closeSideNav() {
    var sideNav = document.getElementById("mySidenav");
    var mainContent = document.getElementById("main");

    sideNav.style.width = "0";
    mainContent.style.marginLeft = "0";

    // Remove event listener when sideNav is closed
    document.removeEventListener('click', closeSideNavOnOutsideClick);
}

// Function to close sideNav on outside click
function closeSideNavOnOutsideClick(event) {
    var sideNav = document.getElementById("mySidenav");

    // Check if the click target is not within the sideNav and not the toggle button
    if (!sideNav.contains(event.target) && event.target.id !== 'toggleSideNav') {
        closeSideNav();
    }
}





// Initial setup when the page is loaded
window.onload = function () {
    var surahList = document.getElementById("surahList");
    var searchContainer = document.getElementById("searchContainer");

    surahList.style.height = "0";
    searchContainer.style.visibility = "hidden";

    document.addEventListener('click', function (event) {
        var surahList = document.getElementById("surahList");

        // Check if the click target is not within the Surah list and not the toggle button
        if (!surahList.contains(event.target) && event.target.id !== 'toggleSurahList') {
            closeSurahList();
        }
    });
};
document.addEventListener('click', function (event) {
    var surahList = document.getElementById("surahList");

    // Log the clicked element
    console.log('Clicked Element:', event.target);

    // Check if the click target is not within the Surah list and not the toggle button
    if (!surahList.contains(event.target) && event.target.id !== 'toggleSurahList') {
        closeSurahList();
    }
});



function toggleSurahList() {
    var surahList = document.getElementById("surahList");
    var searchContainer = document.getElementById("searchContainer");

    if (surahList.style.height === "300px") {
        surahList.style.height = "0";
        searchContainer.style.visibility = "hidden";
    } else {
        surahList.style.height = "300px";
        searchContainer.style.visibility = "visible";
    }

    // Toggle the 'hidden' class for the child elements

}

function closeSurahList() {
    var surahList = document.getElementById("surahList");
    var searchContainer = document.getElementById("searchContainer");

    surahList.style.height = "0";
    searchContainer.style.visibility = "hidden";
}


function goToSuraPage() {
    window.location.href = './sura.html';
}

// Global variable to keep track of the current ayat index
var currentAyatIndex = 0;

// Global variable to track the audio playback state
var isAudioPlaying = false;

// Function to display the current ayat
function selectAyat(ayatData) {
    document.querySelector(".arabic").textContent = ayatData.arabicText;
    document.querySelector(".translation").textContent = ayatData.translation;
    document.querySelector(".engtranslation").textContent = ayatData.engtranslation;	
    document.querySelector(".transliteration").textContent = ayatData.transliteration;
    document.querySelector("#audioPlayer").src = ayatData.audioUrl;

    // Update the combined number with the format "[surahNumber]:[ayatNumber]"
    var combinedNumberText = ayatData.surahNumber + ":" + ayatData.ayatNumber;
    document.querySelector(".combined-number").textContent = combinedNumberText;

    // Update the Arabic ayat number
    document.querySelector(".ayat-info .ayat-number-arabic").textContent = ayatData.ayatNumberArabic;

    // Update the Arabic surah number
    var surahNumberElement = document.querySelector(".surah-number-arabic");

    // Set surahNumberArabic based on the first ayat of each surah
    if (ayatData.ayatNumber === 1) {
        ayatData.surahNumberArabic = ayatData.surahNumberArabic;
    }

    // Show or hide surahNumberArabic based on its availability
    surahNumberElement.textContent = ayatData.surahNumberArabic || "";
    surahNumberElement.style.display = ayatData.surahNumberArabic ? "inline" : "none";

    // Update the subtitle text
    document.querySelector(".subtitle").textContent = ayatData.subtitle || '';

    // Update the footnote text
    document.querySelector(".footnote").textContent = ayatData.footnote || '';

// Update the footnote text
var footnotesContainer = document.getElementById("footnotes-container");
footnotesContainer.innerHTML = ""; // Clear existing footnotes

if (ayatData.footnotes && ayatData.footnotes.length > 0) {
    // Display each footnote
    ayatData.footnotes.forEach(function (footnote, index) {
        var footnoteElement = document.createElement("p");
        footnoteElement.innerHTML  = footnote;
        footnotesContainer.appendChild(footnoteElement);
    });
}

// Check if footnotes exist
var hasFootnotes = footnotesContainer.children.length > 0;

// Add or remove top and bottom borders based on footnotes existence
var containerStyle = footnotesContainer.style;
containerStyle.borderTop = hasFootnotes ? "1px solid rgb(161, 161, 161)" : "none";
containerStyle.borderBottom = "1px solid rgb(161, 161, 161)";



    // Update the visibility of "Back" and "Next" buttons
    updateNavigationButtonsVisibility();
	isAudioPlaying = false;
    updatePlayStopButtonText();
	updateHTMLWithTranslation();
}


function searchAyat() {
    var surahInput = document.getElementById("searchSurah").value;
    var verseInput = document.getElementById("searchVerse").value;

    // Convert input values to integers
    var surahNumber = parseInt(surahInput);
    var verseNumber = parseInt(verseInput);

    // Check if surah number is valid
    if (!isNaN(surahNumber) && surahNumber >= 1 && surahNumber <= 114) {
        var surah = surahData[surahNumber];

        if (!isNaN(verseNumber) && verseNumber >= 0 && verseNumber <= surah.ayat.length) {			
            var adjustedVerseNumber = (surahNumber === 1 || surahNumber === 9) ? verseNumber - 1 : verseNumber;			

            if (adjustedVerseNumber < 0) {
                alert("Verse number cannot be 0 for Surah " + surah.surahName + ". Please enter a valid verse number.");
            } else {
                // Valid surah and verse numbers, call the function to show the ayat
                console.log("Surah Data:", surah);
                console.log("Adjusted Verse Number:", adjustedVerseNumber);

                // Update the currentSurahData and currentAyatIndex
                currentSurahData = surah;
                currentAyatIndex = adjustedVerseNumber;

                updateAyatByIndex(surah, currentAyatIndex);

                // Update URL hash
                updateUrlHash(surahNumber, verseNumber);
            }
        } else {
            // If no verse number specified, assume the first verse
            var defaultVerseNumber = (surahNumber === 1 || surahNumber === 9) ? 0 : 0;

            // Valid surah number, update current surah data and ayat index
            currentSurahData = surah;
            currentAyatIndex = defaultVerseNumber;

            updateAyatByIndex(surah, currentAyatIndex);

            // Update URL hash
            updateUrlHash(surahNumber, defaultVerseNumber);
        }
    } else {
        alert("Invalid surah number. Please enter a number between 1 and 114.");
    }

    // Hide the surah list
    hideSurahList();
}


function hideSurahList() {
    var surahList = document.getElementById("surahList");
    surahList.style.height = "0";
}



function updateAyatByIndex(surah, index) {
    console.log("Updating Ayat by Index:", surah, index);
    
    // Pause audio (if needed)
    pauseAudio();
    
    // Update the currentAyatIndex
    currentAyatIndex = index;
    console.log("Current Ayat Index:", currentAyatIndex);

    // Select the Ayat based on the specified index
	console.log("Ayat Data for Surah:", surah.ayat);
    selectAyat(surah.ayat[currentAyatIndex]);

    // Update the Surah name display
    document.getElementById("surahNameDisplay").innerText = surah.surahName;

    // Update the Surah name Arabic display
    document.getElementById("surahNameArabicDisplay").innerText = surah.surahNameArabic;


    // Set audio playing state
    isAudioPlaying = false;
    console.log("Audio Playing State:", isAudioPlaying);

    // Update the play/stop button text
    updatePlayStopButtonText();
    console.log("Play/Stop Button Text Updated");
}

var currentSurahData; 

function showNextAyat() {
    pauseAudio();
	
    // Define an empty array to store surah objects
    let surahList = [];

    // Loop through the surahData object and extract surah objects
    for (let surahNumber in surahData) {
        if (surahData.hasOwnProperty(surahNumber)) {
            surahList.push(surahData[surahNumber]);
        }
    }	

    // Check if it's the last ayat of the current surah
    if (currentAyatIndex === currentSurahData.ayat.length - 1) {
        // If it's the last ayat, check if there is a next surah
        var nextSurahIndex = surahList.indexOf(currentSurahData) + 1;

        if (nextSurahIndex < surahList.length) {
            // Switch to the next surah
            currentSurahData = surahList[nextSurahIndex];
            currentAyatIndex = 0;
        } else {
            // If there is no next surah, do nothing or handle as needed
            return;
        }
    } else {
        // Update the Surah content within the same surah
        currentAyatIndex++;
    }

    // Log debug information
    console.log('Show next ayat. Current Ayat Index:', currentAyatIndex, 'Total Ayat:', currentSurahData.ayat.length);
    console.log('Before Selecting Ayat:', currentSurahData.ayat[currentAyatIndex]);

    // Update the Surah content
    selectAyat(currentSurahData.ayat[currentAyatIndex]);
    isAudioPlaying = false;
    updatePlayStopButtonText();

    // Move the updateNavigationButtonsVisibility() call here
    updateNavigationButtonsVisibility();

    // Get the updated surah number and ayat number
    var surahNumber = currentSurahData.surahNumber;
    var ayatNumber = currentSurahData.ayat[currentAyatIndex].ayatNumber;

    // Log the selected ayat information
    console.log('After Selecting Ayat:', currentSurahData.ayat[currentAyatIndex]);

    // Update the URL hash to the next verse
    updateUrlHash(surahNumber, ayatNumber);
	
}


function showPreviousAyat() {
    pauseAudio();
	
    // Define an empty array to store surah objects
    let surahList = [];

    // Loop through the surahData object and extract surah objects
    for (let surahNumber in surahData) {
        if (surahData.hasOwnProperty(surahNumber)) {
            surahList.push(surahData[surahNumber]);
        }
    }	

    // Check if it's the first ayat of the current surah
    if (currentAyatIndex === 0) {
        // If it's the first ayat, check if there is a previous surah
        var prevSurahIndex = surahList.indexOf(currentSurahData) - 1;

        if (prevSurahIndex >= 0) {
            // Switch to the previous surah
            currentSurahData = surahList[prevSurahIndex];
            currentAyatIndex = currentSurahData.ayat.length - 1;
        } else {
            // If there is no previous surah, do nothing or handle as needed
            return;
        }
    } else {
        // Update the Surah content within the same surah
        currentAyatIndex--;
    }

    // Update the Surah content
    console.log('Show previous ayat. Current Ayat Index:', currentAyatIndex, 'Total Ayat:', currentSurahData.ayat.length);

    selectAyat(currentSurahData.ayat[currentAyatIndex]);
    isAudioPlaying = false;
    updatePlayStopButtonText();

    // Move the updateNavigationButtonsVisibility() call here
    updateNavigationButtonsVisibility();

    // Get the updated surah number and ayat number
    var surahNumber = currentSurahData.surahNumber;
    var ayatNumber = currentSurahData.ayat[currentAyatIndex].ayatNumber;

    // Update the URL hash to the previous verse
    updateUrlHash(surahNumber, ayatNumber);
}



// Helper function to get surah data by surah index
function getSurahData(surahIndex) {
    // Adjust surah index to be within the valid range (1 to 114)
    surahIndex = (surahIndex + 114) % 114 + 1;

    // Construct the variable name for the surah data
    var surahDataVariableName = "al" + getSurahName(surahIndex) + "Data";

    // Retrieve the surah data using the variable name
    return window[surahDataVariableName];
}

// Helper function to get surah name by surah index
function getSurahName(surahIndex) {
    if (surahIndex >= 1 && surahIndex <= 114) {
        return "Surah" + surahIndex;
    } else {
        return "";
    }
}

function pauseAudio() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();
}



// Function to update the visibility of "Back" and "Next" buttons
function updateNavigationButtonsVisibility() {
    console.log('Inside updateNavigationButtonsVisibility');
    console.log('Current Ayat Index:', currentAyatIndex);
    console.log('Total Ayat:', currentSurahData.ayat.length);
    
    var backButton = document.getElementById("backButton");
    var nextButton = document.getElementById("nextButton");

    // Check if the elements are found before accessing their styles
    if (backButton && nextButton) {
        backButton.style.display = currentAyatIndex === 0 ? "none" : "inline-block";
        nextButton.style.display = currentAyatIndex === currentSurahData.ayat.length - 1 ? "none" : "inline-block";
    }
}


// Function to toggle between play and stop
function togglePlayStop() {
    var audioPlayer = document.getElementById("audioPlayer");
    var playStopButton = document.getElementById("playStopButton");

    if (isAudioPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();

        // Add an event listener for the 'ended' event
        audioPlayer.addEventListener('ended', function () {
            // Audio has finished playing
            isAudioPlaying = false;
            updatePlayStopButtonText();
        });
    }

    // Update the play/stop button text immediately
    isAudioPlaying = !isAudioPlaying;
    updatePlayStopButtonText();
}


// Function to update the text of the play/stop button
function updatePlayStopButtonText() {
    var playStopButton = document.getElementById("playStopButton");
    playStopButton.textContent = isAudioPlaying ? "\u25A0" : "L";
}

// Fungsi untuk menghilangkan gambar audio player
function hideAudioPlayer() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.style.display = "none";
}

// Function to show a specific verse
function showSurahVerse(surahNumber, ayatNumber) {
    var surah = surahData[surahNumber];

    if (surah && surah.ayat && surah.ayat.length > 0) {
        // Update the current Ayat index to the specified Ayat
        currentSurahData = surah;
        currentAyatIndex = surah.ayat.findIndex(verse => verse.ayatNumber === ayatNumber);

        if (currentAyatIndex === -1) {
            console.error("Invalid ayat number:", ayatNumber);
            return;
        }

        // Update the Ayat content
        selectAyat(surah.ayat[currentAyatIndex]);

        // Update the displayed Surah names on the homepage
        updateSurahNameDisplay(surah.surahName, surah.surahNameArabic);

        // Update the URL hash
        updateUrlHash(surahNumber, ayatNumber);
    } else {
        console.error("Invalid surah number:", surahNumber);
    }
}

// Function to calculate the cumulative frequency of the word "GOD" in translation for the current verse and previous surahs
function calculateCumulativeFrequencyInTranslation() {
    var cumulativeFrequency = 0;

    // Iterate through previous surahs and their verses
    for (var surahNumber = 1; surahNumber < currentSurahData.surahNumber; surahNumber++) {
        var surah = surahData[surahNumber];
        if (surah) {
            for (var i = 0; i < surah.ayat.length; i++) {
                var ayat = surah.ayat[i];
                cumulativeFrequency += countOccurrences(ayat.translation, "GOD");
            }
        }
    }

    // Add occurrences from current surah up to the current verse
    for (var i = 0; i <= currentAyatIndex; i++) {
        var ayat = currentSurahData.ayat[i];
        cumulativeFrequency += countOccurrences(ayat.translation, "GOD");
    }

    return cumulativeFrequency;
}

// Function to calculate the cumulative sum of verses where "GOD" occurs in translation for the current verse and previous surahs
function calculateCumulativeSumInTranslation() {
    var cumulativeSum = 0;

    // Iterate through previous surahs and their verses
    for (var surahNumber = 1; surahNumber < currentSurahData.surahNumber; surahNumber++) {
        var surah = surahData[surahNumber];
        if (surah) {
            for (var i = 0; i < surah.ayat.length; i++) {
                var ayat = surah.ayat[i];
                if (countOccurrences(ayat.translation, "GOD") > 0) {
                    cumulativeSum += ayat.ayatNumber; // Add the verse number to cumulative sum
                }
            }
        }
    }

    // Add occurrences from current surah up to the current verse
    for (var i = 0; i <= currentAyatIndex; i++) {
        var ayat = currentSurahData.ayat[i];
        if (countOccurrences(ayat.translation, "GOD") > 0) {
            cumulativeSum += ayat.ayatNumber; // Add the verse number to cumulative sum
        }
    }

    return cumulativeSum;
}



// Function to count occurrences of "GOD" in all capital letters in a string
function countOccurrences(text, word) {
    var regex = new RegExp("\\b" + word + "\\b", "g"); // Match whole word
    var matches = text.match(regex);
    return matches ? matches.filter(match => match === word).length : 0; // Filter matches for "GOD" in all capital letters
}


// Function to update the HTML with the cumulative frequency and cumulative sum in translation
function updateHTMLWithTranslation() {
    console.log("Updating HTML with translation...");
    var cumulativeFrequency = calculateCumulativeFrequencyInTranslation();
    var cumulativeSum = calculateCumulativeSumInTranslation();

    console.log("Cumulative frequency:", cumulativeFrequency);
    console.log("Cumulative sum:", cumulativeSum);

    // Update HTML elements with the cumulative frequency and sum
    var frequencyElement = document.getElementById("cumulativeFrequencyInTranslation");
    var sumElement = document.getElementById("cumulativeSumInTranslation");

    console.log("Frequency Element:", frequencyElement);
    console.log("Sum Element:", sumElement);

    if (frequencyElement && sumElement) {
        frequencyElement.textContent = cumulativeFrequency;
        sumElement.textContent = cumulativeSum;
        console.log("HTML updated successfully.");
    } else {
        console.error("HTML elements not found.");
    }
}

// Function to update the URL hash
function updateUrlHash(surahNumber, ayatNumber) {
    window.location.hash = surahNumber + ":" + ayatNumber;
}


window.addEventListener('hashchange', function() {
    handleHashChange();
});

window.onload = function () {
    // Assuming surahData is properly loaded from surah.js
    console.log("Surah Data:", surahData); // Log the loaded data
    
    // Set the initial data based on the first surah (you can adjust this as needed)
    currentSurahData = surahData[1]; // Assuming you want to start with Surah Al-Fatihah
    currentAyatIndex = 0;

    // Handle the URL hash to show a specific verse
    const hash = window.location.hash;

    if (hash) {
        // Remove the leading '#' character
        const verseParam = hash.substring(1);

        // Parse the verse parameter (e.g., "1:3")
        const [surahNumber, ayatNumber] = verseParam.split(':').map(Number);

        // Show the specified verse
        showSurahVerse(surahNumber, ayatNumber);
    } else {
        // Handle the case when there is no hash fragment
        // Add your default behavior or show the last read verse
        if (currentSurahData && currentSurahData.ayat && currentSurahData.ayat.length > 0) {
            // Select and display the first ayat of the current surah
            selectAyat(currentSurahData.ayat[currentAyatIndex]);
        } else {
            console.error("Invalid surah data structure.");
        }
    }

    // Update the play/stop button text based on the current state
	updateHTMLWithTranslation();
    updatePlayStopButtonText();
	handleHashChange();
};

// Function to handle changes in the URL hash
function handleHashChange() {
    const hash = window.location.hash;

    if (hash) {
        // Remove the leading '#' character
        const verseParam = hash.substring(1);

        // Parse the verse parameter (e.g., "1:3")
        const [surahNumber, ayatNumber] = verseParam.split(':').map(Number);

        // Show the specified verse
        showSurahVerse(surahNumber, ayatNumber);
    }
}

// Variables to store touch start position
let touchStartX = 0;
let touchEndX = 0;

// Variable to track whether a touch event was for sliding or clicking
let isTouchSlide = false;

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

// Function to handle touch start event
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    isTouchSlide = false; // Reset touch slide flag
}

// Function to handle touch move event
function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
    isTouchSlide = true; // Set touch slide flag
}

// Function to handle touch end event
function handleTouchEnd(event) {
    // Calculate swipe distance
    const swipeDistance = touchStartX - touchEndX;

    // Define a threshold for swipe distance
    const swipeThreshold = 50; // Adjust this value based on your preference

    // If swipe distance is greater than the threshold and it was a touch slide action, perform the slide
    if (Math.abs(swipeDistance) > swipeThreshold && isTouchSlide) {
        if (swipeDistance > 0) {
            // Swipe left, move to the next verse and trigger animation
            showNextAyat();
            const ayahElement = document.querySelector('.ayah');
            ayahElement.classList.remove('slide-left');
            ayahElement.classList.remove('slide-right'); // Remove any existing slide class
            ayahElement.addEventListener('animationend', removeSlideClass);
            ayahElement.classList.add('slide-right');
        } else {
            // Swipe right, move to the previous verse and trigger animation
            showPreviousAyat();
            const ayahElement = document.querySelector('.ayah');
            ayahElement.classList.remove('slide-left');
            ayahElement.classList.remove('slide-right'); // Remove any existing slide class
            ayahElement.addEventListener('animationend', removeSlideClass);
            ayahElement.classList.add('slide-left');
        }
    }
}

// Function to remove the slide class after the animation ends
function removeSlideClass(event) {
    const ayahElement = event.target;
    ayahElement.classList.remove('slide-left');
    ayahElement.classList.remove('slide-right');
    ayahElement.removeEventListener('animationend', removeSlideClass);
}

