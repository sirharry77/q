// JavaScript code to load Quran data and populate the columns dynamically

// Function to build the surah list
function buildSurahList() {
  var surahListContainer = document.getElementById('surah-list');
  var surahListHTML = '<table class="table surah-list-table">';
  surahListHTML += '<thead><tr><th></th><th>Chapter</th><th></th><th>Verses</th></tr></thead>';
  surahListHTML += '<tbody>';
  for (var i = 1; i <= 114; i++) {
    var surahName = surahData[i].surahName;
    var surahNameArabic = surahData[i].surahNameArabic;
    var surahNumber = surahData[i].surahNumber; // Get the surah number
    var totalVerses = surahData[i].ayat.length; // Get the total number of verses
    // Exclude verse 0 if it exists
    if (surahData[i].ayat[0].ayatNumber === 0) {
      totalVerses--;
    }
    surahListHTML += '<tr class="surah-link" data-surah="' + i + '">';
    surahListHTML += '<td>' + surahNumber + '.</td>';
    surahListHTML += '<td>' + surahName + '</td>';
    surahListHTML += '<td>' + surahNameArabic + '</td>';
    surahListHTML += '<td>' + totalVerses + '</td>';
    surahListHTML += '</tr>';
  }
  surahListHTML += '</tbody></table>';
  surahListContainer.innerHTML = surahListHTML;

  // Add click event listener to surah links
  var surahLinks = document.getElementsByClassName('surah-link');
  for (var j = 0; j < surahLinks.length; j++) {
    surahLinks[j].addEventListener('click', function() {
      var surahNumber = this.getAttribute('data-surah');
      updateURL(surahNumber);
      loadSurah(surahNumber);
      hideSurahList();
      toggleChapterButtons(surahNumber);
    });
  }
  
  // Check if the URL contains '#/contents' and handle it
  if (window.location.hash.includes('#/contents')) {
    console.log('Contents page loaded');
    // Handle loading contents page
    showSurahList();
  }
}

// Function to update URL
function updateURL(surahNumber) {
  var newURL = window.location.origin + window.location.pathname + '#/' + surahNumber;
  window.history.pushState({path:newURL},'',newURL);
  scrollToTop();
}


