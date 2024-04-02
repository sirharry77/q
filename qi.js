// JavaScript code to load Quran data and populate the columns dynamically

// Function to build the surah list
function buildSurahList() {
  var surahListContainer = document.getElementById('surah-list');
  var surahListHTML = '<table class="table">';
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
}

function loadSurah(surahNumber, verseRange) {
    console.log("Loading Surah:", surahNumber);
    console.log("Verse Range:", verseRange);
    var surah = surahData[surahNumber];
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

        // Check if it's a single verse request or full surah request
        if (verseRange && verseRange.length === 1) {
            // Single verse request
            var verse = parseInt(verseRange[0]);
            if (verse > 0 && verse <= totalVerses) {
                // Adjusting to 0-based indexing for Surah 1 and Surah 9
                startVerse = surahNumber === 1 || surahNumber === 9 ? verse - 1 : verse;
                endVerse = startVerse;
            } else {
                console.error('Invalid verse range for surah number ' + surahNumber);
                window.location.href = '#/contents'; // Redirect to contents page
                return;
            }
        } else if (verseRange && verseRange.length === 2) {
            // Verse range request
            var start = parseInt(verseRange[0]);
            var end = parseInt(verseRange[1]);
            
            // Adjust verse numbers for Surah 1 and Surah 9
            startVerse = surahNumber === 1 || surahNumber === 9 ? start - 1 : start;
            endVerse = surahNumber === 1 || surahNumber === 9 ? end - 1 : end;

            // Adjust endVerse if it exceeds totalVerses
            if (endVerse >= totalVerses) {
                endVerse = totalVerses - 1;
            }
        } else {
            // Full surah request
            startVerse = 0;
            endVerse = totalVerses - 1;
        }

        console.log("Start Verse:", startVerse + 1); // Adjust back to 1-based indexing for logging
        console.log("End Verse:", endVerse + 1); // Adjust back to 1-based indexing for logging

        for (var i = startVerse; i <= endVerse; i++) {
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
    
    // Hide the current displayed surah content
    hideSurahContent();

    // Hide the "Prev. Chapter" and "Next Chapter" buttons
    var prevChapterBtn = document.getElementById('prev-chapter-btn');
    var nextChapterBtn = document.getElementById('next-chapter-btn');
    if (prevChapterBtn && nextChapterBtn) {
      prevChapterBtn.style.display = 'none';
      nextChapterBtn.style.display = 'none';
    } else {
      console.error('Prev chapter button or next chapter button not found.');
    }
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

  if (surahNumber <= 1) {
    prevChapterBtn.classList.add('disabled'); // Disable prev chapter button on first surah or invalid surah
    nextChapterBtn.classList.remove('disabled'); // Enable next chapter button on first surah or invalid surah
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

// Function to handle hash changes
function handleHashChange() {
    var hash = window.location.hash;
    console.log("Hash:", hash);
    if (hash) {
        var hashParts = hash.substring(2).split(':'); // Remove the '#/' and split by ':'
        var surahNumber = hashParts[0]; // Extract the surah number part
        console.log("Surah Number:", surahNumber);
        var verseRange = hashParts[1] ? hashParts[1].split('-') : null; // Split verse range by '-'
        console.log("Verse Range:", verseRange);

        if (surahNumber === 'contents') {
            console.log('Contents page loaded');
            // Handle loading contents page
            showSurahList();
        } else {
            var surah = surahData[surahNumber];
            console.log("Surah Data:", surah);
            if (surah) {
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
                    if (startVerse > totalVerses || endVerse > totalVerses || startVerse < 1 || endVerse < 1) {
                        console.error('Invalid verse range for surah number ' + surahNumber);
                        window.location.href = '#/contents'; // Redirect to contents page
                        return;
                    }
                    loadSurah(surahNumber, [startVerse, endVerse]);
                }
                hideSurahList();
                toggleChapterButtons(surahNumber); // Toggle visibility of chapter buttons
            } else {
                console.error('Surah data not found for surah number: ' + surahNumber);
                window.location.href = '#/contents'; // Redirect to contents page
            }
        }
    } else {
        // Show surah list if no hash in URL (initial page load)
        showSurahList();
    }
}


// Call handleHashChange() initially to handle the initial URL
handleHashChange();

// Add event listener for hash changes
window.onhashchange = handleHashChange;

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
        // Iterate through all verses to find matching keywords
        var matchingVerses = [];
        for (var i = 1; i <= 114; i++) {
            var surah = surahData[i];
            if (surah) {
                for (var j = 0; j < surah.ayat.length; j++) {
                    var verse = surah.ayat[j];
                    if (verse.translation.toLowerCase().includes(query.toLowerCase())) {
                        matchingVerses.push({ surah: i, verse: j + 1 });
                    }
                }
            }
        }
        // Display the matching verses or handle the search results accordingly
        if (matchingVerses.length > 0) {
            // Process and display the matching verses
            console.log('Matching verses:', matchingVerses);
        } else {
            console.log('No matching verses found for query:', query);
        }
    }
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

// Close modal when "Close" button is clicked
document.querySelector('#searchModal .modal-footer .btn-secondary').addEventListener('click', function() {
    $('#searchModal').modal('hide');
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the container element
    var container = document.querySelector('.container');

    // Check if the top navbar is visible or hidden
    var topNavBar = document.getElementById('top-bar');
    var isTopNavBarVisible = window.getComputedStyle(topNavBar).display !== 'none';

    // Add padding to the container only if the top navbar is visible
    if (isTopNavBarVisible) {
        container.style.paddingTop = '50px'; // Adjust as needed
    }
});

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var scrollButton = document.querySelector('.scroll-to-top');

    // If scroll position is greater than 100 (adjust this value as needed)
    // Show the scroll to top button, otherwise hide it
    if (scrollPosition > 100) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Add click event listener to the scroll to top button
document.querySelector('.scroll-to-top').addEventListener('click', function() {
    // Scroll to the top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling behavior
    });
});


