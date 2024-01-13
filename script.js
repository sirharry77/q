// Sample data for Surah Al-Fatihah
var alFatihahData = {
    surahNameMalay: "Al-Fatihah",
    surahNumber: 1,
	surahNumberArabic: '١',
    surahNameArabic: "سورة الفاتحة",
    ayat: [
        {
            ayatNumber: 1,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '١',
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "Dengan nama TUHAN, Maha Pengasih, Maha Penyayang.*",
            audioUrl: "./data/001001.mp3",
			subtitle: "",			
            footnotes: [
                "1:1 Ayat pertama dalam Quran mewakili asas dimana mukjizat matematik berasaskan 19 yang luar biasa dibina. Pernyataan penting ini terdiri daripada 19 huruf Arab, dan setiap perkataan didalamnya muncul dalam keseluruhan Quran dalam gandaan 19. (lihat Lampiran 1 & 29 untuk penjelasan).",
                "1:1-7 Sura 1 adalah hadiah dari Tuhan kepada kita untuk menjalin hubungan dengan Dia melalui Sembahyang harian. Fakta ini disokong oleh susunan matematik yang menggemparkan dunia, mudah-difahami-tetapi-mustahil-untuk-ditiru yang mencabar ahli matematik terhebat dunia, dan membungkam mereka. Ia jauh di luar kemampuan manusia:",
                "(1) Nombor sura, diikuti oleh nombor ayat, berturut-turut, menghasilkan 1 1 2 3 4 5 6 7. Nombor ini adalah gandaan 19.",
                "(2) Jika kita gantikan jumlah huruf setiap ayat sebagai gantian untuk nombor ayat, kita mendapat 1 19 17 12 11 19 18 43. Nombor ini juga adalah gandaan 19.",
                "(3) Jika kita masukkan jumlah nilai gematrikal setiap ayat, kita mendapat 1 19 786 17 581 12 618 11 241 19 836 18 1072 43 6009. Nombor ini adalah gandaan 19.",
                "(4) Nombor yang ditunjukkan di atas merangkumi semua parameter Sura 1 dan terdiri daripada 38 digit (19x2).",
                "(5) Perlu diperhatikan bahawa nombor 38 digit ini masih boleh dibahagi dengan 19 apabila kita menulis komponennya secara terbalik, dari kanan ke kiri, seperti yang diamalkan oleh orang Arab. Oleh itu, 6009 43 1072 18 836 19 241 11 618 12 581 17 786 19 1 juga merupakan gandaan 19.",
                "(6) Representasi matematik yang disebutkan di atas turut serta dalam pelbagai fenomena matematik yang luar biasa untuk mengesahkan semua butiran Sembahyang harian lima kali sehari (Lampiran 15).",
                "(7) Banyak lagi fenomena yang menakjubkan diberikan dalam Lampiran Satu. Dengan demikian, pembaca diberikan bukti yang nyata dari awal bahawa ini adalah mesej Tuhan kepada dunia."			
            ]
        },
        {
            ayatNumber: 2,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٢',
            arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            translation: "Segala puji kepada TUHAN, Tuan alam semesta.",
            audioUrl: "./data/001002.mp3",
			subtitle: "Subtitle untuk Ayat 2",
			footnote: "Catatan Kaki untuk Ayat 2"
        },
        {
            ayatNumber: 3,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٣',		
            arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "Maha Pengasih, Maha Penyayang.",
            audioUrl: "./data/001003.mp3"
        },
        {
            ayatNumber: 4,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٤',	
            arabicText: "مَالِكِ يَوْمِ الدِّينِ",
            translation: "Ketua Hari Penghakiman.",
            audioUrl: "./data/001004.mp3",
			subtitle: "Subtitle untuk Ayat 4",
			footnote: "Catatan Kaki untuk Ayat 4"
        },
        {
            ayatNumber: 5,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٥',	
            arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            translation: "Engkau sahaja kami sembah. Engkau sahaja kami minta untuk pertolongan.",
            audioUrl: "./data/001005.mp3"
        },
        {
            ayatNumber: 6,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٦',	
            arabicText: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
            translation: "Bimbing kami dalam laluan yang benar;",
            audioUrl: "./data/001006.mp3",
			footnote: "Catatan Kaki untuk Ayat 6"
        },
        {
            ayatNumber: 7,
            surahNumber: 1,
			surahNumberArabic: '١',
			ayatNumberArabic: '٧',		
            arabicText: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
            translation: "di laluan dari mereka yang Engkau telah kurniakan nikmat; bukan dari mereka yang telah dimurkai, bukan juga dari golongan yang sesat.",
            audioUrl: "./data/001007.mp3",
			subtitle: "Subtitle untuk Ayat 7"
        },		
        // ... Continue for the remaining ayat
    ]
};


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
    var searchAyat = document.getElementById("searchAyat");
    var goButton = document.getElementById("goButton");

    searchAyat.classList.toggle("hidden");
    goButton.classList.toggle("hidden");
}