function loadSurah(surahNumber, verseRange) {
    console.log("Loading Surah:", surahNumber);
    console.log("Verse Range:", verseRange);

    // Convert surahNumber to integer (if it's a string)
    surahNumber = parseInt(surahNumber);

    var surah = surahData[surahNumber]; // Accessing surah data without subtracting 1
    console.log("Surah Data:", surah);
    if (surah) {
        console.log("Surah Data Found:", surah);
        var translationColumn = document.getElementById('translation-column');
        var footnotesColumn = document.getElementById('footnotes-column');

        // Clear previous content
        translationColumn.innerHTML = '';
        footnotesColumn.innerHTML = '';

        // Determine total number of verses in the surah
        var totalVerses = surah.ayat.length;

        // Determine which verses to load
        var startVerse, endVerse;

        // Check if verseRange is provided and has valid values
        if (verseRange && verseRange.length === 2 && !isNaN(parseInt(verseRange[0])) && !isNaN(parseInt(verseRange[1]))) {
            var start = parseInt(verseRange[0]);
            var end = parseInt(verseRange[1]);
            startVerse = surahNumber === 1 || surahNumber === 9 ? start - 1 : start; // Adjust start verse for Surah 1 and Surah 9
            endVerse = surahNumber === 1 || surahNumber === 9 ? end - 1 : end; // Adjust end verse for Surah 1 and Surah 9
        } else if (verseRange && verseRange.length === 1 && verseRange[0] === '1') {
            // Handle special case where only a single verse number is provided
            startVerse = parseInt(verseRange[0]) - 1;
            endVerse = parseInt(verseRange[0]) - 1;
        } else if (verseRange && verseRange.length === 1 && verseRange[0] === '0' && (surahNumber !== 1 && surahNumber !== 9)) {
            // Handle special case where verse range is '0' for surahs other than surah 1 and surah 9
            startVerse = 0;
            endVerse = 0;
        } else if (verseRange && verseRange.length === 1 && verseRange[0] === '0') {
            // Handle invalid case where verse range is '0' for surah 1 and surah 9
            console.error('Invalid verse range: ' + verseRange);
            window.location.href = '#/contents'; // Redirect to contents page
            return;
        } else {
            startVerse = 0;
            endVerse = totalVerses - 1;
        }

        console.log("Start Verse:", startVerse + 1); // Adjust back to 1-based indexing for logging
        console.log("End Verse:", endVerse + 1); // Adjust back to 1-based indexing for logging

// Check if surah and surah.ayat are defined
if (surah && surah.ayat) {
    for (var i = startVerse; i <= endVerse; i++) {
        // Check if surah.ayat[i] is defined
        if (surah.ayat[i]) {
            // Create verse wrapper to hold both translation and Arabic text
            var verseWrapper = document.createElement('div');
            verseWrapper.classList.add('verse-wrapper');

            // Include subtitles if available
            if (surah.ayat[i].subtitle) {
                var subtitleContainer = document.createElement('div');
                subtitleContainer.classList.add('subtitle');
                subtitleContainer.innerHTML = '<p>' + surah.ayat[i].subtitle + '</p>';
                translationColumn.appendChild(subtitleContainer); // Append subtitle directly to translation column
            }

            // Create translation verse container
            var translationVerse = document.createElement('div');
            translationVerse.classList.add('translation-verse');
            translationVerse.setAttribute('data-verse-number', surah.ayat[i].surahNumber + ':' + surah.ayat[i].ayatNumber);
            translationVerse.innerHTML = surah.ayat[i].translation;

            // Append translation verse container to verse wrapper
            verseWrapper.appendChild(translationVerse);

            // Create Arabic text container
            var arabicVerse = document.createElement('div');
            arabicVerse.classList.add('arabic-verse');
            arabicVerse.setAttribute('data-arabic-verse-number', surah.ayat[i].surahNumberArabic + ':' + surah.ayat[i].ayatNumberArabic);
            arabicVerse.innerHTML = surah.ayat[i].arabicText;

            // Append Arabic text container to verse wrapper
            verseWrapper.appendChild(arabicVerse);

            // Append verse wrapper to translation column
            translationColumn.appendChild(verseWrapper);

            // Include footnotes if available
            if (surah.ayat[i].footnotes && surah.ayat[i].footnotes.length > 0) {
                var footnotesContainer = document.createElement('div');
                footnotesContainer.classList.add('footnotes');
                footnotesContainer.innerHTML = '<p>' + surah.ayat[i].footnotes.join('</p><p>') + '</p>';
                translationColumn.appendChild(footnotesContainer); // Append footnotes to translation column
            }
        }
    }
}


// For desktop top-bar buttons
var prevVerseBtnDesktop = document.getElementById('prev-verse-btn');
var nextVerseBtnDesktop = document.getElementById('next-verse-btn');

// For mobile bottom-bar buttons
var prevVerseBtnMobile = document.getElementById('prev-verse-btn-mobile');
var nextVerseBtnMobile = document.getElementById('next-verse-btn-mobile');

if (verseRange && verseRange.length === 2 && !isNaN(parseInt(verseRange[0])) && !isNaN(parseInt(verseRange[1]))) {
    var startVerseNumber = parseInt(verseRange[0]);
    var endVerseNumber = parseInt(verseRange[1]);
    
    if (startVerseNumber === endVerseNumber) {
        // Only one verse is being displayed
        var isFirstVerse = startVerseNumber === 0 || startVerseNumber === 1; // Adjust for Surah 1 and Surah 9
        var isLastVerse = (surahNumber === 1 || surahNumber === 9) ? endVerseNumber === totalVerses : endVerseNumber === totalVerses - 1;

        if (isFirstVerse) {
            prevVerseBtnDesktop.style.display = 'none';
            nextVerseBtnDesktop.style.display = 'inline-block';
            nextVerseBtnDesktop.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (endVerseNumber + 1);
            };
            prevVerseBtnMobile.style.display = 'none';
            nextVerseBtnMobile.style.display = 'inline-block';
            nextVerseBtnMobile.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (endVerseNumber + 1);
            };
        } else if (isLastVerse) {
            prevVerseBtnDesktop.style.display = 'inline-block';
            nextVerseBtnDesktop.style.display = 'none';
            prevVerseBtnDesktop.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (startVerseNumber - 1);
            };
            prevVerseBtnMobile.style.display = 'inline-block';
            nextVerseBtnMobile.style.display = 'none';
            prevVerseBtnMobile.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (startVerseNumber - 1);
            };
        } else {
            prevVerseBtnDesktop.style.display = 'inline-block';
            nextVerseBtnDesktop.style.display = 'inline-block';
            prevVerseBtnDesktop.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (startVerseNumber - 1);
            };
            nextVerseBtnDesktop.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (endVerseNumber + 1);
            };
            prevVerseBtnMobile.style.display = 'inline-block';
            nextVerseBtnMobile.style.display = 'inline-block';
            prevVerseBtnMobile.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (startVerseNumber - 1);
            };
            nextVerseBtnMobile.onclick = function() {
                window.location.href = '#/' + surahNumber + ':' + (endVerseNumber + 1);
            };
        }
    } else {
        // Multiple verses are being displayed
        prevVerseBtnDesktop.style.display = 'none';
        nextVerseBtnDesktop.style.display = 'none';
        prevVerseBtnMobile.style.display = 'none';
        nextVerseBtnMobile.style.display = 'none';
    }
} else {
    // Verse range is not provided or invalid
    prevVerseBtnDesktop.style.display = 'none';
    nextVerseBtnDesktop.style.display = 'none';
    prevVerseBtnMobile.style.display = 'none';
    nextVerseBtnMobile.style.display = 'none';
}


    } else {
        console.error('Surah data not found for surah number: ' + surahNumber);
        window.location.href = '#/contents'; // Redirect to contents page
    }
}


