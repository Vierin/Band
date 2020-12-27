$(function(){

    $('.about-slider').slick({
        speed: 800,
        prevArrow: $('.slick_prev'),
        nextArrow: $('.slick_next'),
        dots: true,
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data('thumb');
            var role = ['Vocalist', 'Guitar', 'Bass', 'Drums', 'Electronics'];
            var persone = ['Lawrie Alton', 'Charles Timmy', 'Curt Sheard', 'Cade Ryker', 'Tommie Brendan'];
            return '<button class="slick-link"><span class="persone">'+ persone[i] + '</span><span class="dot"></span><span class="persone-role">' + role[i] +'</span></button> ';
        }
    });


    // player
    let song, id_song,
    songs = [
        muz_1 = [0, 'Miyagi - Mountains', 'audio/audio2.mp3', '176.901224'],
        muz_2 = [1, 'Morgenstern - El problema', 'audio/audio1.mp3', '137.221224'],
        muz_3 = [2, 'Miyagi - Atlant', 'audio/audio3.mp3', '228.493061'],
        muz_4 = [3, 'Miyagi - I got love', 'audio/audio4.mp3', '276.744425'],
        muz_5 = [4, 'Miyagi - Minor', 'audio/audio5.mp3', '175.830204'],
    ];

    for (i = 0; i < songs.length; i++){
        $('.playlist-items').append(`
            <li class="playlist-item" id="${songs[i][0]}">
                <div class="song-title">0${songs[i][0] + 1}. ${songs[i][1]}</div>
                <div class="song-duration">${parseInt(songs[i][3]/60)}:${parseInt(songs[i][3]%60)}</div>
            </li>
        `);
    }


    function playNewSong(id){
        let curtime,
        cur = -100;
        $('.play-now .song-title').text(songs[id][1]);
        $('.play-pause').attr('id', id);
        id_song = id;
        song = new Audio(songs[id][2]);
        $(`.playlist-items #${id} .song-title`).css({'font-weight':'bold'});
        song.play();

        song.addEventListener('timeupdate', function() {
            curtime = song.currentTime;
            cur = ((songs[id_song][3]-curtime)*100)/songs[id_song][3];
            $('.time').text(parseInt(curtime/60)+':'+parseInt(curtime%60));
            $('.progress-load').css({'right':cur+'%'});
        });
    }
    
    function playPauseSong(id){
        if(song){
            if(id == id_song){
                if(song.paused){
                    song.play();
                    $('.play-pause .fa-play').css({'display':'none'});
                    $('.play-pause .fa-pause').css({'display':'block'});
                    $(`.playlist-items #${id} .song-title`).css({'font-weight':'bold'});
                }else{
                    song.pause();
                    $('.play-pause .fa-play').css({'display':'block'});
                    $('.play-pause .fa-pause').css({'display':'none'});
                    $(`.playlist-items #${id} .song-title`).css({'font-weight':'normal'});
 
                }
            }else{
                song.pause();
                $(`.song-title`).css({'font-weight':'normal'});
                $(`.playlist-items #${id} .song-title`).css({'font-weight':'bold'});
                playNewSong(id);   
            }
        }else{
            playNewSong(id);
        }
    }

    $('.playlist-item, .play-pause').on('click', function() {
        let id = $(this).attr('id');
        $(`.playlist-items #${id} .song-title`).css({'font-weight':'bold'});
        $('.play-pause .fa-play').css({'display':'none'});
        $('.play-pause .fa-pause').css({'display':'block'});
        playPauseSong(id)
        id++;
        $('.settings-btn.song-next').attr('data-id', id);
        id--;id--;
        $('.settings-btn.song-prev').attr('data-id', id);
    });

    $('.settings-btn').on('click', function() {
        let id = $(this).attr('data-id');
        if(id != -1){
            $('.play-pause .fa-play').css({'display':'none'});
            $('.play-pause .fa-pause').css({'display':'block'});
            playPauseSong(id);
            id++;
            $('.settings-btn.song-next').attr('data-id', id);
            id--;id--;
            $('.settings-btn.song-prev').attr('data-id', id);
        }
    });

    $(document).ready(function(){
        $(".menu").on("click","a", function (event) {
            event.preventDefault(); 
            var id  = $(this).attr('href'), 
                top = $(id).offset().top; 
        $('body,html').animate({scrollTop: top}, 1000);
        });
    });

    $('.header-btn').on('click', function(){
        $(this).css("transform", "translateX(1000%) rotate(45deg)");
        $('.header-nav').css("transform", "translateX(0%)");
    })
});

