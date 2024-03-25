// Function to calculate the cumulative frequency of the word "Allah" in translation for the current verse and previous surahs
function calculateCumulativeFrequencyInTranslation() {
    var cumulativeFrequency = 0;

    // Iterate through previous surahs and their verses
    for (var surahNumber = 1; surahNumber < currentSurahData.surahNumber; surahNumber++) {
        var surah = surahData[surahNumber];
        if (surah) {
            for (var i = 0; i < surah.ayat.length; i++) {
                var ayat = surah.ayat[i];
                cumulativeFrequency += countOccurrences(ayat.translation, "Allah");
            }
        }
    }

    // Add occurrences from current surah up to the current verse
    for (var i = 0; i <= currentAyatIndex; i++) {
        var ayat = currentSurahData.ayat[i];
        cumulativeFrequency += countOccurrences(ayat.translation, "Allah");
    }

    return cumulativeFrequency;
}

// Function to calculate the cumulative sum of verses where "Allah" occurs in translation for the current verse and previous surahs
function calculateCumulativeSumInTranslation() {
    var cumulativeSum = 0;

    // Iterate through previous surahs and their verses
    for (var surahNumber = 1; surahNumber < currentSurahData.surahNumber; surahNumber++) {
        var surah = surahData[surahNumber];
        if (surah) {
            for (var i = 0; i < surah.ayat.length; i++) {
                var ayat = surah.ayat[i];
                if (countOccurrences(ayat.translation, "Allah") > 0) {
                    cumulativeSum += ayat.ayatNumber; // Add the verse number to cumulative sum
                }
            }
        }
    }

    // Add occurrences from current surah up to the current verse
    for (var i = 0; i <= currentAyatIndex; i++) {
        var ayat = currentSurahData.ayat[i];
        if (countOccurrences(ayat.translation, "Allah") > 0) {
            cumulativeSum += ayat.ayatNumber; // Add the verse number to cumulative sum
        }
    }

    return cumulativeSum;
}

// Function to count occurrences of "Allah" in all capital letters in a string
function countOccurrences(text, word) {
    // Construct the regular expression pattern to match the word "Allah" within <b></b> tags
    var regex = new RegExp("<b>" + word + "<\/b>", "gi"); // "gi" for global search and case-insensitive matching
    var matches = text.match(regex);
    return matches ? matches.length : 0;
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