// Function to hide the surah list
function hideSurahList() {
  var surahListSection = document.getElementById('surah-list-section');
  if (surahListSection) {
    surahListSection.style.display = 'none';
  } else {
    console.error('Surah list section not found.');
  }
}

// Function to show the surah list, update the URL, and hide the current displayed surah
function showSurahList() {
  var surahListSection = document.getElementById('surah-list-section');
  if (surahListSection) {
    surahListSection.style.display = 'block';
    
    // Update URL to include '#/contents'
    updateURL('contents');
    hideButtonsForContentsPage();
    // Hide the current displayed surah content
    hideSurahContent();
	scrollToTop();
	
  } else {
    console.error('Surah list section not found.');
  }
}


// Function to hide the current displayed surah content
function hideSurahContent() {
  var translationColumn = document.getElementById('translation-column');
  var footnotesColumn = document.getElementById('footnotes-column');
  
  // Clear the content of translation and footnotes columns
  translationColumn.innerHTML = '';
  footnotesColumn.innerHTML = '';
}

// Add click event listener to contents button
document.getElementById('contents-btn').addEventListener('click', function() {
  showSurahList();
});

document.getElementById('contents-btn-mobile').addEventListener('click', function() {
  showSurahList();
});

// Function to toggle visibility of chapter buttons based on the surah number
function toggleChapterButtons(surahNumber) {
    var prevChapterBtn = document.getElementById('prev-chapter-btn');
    var nextChapterBtn = document.getElementById('next-chapter-btn');

    // Check if the surahNumber is not a valid number
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        prevChapterBtn.classList.add('disabled');
        nextChapterBtn.classList.add('disabled');
    } else if (surahNumber <= 1) {
        prevChapterBtn.classList.add('disabled'); // Disable prev chapter button on first surah
        nextChapterBtn.classList.remove('disabled'); // Enable next chapter button on first surah
    } else if (surahNumber >= 114) {
        prevChapterBtn.classList.remove('disabled'); // Enable prev chapter button on last surah
        nextChapterBtn.classList.add('disabled'); // Disable next chapter button on last surah
    } else {
        prevChapterBtn.classList.remove('disabled'); // Enable prev chapter button
        nextChapterBtn.classList.remove('disabled'); // Enable next chapter button
    }
    prevChapterBtn.style.display = 'inline-block'; // Show prev chapter button
    nextChapterBtn.style.display = 'inline-block'; // Show next chapter button
}


