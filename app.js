let play = document.getElementById('play');
let imgdiv = document.querySelector('.imgDiv');
let playicon = document.querySelector('.fa-play');
let music = document.querySelector('audio');
let after = document.querySelector('.mydiv');
let titel = document.getElementById('titel');
let artist = document.getElementById('songAth');
let back = document.getElementById('back');
let next = document.getElementById('next');
let img = document.querySelector('img');
let progress = document.querySelector('.progress_bar');
let curtime = document.getElementById('curtime');
let durtime = document.getElementById('durtime');
let widthbar = document.querySelector('.widthBar');


let songs =[
    {
        name:"sound1",
        titel:"kichu valo lagenah",
        artist:'kaji nojrul islam'
    },
    {
        name:"sound2",
        titel:"mon mane na",
        artist:'robindronath'
    },
    {
        name:"sound3",
        titel:"Hindi New Song",
        artist:'Atif Aslam'
    }
]

// song state ment not play
let isplaing =false;


// play function 
let playsong = () => {

    isplaing = true;

    imgdiv.classList.add('play')
    playicon.classList.replace('fa-play',"fa-pause")
    play.style.color ="rgb(255, 0, 212)"
    music.play()
    after.style.left = 370+"px"
}

// pause function
let pausesong = () =>{

    isplaing = false;

    imgdiv.classList.remove('play')
    playicon.classList.replace('fa-pause',"fa-play")
    play.style.color ="black"
    music.pause()
    after.style.left = 565+"px"
}

// play button statement what to do
play.addEventListener('click', ()=>{
    if(!isplaing){
        playsong()
    }else{
        pausesong()
    }
})

// load song by object array

let loadsong = (songs)=>{
    
    titel.innerText = songs.titel;
    artist.innerText = songs.artist;
    img.src = "./img/"+songs.name+".JPG";
    music.src = "./sounds/"+songs.name+".mp3";

}


// next songs encrement function 
let songindex = 0;
let nextsong = () =>{
    songindex = (songindex + 1 ) % songs.length
    loadsong(songs[songindex]);
    playsong()
}

// next function diclaration

next.addEventListener('click', nextsong);


// back songs encrement function 

let backsong = () =>{
    songindex = (songindex - 1 + songs.length) % songs.length
    loadsong(songs[songindex]);
    playsong()
}

// back function diclaration

back.addEventListener('click', backsong);

// music time update function
music.addEventListener('timeupdate', (e) =>{

    let {currentTime,duration} = e.srcElement;

    // progress width count and insert width
    let progress_item = (currentTime / duration) *100;
    progress.style.width = progress_item +"%";

    // duration time setup
    let mints = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);


    // curentime setup
    let mints1 = Math.floor(currentTime /60);
    let sec1 = Math.floor(currentTime % 60);


    // just time less then 10 it will added extra 0 before single number

    if (sec1 < 10 && mints1 < 10 ) {

        
        sec1 = `0${sec1}`
        mints1 = `0${mints1}`

        
    } else {
      
        sec1 = sec1
        mints1 = mints1
        
    }

    // duration time inssert in dom

    if(duration){
        durtime.innerText = `${mints}:${sec}`

    }

    // currentime inssert in dom 
    if(currentTime){
        curtime.innerText = `${mints1}:${sec1}`
    }


});

// after finish the song play the next song

music.addEventListener('ended',nextsong);

// width bar progress after click 

widthbar.addEventListener('click', (e) =>{

    let {duration} = music;
    let progress_value = (e.offsetX / e.srcElement.clientWidth)*duration
    progress.style.width = progress_value+"px"
    console.log(progress_value);
    music.currentTime = progress_value;


})


