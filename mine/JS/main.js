// 즉시 호출함수
// 실행되자마자 바로 실행이됨 다른식으로 이렇게도 씀 (()=>{})();
// 어느 자바스크립트에서 부름 그래서 혼란을 초래 const arr = [1,2,3];



// 고려사항
// 1. 바운스
// 2. 새로고침
(function(){

    let yOffset = 0; //window.pageyOffset 대신 사용할 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된 (Scroll-section)
    let enterNewScene = false; //새로운 Scene이 시작되면 true

    const sceneInfo = [
        {//0
            //첫번째는 스크롤의 높이 (모바일, 컴퓨터 화면이 다 다르기에 따로 설정해줘야한다.)
            type: 'sticky',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA:document.querySelector('#scroll-section-0 .main-message.a'),
                messageB:document.querySelector('#scroll-section-0 .main-message.b'),
                messageC:document.querySelector('#scroll-section-0 .main-message.c'),
                messageD:document.querySelector('#scroll-section-0 .main-message.d')

            },
            values : {
                messageA_opacity_in:[0,1,{start:0.1, end:0.2}],
                messageB_opacity_in:[0,1,{start:0.3, end:0.4}],
                messageC_opacity_in:[0,1,{start:0.5, end:0.6}],
                messageD_opacity_in:[0,1,{start:0.7, end:0.8}],
                messageA_opacity_out:[1,0,{start:0.25, end:0.3}],
                messageB_opacity_out:[1,0,{start:0.45, end:0.5}],
                messageC_opacity_out:[1,0,{start:0.65, end:0.7}],
                messageD_opacity_out:[1,0,{start:0.85, end:0.9}],
                messageA_translate_in:[20,0,{start:0.1, end:0.2}],
                messageB_translate_in:[20,0,{start:0.3, end:0.4}],
                messageC_translate_in:[20,0,{start:0.5, end:0.6}],
                messageD_translate_in:[20,0,{start:0.7, end:0.8}],
                messageA_translate_out:[0,-20,{start:0.25, end:0.3}],
                messageB_translate_out:[0,-20,{start:0.45, end:0.5}],
                messageC_translate_out:[0,-20,{start:0.65, end:0.7}],
                messageD_translate_out:[0,-20,{start:0.85, end:0.9}],

            }
        },
        {//1
            type:'normal',
            // heightNum:5, 여기서는 필요없음
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-1')

            }
        },
        {//2
            type: 'sticky',
            heightNum:5,
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-2'),
                messageA:document.querySelector('#scroll-section-2 .main-message.a'),
                messageB:document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC:document.querySelector('#scroll-section-2 .desc-message.c'),
                pinB : document.querySelector('#scroll-section-2 .pin.b'),
                pinC : document.querySelector('#scroll-section-2 .pin.c'),
            },
            values : {
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
				messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
				messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
				messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
				messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                messageA_translate_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translate_in: [30, 0, { start: 0.6, end: 0.65 }],
				messageC_translate_in: [30, 0, { start: 0.87, end: 0.92 }],
				messageA_translate_out: [0, -20, { start: 0.4, end: 0.45 }],
				messageB_translate_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translate_out: [0, -20, { start: 0.95, end: 1 }],
                pinB_scaleY_in: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinB_scaleY_out: [1, 0.5, { start: 0.68, end: 0.73 }],
                pinC_scaleY_in: [0.5, 1, { start: 0.87, end: 0.92 }],
                pinC_scaleY_out: [1, 0.5, { start: 0.95, end: 1 }],

		
            }
        },
        {//3
            type: 'sticky',
            heightNum:5,
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-3')

            }
        },

    ];

    function setLayout(){
        // 각 스크롤 섹션의 높이 세팅
        for (let i in sceneInfo){
            if(sceneInfo[i].type==='sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum*window.innerHeight;
            }else if(sceneInfo[i].type==='normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            // 템플릿 문자를 사용할때는 ``이 문자를 써야한다.
            // ${} 안에는 변수를 사용할수있다.
            // css heihgt이기에 px을 붙여줘야함
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight=0;
        for(let i=0; i< sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);

    }

    function calcValues(values, currentYOffset){
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        let scrollHeight = sceneInfo[currentScene].scrollHeight;
        let scrollRatio = currentYOffset / scrollHeight;
        if(values.length === 3){
        // start ~ end 사이에 애니메이션 실행
            const partStart = scrollHeight * values[2].start;
            const partEnd = scrollHeight * values[2].end;
            const partScrollHeight = partEnd - partStart; 
            if(currentYOffset>=partStart && currentYOffset<=partEnd){
           rv = (currentYOffset-partStart)/partScrollHeight * (values[1]-values[0]) + values[0];
            }else if(currentYOffset < partStart){
                rv = values[0];
            }else if(currentYOffset > partEnd){
                rv = values[1];
            }
        }else{
            rv = scrollRatio * (values[1]-values[0]) + values[0];
        }
        return rv;
    }


    function scrollAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollratio = currentYOffset/scrollHeight;

        switch (currentScene){
            case 0:
                // console.log('0 play');
                if(scrollratio <= 0.22){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_in,currentYOffset)}%)`;

                }else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset)
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_out,currentYOffset)}%)`;
                }

                if(scrollratio <= 0.42){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in,currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_in,currentYOffset)}%)`;

                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out,currentYOffset)
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_out,currentYOffset)}%)`;
                }

                if(scrollratio <= 0.62){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in,currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_in,currentYOffset)}%)`;

                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out,currentYOffset)
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_out,currentYOffset)}%)`;

                }
                if(scrollratio <= 0.82){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in,currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translate_in,currentYOffset)}%)`;


                }else{
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out,currentYOffset)
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translate_out,currentYOffset)}%)`;

                }
                
                break;
            case 1:
                // console.log('1 play');
                
                break;
            case 2:
                if(scrollratio <= 0.32){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_in,currentYOffset)}%)`;

                }else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset)
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translate_out,currentYOffset)}%)`;
                }
                if(scrollratio <= 0.67){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in,currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_in,currentYOffset)}%)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY_in,currentYOffset)})`;

                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out,currentYOffset)
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translate_out,currentYOffset)}%)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY_out,currentYOffset)})`;        
                }
                if(scrollratio <= 0.94){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in,currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_in,currentYOffset)}%)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY_in,currentYOffset)})`;

                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out,currentYOffset)
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translate_out,currentYOffset)}%)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY_out,currentYOffset)})`;
                }

    

                break;
            case 3:
                // console.log('3 play');
                break
        }

    }

    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i =0; i<currentScene; i++){
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }

        if(yOffset < prevScrollHeight){
            enterNewScene = true;
            if(currentScene===0)return; // 브라우저에서 바운스되는경우를 방지 -1로 가면안되기때문
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }
        if(enterNewScene)return;

        scrollAnimation();

    }
 
    //DOMContentLoaded 도 가능하지만 이경우는 이미지를 로드안해도 실행됨(빠름 보통로드보다)
    //window.addEventListener('DOMContentLoaded',setLayout);
    window.addEventListener('load',setLayout);
    // 윈도우즈 사이즈가 변하면 자동으로 변한 사이즈만큼의 사이즈로 바뀌게
    window.addEventListener('resize',setLayout);
    // 스크롤 변화에 따라 이벤트 사용
    window.addEventListener('scroll',()=>{
        yOffset = parseInt(window.pageYOffset);
        scrollLoop();
    });



})();