// Add click event listener to prev chapter button
document.getElementById('prev-chapter-btn').addEventListener('click', function() {
  var currentSurahNumber = parseInt(window.location.hash.substring(2));
  var prevSurahNumber = currentSurahNumber - 1;
  updateURL(prevSurahNumber);
  loadSurah(prevSurahNumber);
  toggleChapterButtons(prevSurahNumber);
});

// Add click event listener to next chapter button
document.getElementById('next-chapter-btn').addEventListener('click', function() {
  var currentSurahNumber = parseInt(window.location.hash.substring(2));
  var nextSurahNumber = currentSurahNumber + 1;
  updateURL(nextSurahNumber);
  loadSurah(nextSurahNumber);
  toggleChapterButtons(nextSurahNumber);
});

// Call the function to build the surah list when the page loads
window.onload = function() {
  buildSurahList();

  // Check if there is a hash in the URL and load the corresponding surah
  var hash = window.location.hash;
  if (hash) {
    handleHashChange(); // Load surah based on hash
  } else {
    // Show surah list if no hash in URL (initial page load)
    showSurahList();
  }
};

function handleHashChange() {
    var hash = window.location.hash;
    console.log("Hash:", hash);
    if (hash) {
        if (hash.startsWith('#/search?q=')) {
            var searchQuery = hash.substring('#/search?q='.length); // Extract the search query
            console.log("Search Query:", searchQuery);
            
            // Perform keyword search
            search(searchQuery);

        } else {
            var hashParts = hash.substring(2).split(':'); // Remove the '#/' and split by ':'
            var surahNumber = hashParts[0]; // Extract the surah number part
            console.log("Surah Number:", surahNumber);
            var verseRange = hashParts[1] ? hashParts[1].split('-') : null; // Split verse range by '-'
            console.log("Verse Range:", verseRange);

            if ((surahNumber === '1' || surahNumber === '9') && verseRange && verseRange.length === 1 && verseRange[0] === '0') {
                console.log('Redirecting to contents page');
                window.location.href = '#/contents';
                return; // Exit the function after redirecting
            }

            // Check if the surahNumber is a valid surah number
            if (!isNaN(surahNumber) && surahNumber >= 1 && surahNumber <= 114) {
                var surah = surahData[surahNumber];
                console.log("Surah Data:", surah);
                if (surah && surah.surahNumber) { // Check if surah and surahNumber are defined
                    var totalVerses = surah.ayat.length;
                    console.log("Total Verses:", totalVerses);
                    if (!verseRange) { // Check if verseRange is null
                        // Load all verses of the surah if no verse range is specified
                        loadSurah(surahNumber);
                    } else {
                        var startVerse = parseInt(verseRange[0]);
                        var endVerse = parseInt(verseRange[1]) || startVerse; // If end verse is not provided, assume single verse
                        console.log("Start Verse:", startVerse);
                        console.log("End Verse:", endVerse);
                        if (startVerse > totalVerses || endVerse > totalVerses || startVerse < 0 || endVerse < 0) {
                            console.error('Invalid verse range for surah number ' + surahNumber);
                            return; // Exit the function if the verse range is invalid
                        }
                        loadSurah(surahNumber, [startVerse, endVerse]);
                    }
                    hideSurahList();
                    toggleChapterButtons(surahNumber); // Toggle visibility of chapter buttons
                } else {
                    console.error('Surah data not found for surah number: ' + surahNumber);
                    return;
                }
            } else {
                console.error('Invalid surah number:', surahNumber);
                return;
            }
        }
    } else {
        // Show surah list if no hash in URL (initial page load)
        showSurahList();
    }
}

window.addEventListener('hashchange', handleHashChange);
// Call handleHashChange() initially to handle the initial URL
handleHashChange();

// Add event listener for hash changes
//window.onhashchange = handleHashChange;



