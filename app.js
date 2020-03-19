window.onload = function(){
    const app = function(){
        var song = document.querySelector(".song");
        var play = document.querySelector(".play");
        var outline = document.querySelector(".moving-outline circle");
        var video = document.querySelector(".vid-container video");

        //sound
        var sounds = document.querySelectorAll(".sound-picker button");
        //time display
        var timeDisplay = document.querySelector(".time-display");
        var timeSelect = document.querySelectorAll(".time-select button");

        //getting the length of the outline
        var outlineLength = outline.getTotalLength();
        // console.log(outlineLength);
        // duration
        var fDuration = 600;
        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

        //changing diffrenet sounds
        sounds.forEach(sound =>{
            sound.addEventListener("click",function(){
                song.src = this.getAttribute("data-sound");
                video.src = this.getAttribute("data-video");
                isplaying(song);
            })
        })


        //playing sounds
        play.addEventListener("click",function(){
            isplaying(song);
        })

        //Select sound
        timeSelect.forEach(option =>{
            option.addEventListener("click",function(){
                fDuration = this.getAttribute("data-time");
                timeDisplay.textContent = `${Math.floor(fDuration / 60)}:${Math.floor(fDuration % 60)}`
            })
        })

        // func for playing and to pause the sounds
        var isplaying = function(){
            if(song.paused){//we property called paused on audio files
            song.play();
            play.src = "svg/pause.svg";
            video.play();
            }
            else{
                song.pause();
                play.src = "svg/play.svg"
                video.pause();
            }
        }
        //animating circle
        song.ontimeupdate = function(){//keep a record of the song time
            var currentTime = song.currentTime;
            var elapsed = fDuration - currentTime;
            // var seconds = (elapsed % 60).toFixed(0);
            // var minutes = (elapsed / 60).toFixed(0);
            var seconds = Math.floor(elapsed % 60);
            var minutes = Math.floor(elapsed / 60);
            //actual animation
            var proress = outlineLength - (currentTime / fDuration) * outlineLength;
            outline.style.strokeDashoffset = proress;
            //text animation
            timeDisplay.textContent = `${minutes}:${seconds}`;

            if(currentTime >= fDuration){
                song.pause();
                song.currentTime = 0;
                play.src = "svg/play.svg";
                video.pause();
            }
        }
        
    }
    app();
}