$(document).ready(function() {
    // проверка высоты окна
    // function heightDetect() {
    //     $(".header").css("height", $(window).height());
    // };
    // heightDetect();
    // $(window).resize(function() {
    //     heightDetect();
    // });
    // parallax
    $('.header').parallax({
        imageSrc: 'img/header.jpg'
    });
    // слайдер
    $('.slider-1').slick({
        accessibility: false,
        arrows: true,
        fade: true,
        prevArrow: '<div class="prev"><img class="arrow-left" src="img/arrow-left.png"></div>',
        nextArrow: '<div class="next"><img class="arrow-right" src="img/arrow-right.png"></div>'
    });
    $('.slider-2').slick({
        accessibility: false,
        arrows: true,
        fade: true,
        initialSlide: 1,
        prevArrow: '<div class="prev"><img class="arrow-left" src="img/arrow-left.png"></div>',
        nextArrow: '<div class="next"><img class="arrow-right" src="img/arrow-right.png"></div>'
    });
    $('.slider-3').slick({
        accessibility: false,
        arrows: true,
        fade: true,
        initialSlide: 2,
        prevArrow: '<div class="prev"><img class="arrow-left" src="img/arrow-left.png"></div>',
        nextArrow: '<div class="next"><img class="arrow-right" src="img/arrow-right.png"></div>'
    });

    // заполнение плитки
    function showImages(data) {
        var grid = document.createElement("div");
        grid.className = "grid";
        var gridSizer = document.createElement("div");
        gridSizer.className = "grid-sizer";
        var gutterSizer = document.createElement("div");
        gutterSizer.className = "gutter-sizer";
        $('.ideas__title').after(grid);
        grid.appendChild(gridSizer);
        grid.appendChild(gutterSizer);
        var result = document.getElementById('form__search');
        result.value = "";
        $.each(data.hits, function(i, hit) {
            var div = document.createElement("div");
            var p = document.createElement("p");
            var img = document.createElement("img");
            div.className = "grid__item";
            div.style.background = 'url(' + hit.webformatURL + ') center no-repeat';
            div.style.backgroundSize = 'cover';
            grid.appendChild(div);
            p.className = "grid-item__text";
            p.innerHTML = hit.tags;
            div.appendChild(p);
        })

        //masonry
        $('.grid').masonry({
            // options
            itemSelector: '.grid__item',
            columnWidth: '.grid__item',
            gutter: '.gutter-sizer',
            percentPosition: true

        });
    }
    // ajax
    $.ajax({
        url: 'https://pixabay.com/api/?key=4571178-10af374cbeae083c7de830f38&&image_type=photo&per_page=7&editors_choice=true',
        type: 'GET',
        dataType: 'json',
        cache:false,
        success: showImages
    })

    // поиск
    $('.form__search-button').click(function(e) {
        event.preventDefault();
        $('.grid').remove();
        var result = document.getElementById('form__search').value;
        $.ajax({
            url: 'https://pixabay.com/api/?key=4571178-10af374cbeae083c7de830f38&q=' + result + '&image_type=photo&per_page=7&editors_choice=true',
            type: 'GET',
            dataType: 'json',
            cache:false,
            success: showImages
        })
    });
    $("#form__search").keyup(function() {
        // if(event.keyCode==13) {alert("Message!!!");}
        if (event.keyCode === 13) {
          // debugger
            $(".grid__item").remove();
            var result = document.getElementById("form__search").value;
            $.ajax({
                url: 'https://pixabay.com/api/?key=4571178-10af374cbeae083c7de830f38&q=' + result + '&image_type=photo&per_page=7&editors_choice=true',
                type: 'GET',
                dataType: 'json',
                cache:false,
                success: showImages
            })
        }
    })



});