function search(q) {
    var query = q.trim();
    if (!query) return;

    // Check if the query includes a surah number, verse range, or keyword search
    var surahNumberRegex = /^[1-9][0-9]*$/; // Regular expression to match surah numbers
    var verseRangeRegex = /^[1-9][0-9]*:[0-9]*(-[0-9]*)?$/; // Regular expression to match verse ranges, including verse 0

    if (surahNumberRegex.test(query)) {
        // Surah number
        var surahNumber = parseInt(query);
        if (surahNumber >= 1 && surahNumber <= 114) {
            loadSurah(surahNumber);
            updateURL(surahNumber);
            hideSurahList();
            toggleChapterButtons(surahNumber);
        } else {
            console.error('Invalid surah number:', surahNumber);
        }
    } else if (verseRangeRegex.test(query)) {
        // Verse range
        var parts = query.split(':');
        var surahNum = parseInt(parts[0]);
        var verseNums = parts[1].split('-');
        var startVerse = parseInt(verseNums[0]);

        // Treat verse 0 as the first verse
        if (startVerse === 0) {
            startVerse = 1;
        }

        var endVerse = verseNums.length > 1 ? parseInt(verseNums[1]) : startVerse;

        if (surahNum >= 1 && surahNum <= 114 && startVerse >= 1 && endVerse >= startVerse) {
            loadSurah(surahNum, [startVerse, endVerse]);
            updateURL(surahNum + ':' + startVerse + '-' + endVerse);
            hideSurahList();
            toggleChapterButtons(surahNum);
        } else {
            console.error('Invalid verse range:', query);
        }
    } else {
        // Keyword search
        // Update URL with search query
        updateURL('search?q=' + encodeURIComponent(query));
        hideSurahList();
        hideButtonsForContentsPage();
		toggleChapterButtons(surahNumber);
        // Perform keyword search
        searchQuery = q.trim(); // Store the search query in a variable accessible to other functions
        var matchingVerses = performKeywordSearch(query);

        // Display the matching verses
        displaySearchResults(matchingVerses, query);
			
    }
}

function performKeywordSearch(query) {
    // Convert the query to lowercase for case-insensitive matching
    var searchTerm = query.trim().toLowerCase();

    // Array to store matching verses
    var matchingVerses = [];

    // Iterate through all verses to find matching keywords
    for (var i = 1; i <= 114; i++) {
        var surah = surahData[i];
        if (surah) {
            for (var j = 0; j < surah.ayat.length; j++) {
                var verse = surah.ayat[j];
                // Convert the verse translation to lowercase for case-insensitive matching
                var verseText = verse.translation.toLowerCase();
                // Convert the Arabic text to lowercase for case-insensitive matching
                var arabicText = verse.arabicText.toLowerCase();
                // Check if the verse contains the search term in translation or Arabic text
                if (verseText.includes(searchTerm) || arabicText.includes(searchTerm)) {
                    matchingVerses.push({ surah: i, verse: j + 1 });
                }
            }
        }
    }

    return matchingVerses;
}

