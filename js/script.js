// slide Nav
function openNav() {
    document.getElementById("mySidenav").style.transform = `translateX(0%)`;
}

function closeNav() {

    document.getElementById("mySidenav").style.transform = `translateX(100%)`;
}



let slideItem = document.querySelectorAll('.slide-item');


// # Carousel
let num = -1

setInterval(slide, 3000)

// 처음 페이지가 load되었을 때
slide()

function slide() {
    num++
    console.log(num)

    // 마지막 이미지에서 다시 처음 이미지로 index 이동
    if (num === slideItem.length) {
        num = 0;
    }

    // index에 해당하는 이미지만 보이게 한다.
    for (img of slideItem) { // 초기화
        img.style.display = 'none'
    }
    slideItem[num].style.display = 'block';


}


// upBtn
document.getElementById("upBtn").addEventListener('click', function () {

    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });
});


createSlider('.first-slide')
createSlider('.second-slide')

function createSlider(slideClassName) {

    const slideName = document.querySelector(slideClassName);
    const slideWrapper = slideName.children[0].children[0];
    const buttonWrapper = slideName.children[1];
    const pageButtonWrapper = buttonWrapper.children[1];
    console.log(slideWrapper);
    console.log(buttonWrapper);
    console.log(pageButtonWrapper);
    const slideWidth = 300;
    const slideCount = slideWrapper.childElementCount;

    const copyFirst = slideWrapper.firstElementChild.cloneNode(true);
    const copyLast = slideWrapper.lastElementChild.cloneNode(true);

    slideWrapper.appendChild(copyFirst);
    slideWrapper.insertBefore(copyLast, slideWrapper.firstElementChild);

    makeButtons();

    let moveCheck = true;
    let index = 1;
    // 인터벌 넣어줄 변수 선언
    let nextInterval;
    moveSlide(0);
    // 이전버튼
    buttonWrapper.firstElementChild.addEventListener('click', slideToLeft)
    // 다음버튼
    buttonWrapper.lastElementChild.addEventListener('click', sliderToRight)



    function makeButtons() {
        for (let i = 0; i < slideCount; i++) {
            const pageButton = document.createElement(`div`);
            pageButton.classList.add('page-button');
            pageButtonWrapper.appendChild(pageButton);



            //버튼 만들때 이벤트리스너 추가 
            pageButton.addEventListener('click', () => {
                index = i + 1;
                moveSlide(1);
            })
        }
    }

    function moveSlide(time) {
        slideWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
        slideWrapper.style.transition = `${time}s`;
        // 인터벌 삭제. (타이머 초기화)
        clearInterval(nextInterval);
        // 5초마다 반복하는 인터벌 재설정
        nextInterval = setInterval(() => {
            sliderToRight();
        }, 5000);
        for (let i = 0; i < slideCount; i++) {
            pageButtonWrapper.children[i].classList.remove('active');
        }
        if (index === 0) {
            pageButtonWrapper.children[slideCount - 1].classList.add('active')
        } else if (index === slideCount + 1) {
            pageButtonWrapper.children[0].classList.add('active')
        } else {
            pageButtonWrapper.children[index - 1].classList.add('active')
        }
    }

    function slideToLeft() {
        if (moveCheck) {
            moveCheck = false;

            index--;
            moveSlide(1);

            setTimeout(() => {
                if (index === 0) {
                    // 5번슬라이드로 이동
                    index = slideWrapper.childElementCount - 2;
                    moveSlide(0);
                }
                moveCheck = true;
            }, 1000);
        }

    }

    function sliderToRight() {
        if (moveCheck) {
            moveCheck = false;

            index++
            moveSlide(1);

            setTimeout(() => {
                if (index === slideWrapper.childElementCount - 1) {
                    index = 1;
                    moveSlide(0)
                }
                moveCheck = true;
            }, 1000);
        }
    }

}