const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const audio = document.querySelector('#audio')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const cover = document.querySelector('#cover')
const goto = document.querySelector('#goto')
// const sideCoverContainer = document.querySelector('.sideCover-container')

function loadSong(song){
    title.innertext = "Holy"
    artist.innerText = "Tandempande"
    audio.src = "music/holy 2 - tandem pande.mp3"
    cover.src = "images/holy.jpg"
}

/////Music Player/////////
function playSong(){
    musicContainer.classList.add('play')
    // sideCoverContainer.classList.add('play')//side panel cover rotation
    cover.classList.add('play')//glow
    goto.classList.add('play')//visible animation
    goto.classList.remove('pause')//remove inbisibility
    playBtn.querySelector('i.fas').classList.remove('fa-play')//change to pause button
    playBtn.querySelector('i.fas').classList.add('fa-pause')//change to pause button

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    // sideCoverContainer.classList.remove('play')//stop side panel cover rotation
    cover.classList.remove('play')
    goto.classList.add('pause')
    goto.classList.remove('play')
    
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    
    audio.pause()
}

function restartSong(){
    audio.currentTime = 0
}


//Progress Bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}


//Song Navigation Listeners
playBtn.addEventListener('click', ()=>{
const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
     pauseSong()
    }else{
    playSong()
    }
})
prevBtn.addEventListener('click', restartSong)

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended',pauseSong)


//infoPanel
function openNav() {
    document.getElementById("mySidepanel").classList.add("open")
    document.getElementById("mySidepanel").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").classList.remove("open")
    document.getElementById("mySidepanel").style.width = "0";
  }