function displaySearchResults(matchingVerses, searchQuery) {
    // Check if matchingVerses is not an array or if it's empty
    if (!Array.isArray(matchingVerses) || matchingVerses.length === 0) {
        // Display message indicating no matching verses found
        console.log('No matching verses found.');
        return; // Exit the function
    }

    // Clear previous search results
    clearSearchResults();

    // Get the translation column container
    var translationColumn = document.getElementById('translation-column');
	
    // Display the search query
    var searchQueryElement = document.createElement('div');
    searchQueryElement.textContent = 'Search results for: ' + searchQuery;
    translationColumn.appendChild(searchQueryElement);	

    // Iterate over matchingVerses array
    matchingVerses.forEach(function(verse) {
        var surah = surahData[verse.surah]; // Retrieve the surah data for the matching verse

        if (surah && surah.ayat[verse.verse - 1]) { // Check if surah and verse are valid
            var verseData = surah.ayat[verse.verse - 1]; // Get the verse data

            // Include subtitles if available
            if (verseData.subtitle) {
                var subtitleContainer = document.createElement('div');
                subtitleContainer.classList.add('subtitle');
                subtitleContainer.innerHTML = '<p>' + verseData.subtitle + '</p>';
                translationColumn.appendChild(subtitleContainer); // Append subtitle directly to translation column
            }

            // Create verse wrapper to hold both translation and Arabic text
            var verseWrapper = document.createElement('div');
            verseWrapper.classList.add('verse-wrapper');

            // Create translation verse container
            var translationVerse = document.createElement('div');
            translationVerse.classList.add('translation-verse');
            translationVerse.setAttribute('data-verse-number',  verseData.surahNumber + ':' + verseData.ayatNumber);

            // Highlight the search term within the translation text
            var highlightedTranslation = highlightSearchTerm(verseData.translation, searchQuery);

            // Set the inner HTML of the translation verse container with the highlighted text
            translationVerse.innerHTML = highlightedTranslation;

            // Append translation verse container to verse wrapper
            verseWrapper.appendChild(translationVerse);

            // Create Arabic verse container
            var arabicVerse = document.createElement('div');
            arabicVerse.classList.add('arabic-verse');
            arabicVerse.setAttribute('data-arabic-verse-number', verseData.surahNumberArabic + ':' + verseData.ayatNumberArabic);
            arabicVerse.innerHTML = verseData.arabicText;


            // Highlight the search term within the Arabic text
            var highlightedArabicText = highlightSearchTerm(verseData.arabicText, searchQuery);

            // Set the inner HTML of the Arabic verse container with the highlighted text
            arabicVerse.innerHTML = highlightedArabicText;				

            // Append Arabic verse container to verse wrapper
            verseWrapper.appendChild(arabicVerse);

            // Append verse wrapper to translation column
            translationColumn.appendChild(verseWrapper);

            // Include footnotes if available
            if (verseData.footnotes && verseData.footnotes.length > 0) {
                var footnotesContainer = document.createElement('div');
                footnotesContainer.classList.add('footnotes');
                footnotesContainer.innerHTML = '<p>' + verseData.footnotes.join('</p><p>') + '</p>';
                translationColumn.appendChild(footnotesContainer); // Append footnotes to translation column
            }
        }
    });
}

function highlightSearchTerm(text, searchTerm) {
    // Escape special characters in the search term to avoid regex errors
    var escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Create a regular expression with the search term and flags for case insensitivity
    var regex = new RegExp(escapedSearchTerm, 'gi');
    // Use the replace method with a callback function to wrap the search term with a <span> element
    var highlightedText = text.replace(regex, function(match) {
        return '<span class="highlight">' + match + '</span>';
    });
    return highlightedText;
}


// Function to clear search results
function clearSearchResults() {
    // Clear previous search results from the HTML content
    document.getElementById('translation-column').innerHTML = '';
}

// Add event listener to search button
document.getElementById('search-btn').addEventListener('click', function() {
  var query = document.getElementById('search-input').value;
  search(query);
});

// Add event listener to search input field for pressing Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    var query = e.target.value;
    search(query);
  }
});

// Add event listener to search button
document.getElementById('search-btn-modal').addEventListener('click', function() {
  var query = document.getElementById('search-input-mobile-modal').value;
  search(query);

  $('#searchModal').modal('hide');
});

// Show modal when the Search button is clicked
document.getElementById('search-btn-mobile').addEventListener('click', function() {
    $('#searchModal').modal('show');
});


// Close modal when "x" button is clicked
document.querySelector('#searchModal .close').addEventListener('click', function() {
    $('#searchModal').modal('hide');
});





// Function to hide buttons if hash is #/contents
function hideButtonsForContentsPage() {
    var hash = window.location.hash;
    console.log('Current hash:', hash);
    if (hash === '#/contents' || hash.startsWith('#/search?q=')) {
        document.getElementById('prev-verse-btn').style.display = 'none';
        document.getElementById('next-verse-btn').style.display = 'none';
        document.getElementById('prev-verse-btn-mobile').style.display = 'none';
        document.getElementById('next-verse-btn-mobile').style.display = 'none';		
        document.getElementById('prev-chapter-btn').style.display = 'none';
        document.getElementById('next-chapter-btn').style.display = 'none';			
    }
}

// Add an event listener for the hashchange event
window.addEventListener('hashchange', function() {
    hideButtonsForContentsPage();
});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo(0, 0);
}


