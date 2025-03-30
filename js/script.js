document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const audioList = document.getElementById('audio-list');
    const instruments = document.querySelectorAll('.instrument');
    let sounds = [];

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault(); 
        dropZone.classList.add('dragover'); 
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault(); 
        dropZone.classList.remove('dragover');
        const audioFile = event.dataTransfer.getData('text'); 
        if (audioFile) {
            addSound(audioFile); 
        }
    });

    instruments.forEach((instrument) => {
        instrument.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', instrument.dataset.audio); 
        });
    });

    
    function addSound(audioPath) {
        const sound = new Audio(audioPath); 
        sound.loop = true; 
        sound.play(); 
        sounds.push(sound);

        const soundDiv = document.createElement('div');
        soundDiv.classList.add('audio-item');
        const instrumentName = Array.from(instruments).find(i => i.dataset.audio === audioPath).querySelector('img').alt;
        soundDiv.innerHTML = `
            <span>${instrumentName}</span>
            <button class="remove-btn">Remove</button>
        `;
        audioList.appendChild(soundDiv);

        soundDiv.querySelector('.remove-btn').addEventListener('click', () => {
            sound.pause();
            sounds = sounds.filter(s => s.src !== sound.src); 
            soundDiv.remove(); 
        });
    }
});