function closeSurahList() {
    var surahList = document.getElementById("surahList");
    var searchContainer = document.getElementById("searchContainer");

    surahList.style.height = "0";
    searchContainer.style.visibility = "hidden";
}













// Deklarasikan variabel untuk elemen ayah
var ayahElement = document.querySelector('.ayah');

// Gunakan Hammer.js untuk menangani gestur sentuh
var hammer = new Hammer(ayahElement);

// Tentukan fungsi untuk menangani gesekan (swipe)
hammer.on('swipeleft', function () {
    showNextAyat();
});

hammer.on('swiperight', function () {
    showPreviousAyat();
});

// Fungsi untuk menampilkan ayat berikutnya
function showNextAyat() {
    // Implementasi logika untuk menampilkan ayat berikutnya
    console.log('Show next ayat');
}

// Fungsi untuk menampilkan ayat sebelumnya
function showPreviousAyat() {
    // Implementasi logika untuk menampilkan ayat sebelumnya
    console.log('Show previous ayat');
}

// Fungsi lainnya seperti togglePlayStop() dapat Anda tambahkan di sini



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
            footnoteElement.textContent = '*' + footnote;
            footnotesContainer.appendChild(footnoteElement);
        });
    }	

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
    pauseAudio();
    currentAyatIndex = index;
    selectAyat(alFatihahData.ayat[currentAyatIndex]);
    isAudioPlaying = false;
    updatePlayStopButtonText();
}

// Kemudian, perbarui fungsi showNextAyat dan showPreviousAyat untuk membenarkan pemainan semula audio
function showNextAyat() {
    pauseAudio();
    currentAyatIndex = (currentAyatIndex + 1) % alFatihahData.ayat.length;
    var nextAyatData = alFatihahData.ayat[currentAyatIndex];

    // Set surahNumberArabic based on the first ayat of each surah
    if (nextAyatData.ayatNumber === 1) {
        nextAyatData.surahNumberArabic = nextAyatData.surahNumberArabic;
    }

    selectAyat(nextAyatData);
    isAudioPlaying = false;
    updatePlayStopButtonText();
}



function showPreviousAyat() {
    pauseAudio();
    currentAyatIndex = (currentAyatIndex - 1 + alFatihahData.ayat.length) % alFatihahData.ayat.length;
    selectAyat(alFatihahData.ayat[currentAyatIndex]);
    isAudioPlaying = false;
    updatePlayStopButtonText();
}

function pauseAudio() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();
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
    playStopButton.textContent = isAudioPlaying ? "[ || ]" : "[ > ]";
}

// Fungsi untuk menghilangkan gambar audio player
function hideAudioPlayer() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.style.display = "none";
}





// Call updatePlayStopButtonText after the page has loaded
window.onload = function () {
    selectAyat(alFatihahData.ayat[currentAyatIndex]);
    updatePlayStopButtonText();
};
