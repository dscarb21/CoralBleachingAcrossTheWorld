export function showWelcome() {
    // Create the popup dynamically
    var popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    
    var popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    var closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'x';
    closeBtn.onclick = function() {
        closePopup();
    };
    
    var popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Coral Bleaching Across The World';
    
    var paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Welcome to our coral bleaching map that uses data from Coral Watch to show coral bleaching sites around the world!';
    
    var paragraph2 = document.createElement('p');
    paragraph2.textContent = 'Click on an observation to read about the coral being recorded at each specific site.';
    
    var sourceLink1 = document.createElement('a');
    sourceLink1.href = 'https://coralwatch.org/';
    sourceLink1.textContent = 'Data Source';
    sourceLink1.target = '_blank'; // Open link in a new tab
    
    var sourceLink2 = document.createElement('a');
    sourceLink2.href = 'https://oceanservice.noaa.gov/facts/coral_bleach.html';
    sourceLink2.textContent = 'What is Coral Bleaching?';
    sourceLink2.target = '_blank'; // Open link in a new tab
    
    var sourceLink3 = document.createElement('a');
    sourceLink3.href = 'https://coralreef.noaa.gov/education/coralfacts.html';
    sourceLink3.textContent = 'More On Coral';
    sourceLink3.target = '_blank'; // Open link in a new tab
    
    // Append elements to build the popup
    popupContent.appendChild(closeBtn);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(paragraph1);
    popupContent.appendChild(paragraph2);
    popupContent.appendChild(document.createElement('br'));
    popupContent.appendChild(sourceLink1);
    popupContent.appendChild(sourceLink2);
    popupContent.appendChild(document.createElement('br'));
    popupContent.appendChild(document.createElement('br'));
    popupContent.appendChild(sourceLink3);
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);
}

function closePopup() {
    var popupContainer = document.querySelector('.popup-container');
    if (popupContainer) {
        document.body.removeChild(popupContainer);
    }
}
