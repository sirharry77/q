document.addEventListener("DOMContentLoaded", function() {
    var surahSelectArabic = document.getElementById("surahSelectArabic");
    var surahSelectTranslation = document.getElementById("surahSelectTranslation");
    var surahInfo = document.getElementById("surahInfo");
    var playButton = document.getElementById("playButton");
    var stopButton = document.getElementById("stopButton");
    var currentVerseIndex = -1;
    var currentAudio = null; // Store the current audio element
    var isPlaying = false; // Flag to track if audio is currently playing
    var lastPlayedVerseIndex = -1; // Store the index of the last played verse
    var lastPlaybackPosition = 0; // Store the last playback position

    // Function to populate the Surah selection dropdowns
function populateSurahDropdowns() {
    for (var i = 1; i <= 114; i++) {
        var optionArabic = document.createElement("option");
        optionArabic.value = i;
        // Remove "Surah" from the text content
        optionArabic.textContent = surahData[i].surahNumberArabic + ": " + surahData[i].surahNameArabic;
        surahSelectArabic.appendChild(optionArabic);
        // Apply CSS to make text start from the right side
        optionArabic.style.direction = "rtl"; // Right-to-left direction

        var optionTranslation = document.createElement("option");
        optionTranslation.value = i;
        optionTranslation.textContent = "Sura " + surahData[i].surahNumber + ": " + surahData[i].surahName;
        surahSelectTranslation.appendChild(optionTranslation);
    }
}



    // Call the function to populate the dropdowns
    populateSurahDropdowns();

// Function to display surah information based on the selected surah
function displaySurahInfo(surah, isArabic) {
    if (!surah) {
        return;
    }

    // Clear surah info and reset current audio
    surahInfo.innerHTML = "";
    stopAudio();
    currentVerseIndex = -1;
    isPlaying = false;

    // Display surah info
    var surahName = document.createElement("h2");
    surahName.textContent = isArabic ? surah.surahNameArabic : surah.surahName;
    surahInfo.appendChild(surahName);

    surah.ayat.forEach(function(ayah, index) {
        var ayahElement = document.createElement("div");
        ayahElement.classList.add("verse"); // Add class for spacing between verses

        // Add class for Arabic verses
        if (isArabic) {
            ayahElement.classList.add("arabic-verse");
        }

        // Create span for verse number
        var numberSpan = document.createElement("span");
        numberSpan.textContent = isArabic ? ayah.ayatNumberArabic + ":" + surah.surahNumberArabic + " " : surah.surahNumber + ":" + ayah.ayatNumber + " ";
        numberSpan.classList.add("verse-number"); // Add class for styling verse numbers
        ayahElement.appendChild(numberSpan);

        // Create span for ayah text
        var ayahText = document.createElement("span");
        ayahText.textContent = isArabic ? ayah.arabicText : ayah.translation;
        ayahText.classList.add("ayah-text"); // Add class for styling ayah text
        ayahElement.appendChild(ayahText);

        surahInfo.appendChild(ayahElement);

        // Event listener to play audio and highlight the clicked verse
        ayahElement.addEventListener("click", function() {
            playAudio(ayah.audioUrl, index, surah, isArabic); // Play audio from the clicked verse index
            highlightVerse(index); // Highlight the clicked verse
        });
    });
}






    // Event listener for surah selection for Arabic
    surahSelectArabic.addEventListener("change", function() {
        var surahNumber = parseInt(surahSelectArabic.value);
        surahSelectTranslation.value = surahNumber; // Synchronize selection with Translation tab
        var surah = surahData[surahNumber];
        displaySurahInfo(surah, true);
    });

    // Event listener for surah selection for Translation
    surahSelectTranslation.addEventListener("change", function() {
        var surahNumber = parseInt(surahSelectTranslation.value);
        surahSelectArabic.value = surahNumber; // Synchronize selection with Arabic tab
        var surah = surahData[surahNumber];
        displaySurahInfo(surah, false);
    });

    // Event listener for Translation tab change
    var translationTab = document.getElementById("translation-tab");
    translationTab.addEventListener("click", function() {
        var surahNumber = parseInt(surahSelectTranslation.value);
        var surah = surahData[surahNumber];
        displaySurahInfo(surah, false);
    });

    // Event listener for Arabic tab change
    var arabicTab = document.getElementById("arabic-tab");
    arabicTab.addEventListener("click", function() {
        var surahNumber = parseInt(surahSelectArabic.value);
        var surah = surahData[surahNumber];
        displaySurahInfo(surah, true);
    });

    // Function to play the audio
    function playAudio(audioUrl, verseIndex, surah, isArabic) {
        removeHighlighting(); // Remove highlighting from all verses
        console.log("Playing audio:", audioUrl);
        stopAudio(); // Stop any currently playing audio
        currentAudio = new Audio(audioUrl);

        // Schedule the next verse to be played after the current one finishes
        currentAudio.onended = function() {
            var nextVerseIndex = verseIndex + 1;
            if (nextVerseIndex < surah.ayat.length) {
                var nextAudioUrl = surah.ayat[nextVerseIndex].audioUrl;
                if (nextAudioUrl) {
                    playAudio(nextAudioUrl, nextVerseIndex, surah, isArabic); // Play the next verse
                    highlightVerse(nextVerseIndex); // Highlight the next verse
                } else {
                    console.error("Audio URL not found for verse:", nextVerseIndex);
                }
            } else {
                console.log("Reached the end of the surah");

                // Check if there is a next surah available
                var nextSurahNumber = parseInt(surah.surahNumber) + 1; // Increment the current surah number
                var nextSurah = surahData[nextSurahNumber];
                if (nextSurah) {
                    if (nextSurah.ayat && nextSurah.ayat.length > 0) { // Ensure next surah has ayat
                        var nextSurahFirstAyah = nextSurah.ayat[0];
                        if (nextSurahFirstAyah && nextSurahFirstAyah.audioUrl) {
                            // Update the dropdown selection to the next surah
                            surahSelectArabic.value = nextSurahNumber;
                            surahSelectTranslation.value = nextSurahNumber;

                            // Display the information of the next surah for both tabs
                            if (isArabic) {
                                displaySurahInfo(nextSurah, true); // Display Arabic content for Arabic tab
                            } else {
                                displaySurahInfo(nextSurah, false); // Display translation content for Translation tab
                            }

                            // Start playback from the beginning of the next surah
                            playAudio(nextSurahFirstAyah.audioUrl, 0, nextSurah, isArabic);
                            highlightVerse(0); // Highlight the first verse of the next surah
                        } else {
                            console.error("Audio URL not found for the first verse of the next surah");
                        }
                    } else {
                        console.error("No ayat found for the next surah");
                    }
                } else {
                    console.log("Reached the end of the Quran");
                    stopAudio(); // Stop the playback when reaching the end of the Quran
                }
            }
        };

        currentAudio.play().catch(error => {
            console.error("Play request was interrupted:", error);
        });
        isPlaying = true;
        highlightVerse(verseIndex); // Highlight the current verse when playback starts
    }

    // Function to stop the audio
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            if (currentAudio.currentTime !== undefined) {
                currentAudio.currentTime = 0;
            }
            currentAudio = null;
            isPlaying = false;
        }
    }

    // Event listener for stop button
    stopButton.addEventListener("click", function() {
        stopAudio();
        // Store the index of the last played verse and the current playback position
        lastPlayedVerseIndex = currentVerseIndex;
        lastPlaybackPosition = currentAudio ? currentAudio.currentTime : 0;
    });

    // Function to highlight the current verse
    function highlightVerse(verseIndex) {
        var ayahElements = surahInfo.querySelectorAll("div");
        ayahElements.forEach(function(element, index) {
            if (index === verseIndex) {
                element.classList.add("active-verse");
            } else {
                element.classList.remove("active-verse");
            }
        });
    }

    // Function to remove highlighting from all verses
    function removeHighlighting() {
        var ayahElements = surahInfo.querySelectorAll("div");
        ayahElements.forEach(function(element) {
            element.classList.remove("active-verse");
        });
    }

    // Event listener for play button
    playButton.addEventListener("click", function() {
        removeHighlighting(); // Remove highlighting from all verses
        var surahNumber = parseInt(surahSelectArabic.value);
        if (!isNaN(surahNumber)) {
            var surah = surahData[surahNumber];
            if (surah && surah.ayat && surah.ayat.length > 0) {
                // Start from the last played verse index
                var verseIndex = lastPlayedVerseIndex !== -1 ? lastPlayedVerseIndex : 0;

                function playNextVerse() {
                    var audioUrl = surah.ayat[verseIndex].audioUrl;
                    if (audioUrl) {
                        playAudio(audioUrl, verseIndex, surah, true); // Play the audio
                        currentVerseIndex = verseIndex; // Update the current verse index
                        highlightVerse(verseIndex); // Highlight the current verse
                        verseIndex++; // Move to the next verse

                        // Check if there are more verses to play
                        if (verseIndex < surah.ayat.length) {
                            // Schedule the next verse to be played after the current one finishes
                            currentAudio.onended = playNextVerse;
                        } else {
                            console.log("Surah playback completed");
                        }
                    } else {
                        console.error("Audio URL not found for verse:", verseIndex);
                    }
                }

                // Start playing the verses
                playNextVerse();
            } else {
                console.error("No Surah selected");
				// Display "No Surah selected" message
surahInfo.innerHTML = '<p style="text-align: center; color:#4CAF50; animation: blink 1s infinite;">Please select a Sura</p>';
            }
        } else {
            console.error("No Surah selected");
        }
    });

    // Initially display surah info for the selected surah in the Arabic tab
    var initialSurahNumber = parseInt(surahSelectArabic.value);
    var initialSurah = surahData[initialSurahNumber];
    displaySurahInfo(initialSurah, true);
});
