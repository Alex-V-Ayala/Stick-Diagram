
// Create Array of all the available pitches on the Stick Classic Tuning.
const noteList = [];

for (let i = 1; i < 7; i++) {
    let num = i.toString();
    if (num < 6) {
        noteList.push('.C' + num, 
                      '.CSH' + num,
                      '.D' + num,
                      '.DSH' + num,
                      '.E' + num,
                      '.F' + num,
                      '.FSH' + num,
                      '.G' + num,
                      '.GSH' + num,
                      '.A' + num,
                      '.ASH' + num,
                      '.B' + num
                    );
    } else {
        noteList.push('.C6', '.CSH6', '.D6');
    }
}

// Class list for different colors depending on sequence of notes clicked;
// names of classes for use in CSS.
// To add color, add it here and also in the switch statement within the 
// addEventListener method for the keyboard.
const originalColorList = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

// Attributes of initial list for later reference
const lastColor = originalColorList[originalColorList.length - 1];
const numOfColors = originalColorList.length;

// Add event listeners to all keys on the keyboard and all frets on the Stick:
// if one key/fret is selected, all keys/frets of the same pitch are selected;
// if one key/fret is hovered over, all keys/frets are highlighted with hover effect.
for (let i = 0; i < noteList.length; i++) {
    const currentStickNotes = document.querySelectorAll('.stick ' + noteList[i]);
    const currentKey = document.querySelector('.keyboard ' + noteList[i]);
    let colorList = originalColorList;
    
    // Keyboard event listener for click effect.
    currentKey.addEventListener('click', function() {
        if (!currentKey.classList.contains('selected')) {
            currentKey.classList.add('selected', colorList[0]);
            currentStickNotes.forEach(element => element.classList.add('selected', colorList[0]));
            if (colorList[0] !== lastColor) { colorList.shift() }
        } else {
            currentKey.classList.remove('selected');
            currentStickNotes.forEach(element => element.classList.remove('selected'));
            for (let j = 1; j < numOfColors + 1; j++) {
                if (currentKey.classList.contains('color-' + j)) { 
                    currentKey.classList.remove('color-' + j) 
                    currentStickNotes.forEach(element => element.classList.remove('color-' + j));
                }
            }
            switch (colorList[0]) {
                case 'color-5': colorList.unshift('color-4'); break;
                case 'color-4': colorList.unshift('color-3'); break;
                case 'color-3': colorList.unshift('color-2'); break;
                case 'color-2': colorList.unshift('color-1'); break;
            }
        }
    });
    
    // Stick event listener for click event.
    currentStickNotes.forEach(element => element.addEventListener('click', function(event) {
        if (!currentKey.classList.contains('selected')) {
            currentKey.classList.add('selected', colorList[0]);
            currentStickNotes.forEach(element => element.classList.add('selected', colorList[0]));
            if (colorList[0] !== lastColor) { colorList.shift() }
        } else {
            currentKey.classList.remove('selected');
            currentStickNotes.forEach(element => element.classList.remove('selected'));
            for (let j = 1; j < numOfColors + 1; j++) {
                if (currentKey.classList.contains('color-' + j)) { 
                    currentKey.classList.remove('color-' + j) 
                    currentStickNotes.forEach(element => element.classList.remove('color-' + j));
                }
            }
            switch (colorList[0]) {
                case 'color-5': colorList.unshift('color-4'); break;
                case 'color-4': colorList.unshift('color-3'); break;
                case 'color-3': colorList.unshift('color-2'); break;
                case 'color-2': colorList.unshift('color-1'); break;
            }
        }
    }));


    // Event listeners for hover effect.
    currentKey.addEventListener('mouseenter', function() {
        currentKey.classList.add('hover');
        currentStickNotes.forEach(element => element.classList.add('hover'));
    });
    currentKey.addEventListener('mouseleave', function() {
        currentKey.classList.remove('hover');
        currentStickNotes.forEach(element => element.classList.remove('hover'));
    });

    currentStickNotes.forEach(element => element.addEventListener('mouseenter', function(event) {
        event.target.classList.add('hover');
        if (!currentKey.classList.contains('hover')) {
            currentKey.classList.add('hover');
        }
    }));
    currentStickNotes.forEach(element => element.addEventListener('mouseleave', function(event) {
        event.target.classList.remove('hover');
        if (currentKey.classList.contains('hover')) {
            currentKey.classList.remove('hover');
        }
    }));
}


// Adds refresh key
document.addEventListener('keydown', function(event) {
    if (event.key ===  ' ') {
        location.reload();
    }
});
