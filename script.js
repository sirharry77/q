// Sample data for Surah Al-Fatihah
var alFatihahData = {
    surahNameMalay: "Al-Fatihah",
    surahNumber: 1,
    surahNameArabic: "الفاتحة",
    ayat: [
        {
            ayatNumber: 1,
            surahNumber: 1,
            arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            translation: "Segala puji tertentu bagi Allah, Tuhan seru sekalian alam.",
            audioUrl: "http://quranmobile.local/data/001001.mp3"
        },
        {
            ayatNumber: 2,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001002.mp3"
        },
        {
            ayatNumber: 3,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001003.mp3"
        },
        {
            ayatNumber: 4,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001004.mp3"
        },
        {
            ayatNumber: 5,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001005.mp3"
        },
        {
            ayatNumber: 6,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001006.mp3"
        },
        {
            ayatNumber: 7,
            surahNumber: 1,
            arabicText: "الرَّحْمَنِ الرَّحِيمِ",
            translation: "Yang Maha Pemurah, Maha Penyayang.",
            audioUrl: "http://quranmobile.local/data/001007.mp3"
        },		
        // ... Continue for the remaining ayat
    ]
};

function goToSuraPage() {
    window.location.href = 'http://quranmobile.local/sura.html';
}

// Global variable to keep track of the current ayat index
var currentAyatIndex = 0;

// Global variable to track the audio playback state
var isAudioPlaying = false;

// Function to display the current ayat
function selectAyat(ayatData) {
    document.querySelector(".arabic").textContent = ayatData.arabicText;
    document.querySelector(".translation").textContent = ayatData.translation;
    document.querySelector("#audioPlayer").src = ayatData.audioUrl;

    // Update the combined number with the format "[surahNumber]:[ayatNumber]"
    var combinedNumberText = ayatData.surahNumber + ":" + ayatData.ayatNumber;
    document.querySelector(".combined-number").textContent = combinedNumberText;

    // Update the visibility of "Back" and "Next" buttons
    updateNavigationButtonsVisibility();
}

// Tambahkan fungsi carian
function searchAyat() {
    var input = document.getElementById("searchAyat").value;
    var ayatIndex = parseInt(input);

    if (!isNaN(ayatIndex) && ayatIndex >= 1 && ayatIndex <= alFatihahData.ayat.length) {
        // Validasi nombor ayat dan panggil fungsi untuk menunjukkan ayat
        updateAyatByIndex(ayatIndex - 1); // Tolak satu kerana indeks bermula dari 0
    } else {
        alert("Sila masukkan nombor ayat yang sah.");
    }
}

// Fungsi untuk menunjukkan ayat berdasarkan indeks
function updateAyatByIndex(index) {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();

    currentAyatIndex = index;
    selectAyat(alFatihahData.ayat[currentAyatIndex]);

    // Resetkan keadaan audio dan kemas kini teks butang main
    isAudioPlaying = false;
    updatePlayStopButtonText();
}

// Kemudian, perbarui fungsi showNextAyat dan showPreviousAyat untuk membenarkan pemainan semula audio
function showNextAyat() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();

    currentAyatIndex++;
    if (currentAyatIndex >= alFatihahData.ayat.length) {
        currentAyatIndex = 0;
    }
    selectAyat(alFatihahData.ayat[currentAyatIndex]);

    // Resetkan keadaan audio dan kemas kini teks butang main
    isAudioPlaying = false;
    updatePlayStopButtonText();
}

function showPreviousAyat() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();

    currentAyatIndex--;
    if (currentAyatIndex < 0) {
        currentAyatIndex = alFatihahData.ayat.length - 1;
    }
    selectAyat(alFatihahData.ayat[currentAyatIndex]);

    // Resetkan keadaan audio dan kemas kini teks butang main
    isAudioPlaying = false;
    updatePlayStopButtonText();
}



// Function to update the visibility of "Back" and "Next" buttons
function updateNavigationButtonsVisibility() {
    var backButton = document.getElementById("backButton");
    var nextButton = document.getElementById("nextButton");

    // Check if the elements are found before accessing their styles
    if (backButton && nextButton) {
        backButton.style.display = currentAyatIndex === 0 ? "none" : "inline-block";
        nextButton.style.display = currentAyatIndex === alFatihahData.ayat.length - 1 ? "none" : "inline-block";
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
    }

    isAudioPlaying = !isAudioPlaying;
    updatePlayStopButtonText();
}

// Function to update the text of the play/stop button
function updatePlayStopButtonText() {
    var playStopButton = document.getElementById("playStopButton");
    playStopButton.textContent = isAudioPlaying ? "Stop" : "Play";
}

// Call updatePlayStopButtonText after the page has loaded
window.onload = function () {
    // Display the initial ayat
    selectAyat(alFatihahData.ayat[currentAyatIndex]);

    // Set the initial state of the play/stop button
    updatePlayStopButtonText();
};


